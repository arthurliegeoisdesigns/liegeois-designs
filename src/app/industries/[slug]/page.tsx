import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { industries, industryBySlug } from '@/content/industries'
import { caseStudies } from '@/content/case-studies'
import { servicePageBySlug } from '@/content/services-pages'

/**
 * /industries/[slug] — sector hubs.
 *
 * Reads its case studies at BUILD TIME by filtering caseStudies on the
 * `industry` field, so there is no second list to drift. Adding a study to a
 * sector is a one-word change in case-studies.ts.
 *
 * GEO note: the counts and client names in the intro are generated from the
 * data, not typed by hand. That keeps the extractable claim ("seven
 * engagements for Philips, Johnson & Johnson...") true as the portfolio grows,
 * which is the whole reason a generative engine would cite the page.
 */

const BASE = 'https://www.liegeoisdesigns.com'

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const ind = industryBySlug[slug]
  if (!ind) return {}
  return {
    title: { absolute: ind.metaTitle },
    description: ind.metaDescription,
    alternates: { canonical: `${BASE}/industries/${ind.slug}` },
    openGraph: {
      title: ind.metaTitle,
      description: ind.metaDescription,
      url: `${BASE}/industries/${ind.slug}`,
      images: [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function IndustryHub({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const ind = industryBySlug[slug]
  if (!ind) notFound()

  const work = caseStudies.filter((c) => c.industry === ind.industry)
  const clients = [...new Set(work.map((w) => w.client))]
  const formats = [...new Set(work.map((w) => w.format))]
  const services = ind.services.map((s) => servicePageBySlug[s]).filter(Boolean)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: ind.h1,
    description: ind.metaDescription,
    url: `${BASE}/industries/${ind.slug}`,
    about: ind.industry,
    provider: { '@type': 'ProfessionalService', name: 'Liégeois Designs', url: BASE },
    hasPart: work.map((w) => ({
      '@type': 'CreativeWork',
      name: `${w.client}: ${w.project}`,
      url: `${BASE}/work/${w.slug}`,
      genre: w.format,
      about: w.industry,
      dateCreated: String(w.year),
    })),
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Industries', item: `${BASE}/industries` },
      { '@type': 'ListItem', position: 2, name: ind.name, item: `${BASE}/industries/${ind.slug}` },
    ],
  }

  return (
    <main className="ind">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="ind-head">
        <div className="ind-w">
          <p className="ind-eyebrow">
            <Link href="/industries">Industries</Link>, {ind.name}
          </p>
          <h1 className="ind-h1">{ind.h1}</h1>
          <p className="ind-lead">{ind.lead}</p>

          {/* Generated, not typed: the sentence a generative engine can lift. */}
          <p className="ind-facts">
            {work.length} {work.length === 1 ? 'engagement' : 'engagements'} for{' '}
            {clients.slice(0, 5).join(', ')}
            {clients.length > 5 ? ` and ${clients.length - 5} more` : ''}. Formats:{' '}
            {formats.join(', ')}.
          </p>
        </div>
      </section>

      <section className="ind-body">
        <div className="ind-w">
          {ind.body.map((p, i) => (
            <p key={i} className="ind-p">{p}</p>
          ))}
        </div>
      </section>

      <section className="ind-work">
        <div className="ind-w">
          <p className="ind-eyebrow">Selected work in {ind.name.toLowerCase()}</p>
          <div className="ind-grid">
            {work.map((w) => (
              <Link key={w.slug} href={`/work/${w.slug}`} className="ind-card">
                <div className="ind-shot">
                  <Image
                    src={w.images[0]}
                    alt={`${w.client}: ${w.project}`}
                    fill
                    sizes="(max-width: 760px) 92vw, 360px"
                    quality={62}
                    loading="lazy"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h2 className="ind-card-client">{w.client}</h2>
                <span className="ind-card-meta">{w.format} · {w.year}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ind-services">
        <div className="ind-w">
          <p className="ind-eyebrow">What this sector usually buys</p>
          <div className="ind-svc-row">
            {services.map((s) => (
              <Link key={s!.slug} href={`/services/${s!.slug}`} className="ind-svc">
                <b>{s!.name}</b>
                <span>{s!.tagline}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ind-end">
        <div className="ind-w">
          <h2 className="ind-endh">Ready when you are.</h2>
          <p>
            A 30-minute call. The project, the stakes, and whether there&rsquo;s a fit.
            Engagements start at $5,000.
          </p>
          <Link href="/contact" className="v2-cta">Let&rsquo;s talk</Link>
          <p className="ind-others">
            Other sectors:{' '}
            {industries
              .filter((i) => i.slug !== ind.slug)
              .map((i, n, arr) => (
                <span key={i.slug}>
                  <Link href={`/industries/${i.slug}`}>{i.name}</Link>
                  {n < arr.length - 1 ? ' · ' : ''}
                </span>
              ))}
          </p>
        </div>
      </section>
    </main>
  )
}
