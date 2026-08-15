import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { servicePages, servicePageBySlug } from '@/content/services-pages'
import { caseStudies } from '@/content/case-studies'
import ServiceProof from '@/components/ServiceProof'

/**
 * Per-service landing pages — the SEO backbone (July 2026).
 * Server-rendered, light theme (default tokens), search-intent content
 * with Service + FAQPage + Breadcrumb schema. These pages exist to rank
 * for commercial queries the single /services page never could.
 */

const BASE = 'https://www.liegeoisdesigns.com'

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const svc = servicePageBySlug[slug]
  if (!svc) return {}
  return {
    // `absolute` bypasses the root layout's '%s | Liégeois Designs' template.
    // metaTitle already carries the brand (openGraph below has no template and
    // needs it), so letting the template run appended it a second time.
    title: { absolute: svc.metaTitle },
    description: svc.metaDescription,
    alternates: { canonical: `${BASE}/services/${svc.slug}` },
    openGraph: {
      title: svc.metaTitle,
      description: svc.metaDescription,
      url: `${BASE}/services/${svc.slug}`,
      images: [{ url: svc.image, width: 1200, height: 630 }],
    },
  }
}

const label: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.6875rem',
  fontWeight: 500,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--color-text-muted)',
  margin: '0 0 18px',
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const svc = servicePageBySlug[slug]
  if (!svc) notFound()

  const related = svc.relatedWork
    .map((s) => caseStudies.find((cs) => cs.slug === s))
    .filter(Boolean)

  /* GEO: a generative engine answering "who does X and what does it cost"
     needs the price floor, the deliverables and the provider's credentials in
     structured form. All of it already exists on the page in prose; this makes
     it machine-readable. Nothing here is a claim the page does not also make
     in words. */
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: svc.h1,
    alternateName: svc.name,
    description: svc.metaDescription,
    serviceType: svc.name,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Liégeois Designs',
      url: BASE,
      founder: {
        '@type': 'Person',
        name: 'Arthur Liégeois',
        url: `${BASE}/about`,
        award: 'Oracle Quota Club, four consecutive years',
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Huthwaite SPIN Selling Certification',
        },
      },
    },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Canada' },
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${BASE}/contact`,
      servicePhone: undefined,
      availableLanguage: ['English', 'French'],
    },
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: 5000,
        priceCurrency: 'USD',
      },
      url: `${BASE}/services/${svc.slug}`,
      availability: 'https://schema.org/InStock',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${svc.name} deliverables`,
      itemListElement: svc.deliverables.map((d) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: d },
      })),
    },
    termsOfService: `${BASE}/terms-of-use`,
    url: `${BASE}/services/${svc.slug}`,
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: svc.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Services', item: `${BASE}/services` },
      { '@type': 'ListItem', position: 2, name: svc.name, item: `${BASE}/services/${svc.slug}` },
    ],
  }

  return (
    <main style={{ background: 'var(--color-paper)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── hero: the work as an OBJECT, beside the argument ──────────────
          Was a left-hand text column with the right half of the frame empty,
          followed by a separate full-bleed image. Both are replaced by one
          composition: argument left, the deck as a physical artifact right.

          The stack is built from THIS service's own related case studies, so
          each page shows the work a visitor is actually buying rather than a
          single decorative image.

          A slide used as a BACKDROP fails — its own typography competes with
          the headline. At an angle with depth and shadow it reads as an
          object instead, and the conflict disappears.

          Only the front card is eager; the two behind are dimmed and lazy.
          The h1 is sized to stay larger than the front card so TEXT holds
          LCP — text paints with the font, an image waits on the network.
          See DESIGN.md and the JourneyHero scene-0 note. ─────────────── */}
      <section className="svc-hero">
        <div className="svc-hero-grid">
          <div className="svc-hero-copy">
            <p style={label}>
              <Link href="/services" style={{ color: 'inherit', textDecoration: 'none' }}>
                Services
              </Link>
              {', '}
              {svc.tagline}
            </p>
            <h1 className="type-display svc-hero-h1" style={{ color: 'var(--color-text-primary)', margin: '0 0 24px' }}>
              {svc.h1}
            </h1>
            <p
              className="type-body-lg"
              style={{ color: 'var(--color-text-secondary)', margin: 0, maxWidth: '46ch', lineHeight: 1.7 }}
            >
              {svc.lead}
            </p>
          </div>

          {/* Deck stack. The two rear cards come from svc.deckSlides, NOT from
              relatedWork[].images[0]: that derived the mid card from the same
              file as svc.image, so the front slide appeared twice on three of
              the four pages. deckSlides guarantees three different projects. */}
          <div className="svc-hero-stage" aria-hidden="true">
            <div className="svc-card svc-card-1">
              <Image src={svc.deckSlides[0]} alt="" fill sizes="(max-width: 900px) 72vw, 44vw" quality={55} loading="lazy" style={{ objectFit: 'cover' }} />
            </div>
            <div className="svc-card svc-card-2">
              <Image src={svc.deckSlides[1]} alt="" fill sizes="(max-width: 900px) 72vw, 44vw" quality={60} loading="lazy" style={{ objectFit: 'cover' }} />
            </div>
            <div className="svc-card svc-card-3">
              <Image src={svc.image} alt={svc.imageAlt} fill sizes="(max-width: 900px) 72vw, 44vw" quality={70} style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── who is arguing ──────────────────────────────────────────────
          Placed directly under the hero rather than further down: these
          pages are the landing point for commercial search, so the visitor
          meets the argument and its author in the same screenful. Per-slug
          emphasis lives in ServiceProof. ─────────────────────────────── */}
      <ServiceProof slug={svc.slug} />

      {/* ── body + facts ── */}
      <section style={{ padding: 'clamp(56px, 7vw, 96px) var(--section-pad-x)' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(40px, 5vw, 72px)',
          }}
        >
          <div>
            {svc.body.map((p, i) => (
              <p
                key={i}
                className="type-body"
                style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, margin: i === 0 ? '0 0 22px' : '0 0 22px' }}
              >
                {p}
              </p>
            ))}
          </div>
          <div>
            <p style={label}>Deliverables</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px' }}>
              {svc.deliverables.map((d) => (
                <li
                  key={d}
                  className="type-body"
                  style={{
                    color: 'var(--color-text-primary)',
                    padding: '10px 0',
                    borderBottom: '0.5px solid var(--color-border)',
                  }}
                >
                  {d}
                </li>
              ))}
            </ul>
            <p style={label}>Process, {svc.timeline}</p>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, counterReset: 'step' }}>
              {svc.process.map((st, i) => (
                <li key={st.title} style={{ padding: '10px 0', borderBottom: '0.5px solid var(--color-border)' }}>
                  <span
                    className="type-body"
                    style={{ color: 'var(--color-text-primary)', display: 'block', fontWeight: 500 }}
                  >
                    {String(i + 1).padStart(2, '0')}, {st.title}
                  </span>
                  <span className="type-body" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                    {st.detail}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── related work (internal links + proof) ── */}
      {related.length > 0 && (
        <section style={{ padding: '0 var(--section-pad-x) clamp(56px, 7vw, 96px)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p style={label}>Selected work in this format</p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                gap: '20px',
              }}
            >
              {related.map((cs) => (
                <Link key={cs!.slug} href={`/work/${cs!.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', marginBottom: '12px' }}>
                    <Image src={cs!.images[0]} alt={`${cs!.client}: ${cs!.project}`} fill sizes="(max-width: 768px) 92vw, 350px" quality={70} style={{ objectFit: 'cover' }} />
                  </div>
                  <span className="type-body" style={{ color: 'var(--color-text-primary)', display: 'block', fontWeight: 500 }}>
                    {cs!.client}
                  </span>
                  <span className="type-body" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                    {cs!.project}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section style={{ padding: '0 var(--section-pad-x) clamp(56px, 7vw, 96px)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <p style={label}>Questions, answered</p>
          {svc.faqs.map((f) => (
            <details key={f.q} style={{ borderBottom: '0.5px solid var(--color-border)', padding: '18px 0' }}>
              <summary
                className="type-body"
                style={{ color: 'var(--color-text-primary)', fontWeight: 500, cursor: 'pointer', listStyle: 'none' }}
              >
                {f.q}
              </summary>
              <p className="type-body" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, margin: '14px 0 0' }}>
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA + cross-links ── */}
      <section style={{ padding: '0 var(--section-pad-x) clamp(80px, 10vw, 140px)', textAlign: 'center' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 className="type-h1" style={{ color: 'var(--color-text-primary)', margin: '0 0 20px' }}>
            Ready when you are.
          </h2>
          <p className="type-body" style={{ color: 'var(--color-text-secondary)', margin: '0 0 32px' }}>
            A 30-minute intake call. No forms, no auto-responders, the project, the stakes,
            and whether there&apos;s a fit.
          </p>
          <Link href="/contact" className="btn-primary" style={{ display: 'inline-block' }}>
            Let&apos;s talk
          </Link>
          <p className="type-body svc-crosslinks" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', margin: '40px 0 0' }}>
            Also see:{' '}
            {servicePages
              .filter((s) => s.slug !== svc.slug)
              .map((s, i, arr) => (
                <span key={s.slug}>
                  <Link href={`/services/${s.slug}`} style={{ color: 'var(--color-text-secondary)' }}>
                    {s.name}
                  </Link>
                  {i < arr.length - 1 ? ' · ' : ''}
                </span>
              ))}
          </p>
        </div>
      </section>
    </main>
  )
}
