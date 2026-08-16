import { caseStudies } from '@/content/case-studies'
import { clampDescription } from '@/lib/seo'
import { caseStudiesWithVideo, videoMetaFor } from '@/lib/video'

/**
 * /video-sitemap.xml — generated, not typed.
 *
 * WHAT THIS REPLACED
 * public/video-sitemap.xml, 5 entries written by hand. It had drifted from
 * the case study data in three ways at once: every thumbnail still pointed
 * at the old Webflow CDN rather than the Cloudinary asset the page actually
 * renders, every publication_date was a bare 'YYYY-MM-DD' that Search
 * Console rejected, and no entry carried a duration. Nothing warned anyone,
 * because a static file in public/ has no relationship to the data it
 * describes.
 *
 * A sixth video would also have been silently missing. Adding one to
 * case-studies.ts now adds it here.
 *
 * robots.ts already advertises this path. Note that a file in public/ wins
 * over an App Router route of the same name, so the old static file had to
 * be deleted for this to serve — it was, in the same commit.
 */

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export const dynamic = 'force-static'

export function GET(): Response {
  const entries = caseStudiesWithVideo(caseStudies)
    .map((cs) => {
      const desc =
        cs.seoDescription ??
        `${cs.format} for ${cs.client}, ${cs.tagline} Presentation design and visual storytelling by Liégeois Designs.`
      const vm = videoMetaFor(cs, clampDescription(desc, 300))
      if (!vm) return ''

      /* video:duration is in seconds here, not ISO 8601. The sitemap schema
         and schema.org disagree on the format for the same fact, which is
         why both shapes come off the one VideoMeta object. */
      return `  <url>
    <loc>${xmlEscape(vm.pageUrl)}</loc>
    <video:video>
      <video:thumbnail_loc>${xmlEscape(vm.thumbnailUrl)}</video:thumbnail_loc>
      <video:title>${xmlEscape(vm.title)}</video:title>
      <video:description>${xmlEscape(vm.description)}</video:description>
      <video:content_loc>${xmlEscape(vm.contentUrl)}</video:content_loc>${
        vm.durationSeconds ? `\n      <video:duration>${vm.durationSeconds}</video:duration>` : ''
      }
      <video:publication_date>${xmlEscape(vm.uploadDate)}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
    </video:video>
  </url>`
    })
    .filter(Boolean)
    .join('\n\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

${entries}

</urlset>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
