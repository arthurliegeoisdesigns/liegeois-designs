import type { MetadataRoute } from 'next'
import { publishedPosts } from '@/content/blog-posts'
import { caseStudies } from '@/content/case-studies'

const BASE = 'https://www.liegeoisdesigns.com'

/* Stable lastmod dates — bump these ONLY when a page meaningfully changes.
   (Stamping new Date() on every deploy taught Google to distrust the
   sitemap — 70 URLs "changed" daily. GSC showed the whole blog + work
   catalog stuck in "Discovered, not indexed", July 2026.) */
const LAUNCH = new Date('2026-07-04')
const HOME_UPDATED = new Date('2026-07-19') // journey hero shipped
const SERVICES_UPDATED = new Date('2026-07-19') // per-service pages added

const SERVICE_SLUGS = [
  'pitch-deck-design',
  'executive-presentations',
  'sales-agency-decks',
  'strategic-narrative',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoutes = publishedPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const workRoutes = caseStudies.map((cs) => ({
    url: `${BASE}/work/${cs.slug}`,
    // Use June 1 of the year the work was completed — stable, honest date
    lastModified: new Date(cs.year, 5, 1),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const serviceRoutes = SERVICE_SLUGS.map((slug) => ({
    url: `${BASE}/services/${slug}`,
    lastModified: SERVICES_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  return [
    {
      url: BASE,
      lastModified: HOME_UPDATED,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE}/work`,
      lastModified: LAUNCH,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/services`,
      lastModified: SERVICES_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/about`,
      lastModified: LAUNCH,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/blog`,
      lastModified: HOME_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE}/contact`,
      lastModified: LAUNCH,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...serviceRoutes,
    ...workRoutes,
    ...blogRoutes,
  ]
}
