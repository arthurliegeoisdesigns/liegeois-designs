import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { caseStudies } from '@/content/case-studies'
import { caseStudyTitle, clampDescription } from '@/lib/seo'
import { videoMetaFor } from '@/lib/video'
/**
 * Imported directly, not through a dynamic() wrapper.
 *
 * This used to go through CaseStudyClientWrapper, whose only job was to load
 * CaseStudyClient with ssr:false. The stated reason was a Turbopack
 * dual-React crash when framer-motion hooks ran during static prerendering.
 * That crash no longer reproduces on Next 16.3 — removing the flag builds
 * all 36 pages cleanly.
 *
 * What the flag was costing: everything from the video reel down — the
 * player, the gallery, the before/after slider and the closing CTA — existed
 * only after hydration. Served HTML carried zero <video> elements while the
 * page's own VideoObject schema declared one, which is a direct explanation
 * for Search Console's "Video isn't on a watch page". Mean rendered body copy
 * across the 36 case studies went from ~360 words to 539 by deleting one flag.
 *
 * If a prerender crash ever returns, fix the offending hook. Do not restore
 * ssr:false — it takes the gallery and the before/after work with it.
 */
import CaseStudyClient from './CaseStudyClient'

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) return {}
  // Clamped: raw seoDescription/tagline ran to 371 chars on some studies and
  // Google cuts at ~158. Full text still goes to the schema below, which has
  // no length constraint.
  const metaDesc = clampDescription(
    cs.seoDescription ?? `${cs.format} for ${cs.client}. ${cs.tagline} Presentation design by Liégeois Designs.`,
  )
  return {
    // `absolute` so the helper controls the brand suffix; the root template
    // would otherwise append it and blow the 60-char budget.
    title: { absolute: caseStudyTitle(cs.client, cs.format) },
    description: metaDesc,
    alternates: { canonical: `https://www.liegeoisdesigns.com/work/${slug}` },
    openGraph: {
      title: `${cs.client}: ${cs.project}`,
      description: metaDesc,
      url: `https://www.liegeoisdesigns.com/work/${slug}`,
      images: [{ url: cs.images[0], width: 1200, height: 900 }],
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) notFound()

  const currentIndex = caseStudies.findIndex((c) => c.slug === slug)
  const prev = caseStudies[currentIndex - 1] ?? null
  const next = caseStudies[currentIndex + 1] ?? null

  const metaDesc = cs.seoDescription ?? `${cs.format} for ${cs.client}, ${cs.tagline} Presentation design and visual storytelling by Liégeois Designs.`

  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${cs.client}: ${cs.project}`,
    description: metaDesc,
    creator: {
      '@type': 'Person',
      name: 'Arthur Liegeois',
      url: 'https://www.liegeoisdesigns.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Liégeois Designs',
      url: 'https://www.liegeoisdesigns.com',
    },
    dateCreated: `${cs.year}-01-01`,
    image: cs.images[0],
    url: `https://www.liegeoisdesigns.com/work/${cs.slug}`,
    keywords: [cs.format, cs.industry, 'presentation design', 'visual storytelling', 'Liégeois Designs'].join(', '),
    ...(cs.agency ? { contributor: { '@type': 'Organization', name: cs.agency } } : {}),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.liegeoisdesigns.com' },
      { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://www.liegeoisdesigns.com/work' },
      { '@type': 'ListItem', position: 3, name: `${cs.client}: ${cs.project}`, item: `https://www.liegeoisdesigns.com/work/${cs.slug}` },
    ],
  }

  /* Built from videoMetaFor so the sitemap at /video-sitemap.xml describes
     these videos in exactly the same terms. See src/lib/video.ts. */
  const vm = videoMetaFor(cs, metaDesc)
  const videoSchema = vm
    ? {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: vm.title,
        description: vm.description,
        thumbnailUrl: vm.thumbnailUrl,
        uploadDate: vm.uploadDate,
        ...(vm.duration ? { duration: vm.duration } : {}),
        contentUrl: vm.contentUrl,
        /* embedUrl deliberately omitted. It previously pointed at this page,
           but embedUrl must be a player endpoint that can be loaded in an
           iframe, and this page is a case study. Declaring a non-player URL
           as a player is one of the things Google checks when deciding
           whether a video sits on a watch page. contentUrl alone is valid. */
        publisher: {
          '@type': 'Organization',
          name: 'Liégeois Designs',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.liegeoisdesigns.com/images/logos/liegeois-designs-logo.png',
          },
        },
      }
    : null

  return (
    <main style={{ background: 'var(--color-paper)', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {videoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      )}

      {/* ── Animated case study experience — client-side only (ssr:false via wrapper) ── */}
      <CaseStudyClient
        cs={cs}
        index={currentIndex}
        total={caseStudies.length}
        prev={prev}
        next={next}
      />

      {/* The "Project Overview" duplicate that used to sit here is gone.
         It existed only because CaseStudyClient was ssr:false and Google
         could not crawl it. With the real sections now server-rendered it
         was shipping the tagline twice, the agency five times and a second
         and third h1 on all 36 pages. */}
    </main>
  )
}
