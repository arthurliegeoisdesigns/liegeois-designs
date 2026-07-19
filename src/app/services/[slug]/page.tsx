import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { servicePages, servicePageBySlug } from '@/content/services-pages'
import { caseStudies } from '@/content/case-studies'

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
    title: svc.metaTitle,
    description: svc.metaDescription,
    alternates: { canonical: `${BASE}/services/${svc.slug}` },
    openGraph: {
      title: svc.metaTitle,
      description: svc.metaDescription,
      url: `${BASE}/services/${svc.slug}`,
      images: [{ url: svc.image }],
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

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: svc.h1,
    description: svc.metaDescription,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Liégeois Designs',
      url: BASE,
    },
    areaServed: ['United States', 'Canada'],
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

      {/* ── hero ── */}
      <section style={{ padding: 'clamp(140px, 16vh, 200px) var(--section-pad-x) clamp(48px, 6vw, 80px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={label}>
            <Link href="/services" style={{ color: 'inherit', textDecoration: 'none' }}>
              Services
            </Link>
            {' — '}
            {svc.tagline}
          </p>
          <h1
            className="type-display"
            style={{ color: 'var(--color-text-primary)', margin: '0 0 28px', maxWidth: '760px' }}
          >
            {svc.h1}
          </h1>
          <p
            className="type-body-lg"
            style={{ color: 'var(--color-text-secondary)', margin: 0, maxWidth: '560px', lineHeight: 1.7 }}
          >
            {svc.lead}
          </p>
        </div>
      </section>

      {/* ── image ── */}
      <section style={{ padding: '0 var(--section-pad-x)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', aspectRatio: '16/8', overflow: 'hidden' }}>
          <Image src={svc.image} alt={svc.imageAlt} fill sizes="(max-width: 1100px) 92vw, 1100px" quality={75} style={{ objectFit: 'cover' }} />
        </div>
      </section>

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
            <p style={label}>Process — {svc.timeline}</p>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, counterReset: 'step' }}>
              {svc.process.map((st, i) => (
                <li key={st.title} style={{ padding: '10px 0', borderBottom: '0.5px solid var(--color-border)' }}>
                  <span
                    className="type-body"
                    style={{ color: 'var(--color-text-primary)', display: 'block', fontWeight: 500 }}
                  >
                    {String(i + 1).padStart(2, '0')} — {st.title}
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
                    <Image src={cs!.images[0]} alt={`${cs!.client} — ${cs!.project}`} fill sizes="(max-width: 768px) 92vw, 350px" quality={70} style={{ objectFit: 'cover' }} />
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
            A 30-minute intake call. No forms, no auto-responders — the project, the stakes,
            and whether there&apos;s a fit.
          </p>
          <Link href="/contact" className="btn-primary" style={{ display: 'inline-block' }}>
            Let&apos;s talk
          </Link>
          <p className="type-body" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', margin: '40px 0 0' }}>
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
