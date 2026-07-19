import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { caseStudies } from '@/content/case-studies'
import CaseStudyClientWrapper from './CaseStudyClientWrapper'

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
  const metaDesc = cs.seoDescription ?? `${cs.format} for ${cs.client} — ${cs.tagline} Presentation design and visual storytelling by Liégeois Designs.`
  return {
    title: `${cs.client} — ${cs.project}`,
    description: metaDesc,
    alternates: { canonical: `https://www.liegeoisdesigns.com/work/${slug}` },
    openGraph: {
      title: `${cs.client} — ${cs.project}`,
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

  const metaDesc = cs.seoDescription ?? `${cs.format} for ${cs.client} — ${cs.tagline} Presentation design and visual storytelling by Liégeois Designs.`

  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${cs.client} — ${cs.project}`,
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
      { '@type': 'ListItem', position: 3, name: `${cs.client} — ${cs.project}`, item: `https://www.liegeoisdesigns.com/work/${cs.slug}` },
    ],
  }

  const videoSchema = cs.video
    ? {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: `${cs.client} — ${cs.project}`,
        description: metaDesc,
        thumbnailUrl: cs.images[0],
        uploadDate: cs.videoUploadDate ?? `${cs.year}-01-01`,
        contentUrl: cs.video,
        embedUrl: `https://www.liegeoisdesigns.com/work/${cs.slug}`,
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
    <main style={{ background: 'var(--color-dark)', minHeight: '100vh' }}>
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
      <CaseStudyClientWrapper
        cs={cs}
        index={currentIndex}
        total={caseStudies.length}
        prev={prev}
        next={next}
      />

      {/*
        ── Server-rendered project overview — always in HTML for Google ──────
        CaseStudyClient (above) is ssr:false so Google can't crawl it.
        This section gives Googlebot the structured text content it needs
        to understand and index each case study page.
        Styled as a genuine "Project Details" footer section — useful to users too.
      */}
      <section
        aria-label="Project details"
        style={{
          background: 'var(--color-dark)',
          borderTop: '0.5px solid rgba(255,255,255,0.08)',
          padding: 'clamp(48px, 6vw, 72px) var(--section-pad-x)',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.5625rem',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--color-on-dark-faint)',
            margin: '0 0 clamp(24px, 3vw, 36px)',
          }}>
            Project Overview
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(32px, 4vw, 56px)',
          }}>
            <div>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.375rem, 2.5vw, 1.875rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--color-on-dark)',
                margin: '0 0 8px',
              }}>
                {cs.client}
              </h1>
              <h2 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.45)',
                margin: '0 0 20px',
              }}>
                {cs.project}
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.60)',
                margin: 0,
              }}>
                {cs.tagline}
              </p>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              {[
                { label: 'Format',   value: cs.format },
                { label: 'Industry', value: cs.industry },
                { label: 'Year',     value: String(cs.year) },
                ...(cs.tool   ? [{ label: 'Built in', value: cs.tool }] : []),
                ...(cs.agency ? [{ label: 'Agency',   value: cs.agency }] : []),
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', gap: '16px' }}>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    color: 'var(--color-on-dark-faint)',
                    minWidth: '80px',
                    flexShrink: 0,
                    paddingTop: '1px',
                  }}>
                    {label}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.55)',
                  }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Narrative text — when available, adds rich text content for SEO */}
          {(cs.theAsk || cs.challenge || cs.solution || cs.outcome) && (
            <div style={{
              marginTop: 'clamp(40px, 5vw, 64px)',
              paddingTop: 'clamp(40px, 5vw, 64px)',
              borderTop: '0.5px solid rgba(255,255,255,0.06)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: 'clamp(32px, 4vw, 56px)',
            }}>
              <div>
                {cs.theAsk && (
                  <div style={{ marginBottom: '32px' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-on-dark-faint)', margin: '0 0 10px' }}>The Ask</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{cs.theAsk}</p>
                  </div>
                )}
                {cs.challenge && (
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-on-dark-faint)', margin: '0 0 10px' }}>The Challenge</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{cs.challenge}</p>
                  </div>
                )}
              </div>
              <div>
                {cs.solution && (
                  <div style={{ marginBottom: '32px' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-on-dark-faint)', margin: '0 0 10px' }}>The Solution</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{cs.solution}</p>
                  </div>
                )}
                {cs.outcome && (
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-on-dark-faint)', margin: '0 0 10px' }}>The Outcome</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{cs.outcome}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Related projects — crawl paths + authority flow (SEO sprint,
                 July 2026): same industry first, then same format ── */}
          {(() => {
            const related = [
              ...caseStudies.filter((c) => c.slug !== cs.slug && c.industry === cs.industry),
              ...caseStudies.filter((c) => c.slug !== cs.slug && c.industry !== cs.industry && c.format === cs.format),
            ].slice(0, 3)
            if (related.length === 0) return null
            return (
              <div style={{
                marginTop: 'clamp(40px, 5vw, 64px)',
                paddingTop: 'clamp(40px, 5vw, 64px)',
                borderTop: '0.5px solid rgba(255,255,255,0.06)',
              }}>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.625rem', letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: 'var(--color-on-dark-faint)', margin: '0 0 24px',
                }}>
                  Related Projects
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                  gap: '20px',
                }}>
                  {related.map((r) => (
                    <a key={r.slug} href={`/work/${r.slug}`} style={{ textDecoration: 'none' }}>
                      <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', marginBottom: '10px' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={r.images[0].replace('/f_auto,q_auto/', '/f_auto,q_auto,w_600,c_fill,ar_16:10/')}
                          alt={`${r.client} — ${r.project}`}
                          loading="lazy"
                          decoding="async"
                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <span style={{
                        fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500,
                        color: 'var(--color-on-dark)', display: 'block',
                      }}>
                        {r.client}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-body)', fontSize: '0.8125rem',
                        color: 'rgba(255,255,255,0.45)',
                      }}>
                        {r.project}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )
          })()}
        </div>
      </section>
    </main>
  )
}
