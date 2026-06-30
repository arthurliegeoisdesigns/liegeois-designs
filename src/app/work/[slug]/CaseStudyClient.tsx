'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion'
import type { CaseStudy } from '@/content/types'

// ssr:false breaks the Turbopack dual-React null-hook crash that occurs
// when framer-motion client components are statically prerendered in Next.js 16.
const CaseStudyHero       = dynamic(() => import('./CaseStudyHero'),       { ssr: false })
const CaseStudyGallery    = dynamic(() => import('./CaseStudyGallery'),    { ssr: false })
const CaseStudyNav        = dynamic(() => import('./CaseStudyNav'),        { ssr: false })
const BeforeAfterSlider   = dynamic(() => import('./BeforeAfterSlider'),   { ssr: false })

const ease = [0.16, 1, 0.3, 1] as const

interface Props {
  cs: CaseStudy
  index: number
  total: number
  prev: CaseStudy | null
  next: CaseStudy | null
}

// ── Narrative block with whileInView reveal ───────────────────────────────────
function NarrativeBlock({
  label,
  text,
  delay = 0,
}: {
  label: string
  text: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  const lines = text.split('\n').filter((l) => l.trim())
  const isBulletList = lines.every((l) => l.trim().startsWith('•'))

  return (
    <motion.div
      style={{ marginBottom: '48px' }}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease, delay }}
    >
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
    </motion.div>
  )
}

// ── Video player — autoplay muted loop ───────────────────────────────────────
function VideoPlayer({ src, poster }: { src: string; poster: string }) {
  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block', background: 'var(--color-canvas)' }}
    />
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CaseStudyClient({ cs, index, total, prev, next }: Props) {
  const reduced = useReducedMotion()
  const hasNarrative = cs.theAsk || cs.challenge || cs.solution || cs.outcome
  const hasGallery = cs.images.length > 1

  // ── Scroll progress bar ───────────────────────────────────────────────────
  const { scrollYProgress, scrollY } = useScroll()
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  // ── Sticky client name — appears once hero scrolls off ────────────────────
  const [stickyVisible, setStickyVisible] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => {
    setStickyVisible(y > 480)
  })

  return (
    <>
      {/* ── Fixed scroll progress bar ── */}
      {!reduced && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'var(--color-accent)',
            transformOrigin: 'left center',
            scaleX: progressScaleX,
            zIndex: 200,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* ── Sticky client name ── */}
      <motion.div
        animate={{ opacity: stickyVisible ? 1 : 0, y: stickyVisible ? 0 : -4 }}
        transition={{ duration: 0.3, ease }}
        style={{
          position: 'fixed',
          top: '14px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 150,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(10,10,10,0.72)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '0.5px solid rgba(255,255,255,0.10)',
          padding: '6px 16px 6px 12px',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{
          display: 'inline-block',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'var(--color-accent)',
          flexShrink: 0,
        }} />
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          letterSpacing: '0.04em',
          color: 'rgba(255,255,255,0.80)',
        }}>
          {cs.client}
        </span>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.6875rem',
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '0.08em',
        }}>
          {index + 1} / {total}
        </span>
      </motion.div>

      {/* ── Hero — full-width image/video ── */}
      <CaseStudyHero cs={cs} index={index} total={total} />

      {/* ── Project metadata + narrative — always server-rendered for SEO ── */}
      <section style={{ padding: 'clamp(56px, 6vw, 80px) var(--section-pad-x)' }}>
        <div style={{
          maxWidth: '960px',
          margin: '0 auto',
          borderTop: '0.5px solid var(--color-dark-border)',
          paddingTop: 'clamp(48px, 5vw, 64px)',
        }}>
          {/* Metadata strip — always visible, indexable by Google (plain HTML, no motion to avoid SSR crash) */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px 24px',
            marginBottom: 'clamp(28px, 4vw, 44px)',
          }}>
            {[cs.format, cs.industry, String(cs.year), ...(cs.tool ? [cs.tool] : [])].map((tag, i) => (
              <span key={i} style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.625rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-on-dark-faint)',
              }}>
                {tag}
              </span>
            ))}
          </div>

          <div style={{ marginBottom: hasNarrative ? 'clamp(40px, 5vw, 64px)' : 0 }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--color-on-dark)',
              margin: '0 0 12px',
            }}>
              {cs.client}
            </h1>
            <h2 style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.50)',
              margin: '0 0 20px',
              letterSpacing: '0.01em',
            }}>
              {cs.project}
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.62)',
              margin: 0,
              maxWidth: '600px',
            }}>
              {cs.tagline}
            </p>
          </div>

          {/* Narrative columns — only when copy exists */}
          {hasNarrative && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
              gap: 'clamp(40px, 5vw, 72px)',
            }}>
              <div>
                {cs.theAsk    && <NarrativeBlock label="The Ask"       text={cs.theAsk}    delay={0} />}
                {cs.challenge && <NarrativeBlock label="The Challenge" text={cs.challenge} delay={0.08} />}
              </div>
              <div>
                {cs.solution  && <NarrativeBlock label="The Solution"  text={cs.solution}  delay={0.12} />}
                {cs.outcome   && <NarrativeBlock label="The Outcome"   text={cs.outcome}   delay={0.18} />}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Video reel ── */}
      {cs.video && (
        <>
          <div style={{ height: '0.5px', background: 'var(--color-on-dark-border)' }} />
          <motion.div
            style={{ padding: 'clamp(32px, 4vw, 48px) var(--section-pad-x)' }}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease }}
          >
            <div style={{ maxWidth: '960px', margin: '0 auto' }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.5625rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-on-dark-faint)',
                margin: '0 0 clamp(20px, 3vw, 32px)',
              }}>
                In Motion
              </p>
              <VideoPlayer src={cs.video} poster={cs.images[0]} />
            </div>
          </motion.div>
        </>
      )}

      {/* ── Before / After transformation ── */}
      {cs.beforeAfter && cs.beforeAfter.length > 0 && (
        <BeforeAfterSlider pairs={cs.beforeAfter} />
      )}

      {/* ── Gallery ── */}
      {hasGallery && (
        <>
          <div style={{ height: '0.5px', background: 'var(--color-on-dark-border)' }} />

          <div style={{ padding: 'clamp(32px, 4vw, 48px) var(--section-pad-x)' }}>
            {/* Gallery eyebrow */}
            <motion.p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.5625rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-on-dark-faint)',
                margin: '0 0 clamp(20px, 3vw, 32px)',
              }}
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.6, ease }}
            >
              Selected Slides
            </motion.p>

            <CaseStudyGallery images={cs.images.slice(1, 6)} client={cs.client} />
          </div>
        </>
      )}

      {/* ── Bottom CTA ── */}
      <motion.section
        style={{
          padding: 'clamp(56px, 7vw, 96px) var(--section-pad-x)',
          borderTop: '0.5px solid var(--color-on-dark-border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '24px',
        }}
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease }}
      >
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.5625rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--color-on-dark-faint)',
          margin: 0,
        }}>
          Start a project
        </p>
        <h2
          className="type-display"
          style={{
            color: 'var(--color-on-dark)',
            margin: 0,
            maxWidth: '600px',
            lineHeight: 1.05,
          }}
        >
          Your deck should change the room.
        </h2>
        <p className="type-body" style={{ color: 'rgba(255,255,255,0.55)', margin: 0, maxWidth: '440px' }}>
          Let&apos;s build something that moves an audience — not just informs them.
        </p>
        <Link
          href="/contact"
          style={{
            marginTop: '8px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-on-dark)',
            textDecoration: 'none',
            padding: '14px 32px',
            border: '0.5px solid rgba(255,255,255,0.25)',
            transition: 'background 250ms ease, border-color 250ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
          }}
          data-cursor-hover
        >
          Let&apos;s talk →
        </Link>
      </motion.section>

      <CaseStudyNav prev={prev} next={next} />
    </>
  )
}
