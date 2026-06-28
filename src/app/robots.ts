import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: [
      'https://www.liegeoisdesigns.com/sitemap.xml',
      'https://www.liegeoisdesigns.com/video-sitemap.xml',
    ],
  }
}
