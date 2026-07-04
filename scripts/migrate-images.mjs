/**
 * migrate-images.mjs — one-time migration of Webflow-CDN images to Cloudinary.
 *
 * Usage:
 *   CLOUDINARY_CLOUD=xxx CLOUDINARY_KEY=xxx CLOUDINARY_SECRET=xxx \
 *     node scripts/migrate-images.mjs [--apply]
 *
 * Without --apply: scans src/ for cdn.prod.website-files.com URLs, uploads
 * each to Cloudinary (folder liegeois-designs/webflow), and records
 * old→new URLs in scripts/image-migration-map.json. Idempotent/resumable —
 * already-mapped URLs are skipped on re-runs.
 * With --apply: rewrites all src files using the completed map.
 *
 * Credentials are read from env only — never hardcode them here.
 */
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const CLOUD = process.env.CLOUDINARY_CLOUD
const KEY = process.env.CLOUDINARY_KEY
const SECRET = process.env.CLOUDINARY_SECRET
const APPLY = process.argv.includes('--apply')
const MAP_PATH = 'scripts/image-migration-map.json'
const SRC = 'src'
const URL_RE = /https:\/\/cdn\.prod\.website-files\.com\/[^\s'"`)]+/g

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (/\.(ts|tsx|mdx)$/.test(f)) out.push(p)
  }
  return out
}

function slugFor(url) {
  let name = decodeURIComponent(decodeURIComponent(url.split('/').pop() || 'asset'))
  name = name.replace(/\.(jpeg|jpg|png|webp|avif|gif|svg)$/i, '')
  // strip leading webflow hex ids (24-char) chains
  name = name.replace(/^([0-9a-f]{20,}[_-])+/i, '')
  name = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
  const h = createHash('sha1').update(url).digest('hex').slice(0, 6)
  return `${name || 'asset'}-${h}`
}

const files = walk(SRC)
const urls = new Set()
for (const f of files) {
  const m = readFileSync(f, 'utf8').match(URL_RE)
  if (m) m.forEach((u) => urls.add(u))
}

let map = existsSync(MAP_PATH) ? JSON.parse(readFileSync(MAP_PATH, 'utf8')) : {}
const pending = [...urls].filter((u) => !map[u])
console.log(`unique webflow urls: ${urls.size}, already mapped: ${urls.size - pending.length}, pending: ${pending.length}`)

if (APPLY) {
  const missing = [...urls].filter((u) => !map[u])
  if (missing.length) {
    console.error(`refusing to apply — ${missing.length} urls not yet migrated`)
    process.exit(1)
  }
  let total = 0
  for (const f of files) {
    let src = readFileSync(f, 'utf8')
    let count = 0
    src = src.replace(URL_RE, (u) => {
      if (map[u]) {
        count++
        return map[u]
      }
      return u
    })
    if (count) {
      writeFileSync(f, src)
      total += count
      console.log(`  ${f}: ${count} replaced`)
    }
  }
  console.log(`APPLIED: ${total} replacements`)
  process.exit(0)
}

if (!CLOUD || !KEY || !SECRET) {
  console.error('missing CLOUDINARY_CLOUD / CLOUDINARY_KEY / CLOUDINARY_SECRET')
  process.exit(1)
}

async function upload(url) {
  const public_id = `liegeois-designs/webflow/${slugFor(url)}`
  const timestamp = Math.floor(Date.now() / 1000)
  // signature: sorted params joined with & + secret, sha1
  const toSign = `overwrite=false&public_id=${public_id}&timestamp=${timestamp}${SECRET}`
  const signature = createHash('sha1').update(toSign).digest('hex')
  const body = new URLSearchParams({
    file: url,
    public_id,
    overwrite: 'false',
    timestamp: String(timestamp),
    api_key: KEY,
    signature,
  })
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, {
    method: 'POST',
    body,
  })
  const json = await res.json()
  if (json.public_id || json.existing) {
    return `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto/${json.public_id || public_id}`
  }
  throw new Error(json.error?.message || `upload failed (${res.status})`)
}

const CONCURRENCY = 8
let done = 0
let failed = 0
async function worker() {
  while (pending.length) {
    const url = pending.shift()
    try {
      map[url] = await upload(url)
      done++
    } catch (e) {
      failed++
      console.error(`FAIL ${url.slice(0, 90)}… → ${e.message}`)
    }
    if ((done + failed) % 10 === 0) writeFileSync(MAP_PATH, JSON.stringify(map, null, 1))
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker))
writeFileSync(MAP_PATH, JSON.stringify(map, null, 1))
console.log(`uploaded: ${done}, failed: ${failed}, total mapped: ${Object.keys(map).length}/${urls.size}`)
