import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    /* video-sitemap.xml removed 27 Aug 2026 along with the VideoObject
       schema. Advertising a video sitemap for pages that are not watch pages
       just asks Google to re-reject them. See work/[slug]/page.tsx. */
    sitemap: 'https://www.liegeoisdesigns.com/sitemap.xml',
  }
}
