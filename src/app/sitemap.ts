import type { MetadataRoute } from 'next'
import { publishedPosts } from '@/content/blog-posts'
import { caseStudies } from '@/content/case-studies'
import { servicePages } from '@/content/services-pages'
import { industries } from '@/content/industries'

const BASE = 'https://www.liegeoisdesigns.com'

/* Stable lastmod dates — bump these ONLY when a page meaningfully changes.
   (Stamping new Date() on every deploy taught Google to distrust the
   sitemap — 70 URLs "changed" daily. GSC showed the whole blog + work
   catalog stuck in "Discovered, not indexed", July 2026.) */
const LAUNCH = new Date('2026-07-04')
const HOME_UPDATED = new Date('2026-07-19') // journey hero shipped
const SERVICES_UPDATED = new Date('2026-07-19') // per-service pages added

/* Derived from servicePages, never hand-listed. The previous hardcoded array
   silently omitted training-keynote-design the moment it was added, which is
   exactly the failure a duplicate list guarantees eventually. */
const SERVICE_SLUGS = servicePages.map((s) => s.slug)
const INDUSTRIES_ADDED = new Date('2026-08-15')

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

  const industryRoutes = industries.map((i) => ({
    url: `${BASE}/industries/${i.slug}`,
    lastModified: INDUSTRIES_ADDED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
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
      url: `${BASE}/industries`,
      lastModified: INDUSTRIES_ADDED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/contact`,
      lastModified: LAUNCH,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    /* Linked from the footer on every page and already picking up impressions
       (privacy-policy sat at position 6.7), but absent from the sitemap until
       the 15 Aug 2026 audit. */
    {
      url: `${BASE}/privacy-policy`,
      lastModified: LAUNCH,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${BASE}/terms-of-use`,
      lastModified: LAUNCH,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    ...industryRoutes,
    ...serviceRoutes,
    ...workRoutes,
    ...blogRoutes,
  ]
}
