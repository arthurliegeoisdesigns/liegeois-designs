/**
 * Custom next/image loader — Cloudinary does the resizing, not Vercel.
 *
 * Why: Vercel meters every image transformation (free tier exceeded,
 * July 2026). All our raster images live on Cloudinary, which resizes
 * and caches for free via URL parameters. This loader rewrites every
 * next/image request into a direct Cloudinary transform URL, so Vercel
 * performs zero optimizations.
 *
 * Non-Cloudinary sources (local SVG logos, favicons) pass through
 * untouched and are served as static files.
 */
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}): string {
  if (!src.includes('res.cloudinary.com')) return src

  const marker = '/upload/'
  const i = src.indexOf(marker)
  if (i === -1) return src

  const head = src.slice(0, i + marker.length)
  let tail = src.slice(i + marker.length)

  // If the first path segment is a transform string (tokens like
  // f_auto, q_auto, w_800), strip it — we rebuild it below.
  const firstSeg = tail.split('/')[0]
  const isTransformSeg = /(^|,)[a-z]{1,4}_[^/]*/i.test(firstSeg) && firstSeg.includes('_')
  const existing = isTransformSeg ? firstSeg.split(',') : []
  if (isTransformSeg) tail = tail.slice(firstSeg.length + 1)

  const keep = existing.filter(
    (t) => t && !t.startsWith('f_') && !t.startsWith('q_') && !t.startsWith('w_') && !t.startsWith('c_'),
  )
  const transform = ['f_auto', `q_${quality ?? 'auto'}`, `w_${width}`, 'c_limit', ...keep].join(',')

  return `${head}${transform}/${tail}`
}
