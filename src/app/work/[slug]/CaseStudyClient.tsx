'use client'

import dynamic from 'next/dynamic'
import type { CaseStudy } from '@/content/types'

// ssr:false breaks the Turbopack dual-React null-hook crash that occurs
// when framer-motion client components are statically prerendered in Next.js 16.
const CaseStudyHero    = dynamic(() => import('./CaseStudyHero'),    { ssr: false })
const CaseStudyGallery = dynamic(() => import('./CaseStudyGallery'), { ssr: false })
const CaseStudyNav     = dynamic(() => import('./CaseStudyNav'),     { ssr: false })

interface Props {
  cs: CaseStudy
  index: number
  total: number
  prev: CaseStudy | null
  next: CaseStudy | null
}

function NarrativeBlock({ label, text }: { label: string; text: string }) {
  const lines = text.split('\n').filter((l) => l.trim())
  const isBulletList = lines.every((l) => l.trim().startsWith('•'))

  return (
    <div style={{ marginBottom: '48px' }}>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.625rem',
        fontWeight: 400,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--color-on-dark-muted)',
        margin: '0 0 16px',
      }}>
        {label}
      </p>
      {isBulletList ? (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {lines.map((line, i) => (
            <li key={i} className="type-body" style={{ color: 'rgba(255,255,255,0.62)', paddingLeft: '16px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--color-on-dark-faint)' }}>•</span>
              {line.replace(/^•\s*/, '')}
            </li>
          ))}
        </ul>
      ) : (
        <p className="type-body" style={{ color: 'rgba(255,255,255,0.62)', margin: 0, whiteSpace: 'pre-line', lineHeight: 1.7 }}>
          {text}
        </p>
      )}
    </div>
  )
}

export default function CaseStudyClient({ cs, index, total, prev, next }: Props) {
  const hasNarrative = cs.theAsk || cs.challenge || cs.solution || cs.outcome

  return (
    <>
      {/* Hero — full-width image/video */}
      <CaseStudyHero cs={cs} index={index} total={total} />

      {/* Narrative — renders BELOW the hero (fixes mobile ordering) */}
      {hasNarrative && (
        <section style={{
          padding: 'clamp(56px, 6vw, 80px) var(--section-pad-x)',
        }}>
          <div style={{
            maxWidth: '960px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: 'clamp(40px, 5vw, 72px)',
            borderTop: '0.5px solid var(--color-dark-border)',
            paddingTop: 'clamp(48px, 5vw, 64px)',
          }}>
            <div>
              {cs.theAsk    && <NarrativeBlock label="The Ask"       text={cs.theAsk} />}
              {cs.challenge && <NarrativeBlock label="The Challenge" text={cs.challenge} />}
            </div>
            <div>
              {cs.solution  && <NarrativeBlock label="The Solution"  text={cs.solution} />}
              {cs.outcome   && <NarrativeBlock label="The Outcome"   text={cs.outcome} />}
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      <div style={{ height: '0.5px', background: 'var(--color-on-dark-border)' }} />

      {/* Gallery — wrapped with horizontal padding for mobile */}
      {cs.images.length > 1 && (
        <div style={{ padding: 'clamp(32px, 4vw, 48px) var(--section-pad-x)' }}>
          <CaseStudyGallery images={cs.images.slice(1)} client={cs.client} />
        </div>
      )}

      <CaseStudyNav prev={prev} next={next} />
    </>
  )
}
