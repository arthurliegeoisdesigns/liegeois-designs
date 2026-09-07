#!/usr/bin/env node
/**
 * Contrast audit for THE ROOM.
 *
 *   node scripts/contrast-audit.mjs          # fails the process on any failure
 *   node scripts/contrast-audit.mjs --all    # also list what passes
 *
 * WHY THIS EXISTS
 * In August the site was unified to light and 311 contrast failures were taken
 * to zero by hand. On 6 September it went dark throughout, and none of that
 * work transferred: every ratio had to be recomputed. Doing that by hand again
 * would guarantee it rots again, so it lives here instead.
 *
 * THE ONE THING THAT MATTERS MOST
 * Ratios are measured against the brightest surface bare text can actually
 * land on, NOT against --color-void. Anything validated against void alone
 * reads roughly a full point optimistic, which is exactly how you ship a
 * failure that looks fine in a swatch. See SURFACES below for what that value
 * is today and why; it changes whenever the backdrop does, and it must.
 *
 * WHAT IT CANNOT SEE
 * It is a static reader, not a browser. It does not resolve the cascade, so it
 * cannot know that a child sits on a background set by its parent, nor that a
 * font-size lives in a sibling rule. Those cases go in EXEMPT below, each with
 * a measured reason. An exemption is a claim you are making; keep them few and
 * keep them honest.
 */
import { readFileSync } from 'node:fs'

const CSS = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8')

/* The surfaces text can actually land on. Worst case first.
 *
 * UPDATED 7 Sep 2026, THIRD revision. Keep this honest: an auditor carrying a
 * stale surface is worse than no auditor, because it reports green against a
 * page that does not exist. It has been wrong twice already. Re-derive it
 * whenever the backdrop changes.
 *
 * The field is now a baked mesh (scripts/build-mesh.py). #0F2A4A is the
 * brightest pixel it reaches anywhere the TEXT COLUMN crosses, sampled
 * directly from the generated image across x in 17-83% and the full height.
 * The frame edges go brighter, up to about #1C5694, but nothing bare sits
 * there: that is a layout contract, and the mesh script documents the ceiling
 * it was tuned against.
 */
const SURFACES = {
  'field, brightest under the column': '#0F2A4A',

  canvas: '#090909',
  void: '#000000',
}

/**
 * Documented exceptions. Each needs: the real surface or size, the measured
 * ratio, and why the static reader gets it wrong.
 */
const EXEMPT = [
  {
    match: /\.work-filter\.is-active sup/,
    reason:
      'Sits on the bone chip set by .work-filter.is-active, not on the page. ' +
      'The chip is bone, so this needs the DARK accent and gets it: #C13414 on ' +
      '#F7F4EF is 5.08:1, and unlike the others that number is stable because ' +
      'neither colour depends on the backdrop. The reader does not resolve ' +
      'inherited backgrounds, which is the only reason it flags at all.',
  },
  {
    match: /\.footer-email a:hover/,
    reason:
      'font-size clamp(1.9rem, 5.5vw, 4.5rem) = 30px minimum, declared on ' +
      '.footer-email, so WCAG treats it as large text and the threshold is 3.0 ' +
      'rather than 4.5. The reader cannot see a font-size in a sibling rule. ' +
      'Deliberately states no ratio: this reason has been rewritten twice ' +
      'already because the field moved under it. The SIZE is the argument.',
  },
  {
    match: /\.nav-menu-label/,
    reason:
      'font-size clamp(2.5rem, 6.5vw, 5.5rem) = 40px minimum, declared on ' +
      '.nav-menu-label, so the threshold is 3.0 rather than 4.5. Same reasoning ' +
      'as .footer-email above, and same warning: no ratio quoted on purpose.',
  },
]

/**
 * Light surfaces that legitimately set no text colour, because they never
 * contain text. Keep this list short: "it has no text" is easy to assert and
 * easy to be wrong about later, when someone drops a label inside.
 */
const EXEMPT_SURFACE = [
  {
    match: /\.nav-hamburger-line/,
    reason:
      'A 22x1.5px bar. Its background IS the graphic, not a surface behind text. ' +
      'Contrast for the hamburger is governed by the bar against .nav.scrolled.',
  },
  {
    match: /\.svc-card\b/,
    reason:
      'Image container for the services slide stack. next/image fills it edge ' +
      'to edge; the bone only shows while the image decodes. No text child.',
  },
]

// ── colour plumbing ────────────────────────────────────────────────────────
const rootBlock = CSS.match(/:root\s*\{([\s\S]*?)\n\}/)[1]
const TOKENS = Object.fromEntries(
  [...rootBlock.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()])
)
for (let i = 0; i < 6; i++) {
  for (const [k, v] of Object.entries(TOKENS)) {
    const m = /^var\((--[\w-]+)\)$/.exec(v)
    if (m && TOKENS[m[1]]) TOKENS[k] = TOKENS[m[1]]
  }
}

function parseColour(raw) {
  let c = raw.trim()
  const v = /^var\((--[\w-]+)\)$/.exec(c)
  if (v) c = (TOKENS[v[1]] || '').trim()
  if (/^#[0-9a-f]{6}$/i.test(c))
    return [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16)).concat(1)
  if (/^#[0-9a-f]{3}$/i.test(c))
    return [1, 2, 3].map((i) => parseInt(c[i] + c[i], 16)).concat(1)
  const m = /^rgba?\(([^)]+)\)$/.exec(c)
  if (!m) return null
  const p = m[1].replace(/\//g, ',').split(',').map((x) => parseFloat(x))
  if (p.slice(0, 3).some(Number.isNaN)) return null
  return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]
}

const composite = (fg, bg) => fg.slice(0, 3).map((c, i) => c * fg[3] + bg[i] * (1 - fg[3])).concat(1)
const chan = (c) => (c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
const luminance = (c) => 0.2126 * chan(c[0]) + 0.7152 * chan(c[1]) + 0.0722 * chan(c[2])
function ratio(a, b) {
  const [x, y] = [luminance(a), luminance(b)]
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

/** Smallest rendered size. clamp() takes its first argument. */
function minPx(fontSize) {
  if (!fontSize) return null
  const m = /^(?:clamp\(\s*)?([\d.]+)(rem|px)/.exec(fontSize)
  return m ? parseFloat(m[1]) * (m[2] === 'rem' ? 16 : 1) : null
}

// ── walk every rule that sets a text colour ────────────────────────────────
const results = []
for (const [, selRaw, body] of CSS.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
  const sel = selRaw.split(/\s+/).join(' ').trim()
  if (sel.startsWith('@') || sel.includes(':root')) continue

  const cm = /(?<![-\w])color\s*:\s*([^;]+);/.exec(body)
  if (!cm) continue
  const fg = parseColour(cm[1])
  if (!fg) continue

  const bm = /background(?:-color)?\s*:\s*(#[0-9a-f]{3,6}|rgba?\([^)]*\)|var\(--[\w-]+\))\s*;/i.exec(body)
  const own = bm ? parseColour(bm[1]) : null

  const fsm = /font-size\s*:\s*([^;]+);/.exec(body)
  const size = minPx(fsm?.[1])
  // WCAG: large text is >=24px, or >=18.66px bold. Size alone is all we have,
  // so anything under 24px is treated as body. Deliberately conservative.
  const need = size && size >= 24 ? 3.0 : 4.5

  let worst = null
  if (own && own[3] >= 0.95) {
    worst = { r: ratio(fg[3] >= 0.99 ? fg : composite(fg, own), own), where: 'its own background' }
  } else {
    for (const [name, hex] of Object.entries(SURFACES)) {
      const base = own ? composite(own, parseColour(hex)) : parseColour(hex)
      const r = ratio(fg[3] >= 0.99 ? fg : composite(fg, base), base)
      if (!worst || r < worst.r) worst = { r, where: name }
    }
  }

  results.push({ sel, colour: cm[1].trim(), size: fsm?.[1] ?? '', need, ...worst })
}

const failures = []
const exempted = []
for (const row of results) {
  if (row.r >= row.need) continue
  const ex = EXEMPT.find((e) => e.match.test(row.sel))
  ;(ex ? exempted : failures).push({ ...row, reason: ex?.reason })
}

/**
 * SECOND PASS — the blind spot in the first one.
 *
 * The pass above only looks at rules that set a text colour. A rule that sets
 * a LIGHT background and no colour is invisible to it: the text then comes
 * from the cascade, the checker assumes the dark page surface, and light text
 * on a light chip sails through as a pass.
 *
 * That is precisely the shape of the bugs this inversion produced
 * (.btn-primary, .contact-input, .work-filter.is-active), so it gets its own
 * check. The rule is blunt on purpose: if you paint a light surface, state the
 * text colour in the same place. Pairing them is the whole lesson.
 */
const LIGHT = 0.25
const unpaired = []
const surfaceExempt = []
for (const [, selRaw, body] of CSS.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
  const sel = selRaw.split(/\s+/).join(' ').trim()
  if (sel.startsWith('@') || sel.includes(':root')) continue
  const bm = /background(?:-color)?\s*:\s*(#[0-9a-f]{3,6}|rgba?\([^)]*\)|var\(--[\w-]+\))\s*;/i.exec(body)
  if (!bm) continue
  const bg = parseColour(bm[1])
  if (!bg || bg[3] < 0.5 || luminance(bg) <= LIGHT) continue
  if (/(?<![-\w])color\s*:/.test(body)) continue // paired, already checked above
  const ex = EXEMPT_SURFACE.find((e) => e.match.test(sel))
  if (ex) { surfaceExempt.push({ sel, value: bm[1], reason: ex.reason }); continue }
  unpaired.push({ sel, value: bm[1], lum: luminance(bg) })
}

const f = (n) => n.toFixed(2).padStart(5)
console.log(`\nContrast audit — THE ROOM`)
console.log(`Measured against ${Object.values(SURFACES)[0]}, the brightest point under the text column.\n`)
console.log(`  text-colour rules examined  ${results.length}`)
console.log(`  documented exemptions       ${exempted.length}`)
console.log(`  light surfaces, text-free   ${surfaceExempt.length}`)
console.log(`  unpaired light surfaces     ${unpaired.length}`)
console.log(`  failures                    ${failures.length}\n`)

for (const u of unpaired) {
  console.log(`  UNPAIRED  ${u.sel.slice(0, 58)}`)
  console.log(`            paints ${u.value} (luminance ${u.lum.toFixed(2)}) but sets no colour.`)
  console.log(`            State the text colour in the same rule, or the cascade will hand`)
  console.log(`            it light text on a light surface the next time tokens move.\n`)
}

if (process.argv.includes('--all')) {
  for (const r of results.filter((x) => x.r >= x.need).sort((a, b) => a.r - b.r))
    console.log(`  pass ${f(r.r)}  ${r.sel.slice(0, 62)}`)
  console.log()
}

for (const e of exempted) {
  console.log(`  EXEMPT ${f(e.r)}  ${e.sel.slice(0, 58)}`)
  console.log(`         ${e.reason}\n`)
}

for (const x of failures.sort((a, b) => a.r - b.r)) {
  console.log(`  FAIL ${f(x.r)} (needs ${x.need})  ${x.sel.slice(0, 54)}`)
  console.log(`       ${x.colour} on ${x.where}${x.size ? `, ${x.size}` : ''}\n`)
}

if (failures.length || unpaired.length) {
  const bits = []
  if (failures.length) bits.push(`${failures.length} contrast failure(s)`)
  if (unpaired.length) bits.push(`${unpaired.length} unpaired light surface(s)`)
  console.log(`${bits.join(' and ')}. Fix them, or add a measured exemption.\n`)
  process.exit(1)
}
console.log(`No failures.\n`)
