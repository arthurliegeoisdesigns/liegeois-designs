'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
const pillars = [
  {
    title: 'Strategy',
    body: 'Every project starts with one question: what do we need people to think, feel, or do?',
  },
  {
    title: 'Story',
    body: 'The narrative arc that connects vision to audience — and makes the work impossible to forget.',
  },
  {
    title: 'Design',
    body: 'The visual execution that makes it undeniable — bold, clear, and built to last.',
  },
]

const ease = [0.16, 1, 0.3, 1] as const

// Variants — dark fill rises from bottom; text inverts
const pillarVariants   = { idle: {}, hovered: {} }
const sweepVariants    = { idle: { scaleY: 0 }, hovered: { scaleY: 1 } }
const titleVariants    = { idle: { color: 'var(--color-text-primary)' },     hovered: { color: 'var(--color-paper)' } }
const bodyVariants     = { idle: { color: 'var(--color-text-secondary)' },   hovered: { color: 'var(--color-on-dark-muted)' } }
const sweepTransition  = { duration: 0.55, ease }
const textTransition   = { duration: 0.3, ease }

export default function About() {
  const reduced = useReducedMotion()

  return (
    <section
      id="about"
      className="section light-passage light-passage-start"
      style={{ overflow: 'hidden' }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Bio block — headline scrub-revealed line-by-line (ScrollReveals) */}
        <div style={{ maxWidth: '640px', marginBottom: 'clamp(56px, 7vw, 96px)' }}>
          <h2
            data-reveal
            className="type-h1"
            style={{ color: 'var(--color-text-primary)', margin: '0 0 24px' }}
          >
            I&apos;ve been on all three sides of the table.
          </h2>
          <motion.p
            className="type-body"
            style={{ color: 'var(--color-text-secondary)', margin: '0 0 28px' }}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease }}
            viewport={{ once: true, margin: '-80px' }}
          >
            Founder. Strategist. Designer. I&apos;ve sat where you&apos;re sitting — and I know
            what&apos;s on the line. The work earns its place because it starts with the right questions.
          </motion.p>
          <Link href="/about" className="btn-text">
            About Me ↗
          </Link>
        </div>

        {/* Top rule */}
        <motion.div
          style={{ height: '0.5px', background: 'var(--color-border-mid)', marginBottom: 0 }}
          initial={reduced ? false : { scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease }}
          viewport={{ once: true, margin: '-60px' }}
        />

        {/* Pillars — editorial columns */}
        <div className="about-pillars-grid" style={{ gap: 0 }}>
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              // Entry animation
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              viewport={{ once: true, margin: '-60px' }}
              // Hover state
              variants={reduced ? undefined : pillarVariants}
              whileHover={reduced ? undefined : 'hovered'}
              animate="idle"
              data-cursor-hover
              style={{
                position: 'relative',
                overflow: 'hidden',
                padding: 'clamp(28px, 3.5vw, 44px) clamp(20px, 3vw, 40px)',
                borderLeft: i > 0 ? '0.5px solid var(--color-border)' : 'none',
                cursor: 'pointer',
              }}
            >
              {/* ── Sweep fill (dark, rises from bottom) ── */}
              {!reduced && (
                <motion.div
                  variants={sweepVariants}
                  transition={sweepTransition}
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'var(--color-canvas)',
                    transformOrigin: 'bottom center',
                    zIndex: 0,
                    pointerEvents: 'none',
                  }}
                />
              )}

              {/* ── Pillar content (above sweep) ── */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <motion.p
                  variants={reduced ? undefined : titleVariants}
                  transition={textTransition}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                    fontWeight: 300,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1,
                    margin: '0 0 16px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {p.title}
                </motion.p>

                <motion.p
                  className="type-body"
                  variants={reduced ? undefined : bodyVariants}
                  transition={textTransition}
                  style={{ color: 'var(--color-text-secondary)', margin: 0 }}
                >
                  {p.body}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom rule */}
        <div style={{ height: '0.5px', background: 'var(--color-border)' }} />

      </div>
    </section>
  )
}
