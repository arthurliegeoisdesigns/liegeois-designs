import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { motion } from 'framer-motion'
import { caseStudies } from '@/content/case-studies'
import CaseStudyHero from './CaseStudyHero'
import CaseStudyGallery from './CaseStudyGallery'
import CaseStudyNav from './CaseStudyNav'

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
  return {
    title: `${cs.client} — Liégeois Designs`,
    description: cs.tagline,
    openGraph: {
      title: `${cs.client} — ${cs.project}`,
      description: cs.tagline,
      images: [{ url: cs.images[0], width: 1200, height: 900 }],
    },
  }
}

function NarrativeBlock({ label, text }: { label: string; text: string }) {
  const lines = text.split('\n').filter((l) => l.trim())
  const isBulletList = lines.every((l) => l.trim().startsWith('•'))

  return (
    <div
      style={{ marginBottom: '48px' }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.625rem',
          fontWeight: 400,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--color-on-dark-muted)',
          margin: '0 0 16px',
        }}
      >
        {label}
      </p>
      {isBulletList ? (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {lines.map((line, i) => (
            <li
              key={i}
              className="type-body"
              style={{ color: 'rgba(255,255,255,0.62)', paddingLeft: '16px', position: 'relative' }}
            >
              <span style={{ position: 'absolute', left: 0, color: 'var(--color-on-dark-faint)' }}>•</span>
              {line.replace(/^•\s*/, '')}
            </li>
          ))}
        </ul>
      ) : (
        <p
          className="type-body"
          style={{ color: 'rgba(255,255,255,0.62)', margin: 0, whiteSpace: 'pre-line', lineHeight: 1.7 }}
        >
          {text}
        </p>
      )}
    </div>
  )
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

  const hasNarrative = cs.theAsk || cs.challenge || cs.solution || cs.outcome

  return (
    <main style={{ background: 'var(--color-dark)', minHeight: '100vh' }}>

      {/* ── Parallax hero + animated header ── */}
      <CaseStudyHero cs={cs} index={currentIndex} total={caseStudies.length} />

      {/* ── Narrative ── */}
      {hasNarrative && (
        <section style={{ padding: 'clamp(56px, 6vw, 80px) var(--section-pad-x)' }}>
          <div
            style={{
              maxWidth: '960px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
              gap: 'clamp(40px, 5vw, 72px)',
              borderTop: '0.5px solid var(--color-dark-border)',
              paddingTop: 'clamp(48px, 5vw, 64px)',
            }}
          >
            <div>
              {cs.theAsk && <NarrativeBlock label="The Ask" text={cs.theAsk} />}
              {cs.challenge && <NarrativeBlock label="The Challenge" text={cs.challenge} />}
            </div>
            <div>
              {cs.solution && <NarrativeBlock label="The Solution" text={cs.solution} />}
              {cs.outcome && <NarrativeBlock label="The Outcome" text={cs.outcome} />}
            </div>
          </div>
        </section>
      )}

      {/* ── Image gallery ── */}
      {cs.images.length > 1 && (
        <section
          style={{
            padding: hasNarrative
              ? '0 var(--section-pad-x) clamp(64px, 8vw, 100px)'
              : 'clamp(48px, 6vw, 72px) var(--section-pad-x) clamp(64px, 8vw, 100px)',
          }}
        >
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <CaseStudyGallery images={cs.images.slice(1)} client={cs.client} />
          </div>
        </section>
      )}

      {/* ── Divider ── */}
      <div
        style={{
          height: '0.5px',
          background: 'var(--color-on-dark-border)',
        }}
      />

      {/* ── Next / Prev navigation ── */}
      <CaseStudyNav prev={prev} next={next} />

    </main>
  )
}
