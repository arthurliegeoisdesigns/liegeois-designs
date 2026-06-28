'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
const services = [
  {
    number: '01',
    title: 'Pitch & Investor Decks',
    description: 'For founders raising capital. Built to move money.',
  },
  {
    number: '02',
    title: 'Executive Presentations',
    description: 'Board meetings, all-hands, keynotes. High stakes by definition.',
  },
  {
    number: '03',
    title: 'Sales & Agency Decks',
    description: "Proposals that don't wait for a follow-up email.",
  },
]

// Framer-motion variants — propagate from row → children
const rowVariants = {
  idle:    {},
  hovered: {},
}
const sweepVariants = {
  idle:    { scaleX: 0 },
  hovered: { scaleX: 1 },
}
const numVariants = {
  idle:    { color: 'var(--color-text-muted)' },
  hovered: { color: 'rgba(0,0,0,0.3)' },
}
const titleVariants = {
  idle:    { color: 'var(--color-text-primary)' },
  hovered: { color: 'var(--color-ink)' },
}
const descVariants = {
  idle:    { color: 'var(--color-text-secondary)', opacity: 1 },
  hovered: { color: 'rgba(0,0,0,0.55)', opacity: 1 },
}
const arrowVariants = {
  idle:    { opacity: 0, x: -8 },
  hovered: { opacity: 1, x: 0 },
}
const ease = [0.16, 1, 0.3, 1] as const
const sweepTransition = { duration: 0.55, ease }
const textTransition  = { duration: 0.35, ease }

export default function Services() {
  const reduced = useReducedMotion()

  return (
    <section
      className="section-dark"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'var(--section-pad-y) var(--section-pad-x)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* ── Cinematic headline ───────────────────────────────── */}
        <motion.h2
          className="type-display"
          style={{ color: 'var(--color-text-primary)', margin: 0, maxWidth: '820px', lineHeight: 1.0 }}
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease }}
          viewport={{ once: true, margin: '-80px' }}
        >
          Strategy, story, design.
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>In that order.</em>
        </motion.h2>

        {/* ── Lede ─────────────────────────────────────────────── */}
        <motion.p
          className="type-body-lg"
          style={{ color: 'var(--color-text-secondary)', margin: 'clamp(32px, 4vw, 56px) 0 0', maxWidth: '480px' }}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease, delay: 0.15 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          Every project starts with one question: what do we need people to
          think, feel, or do? The answer shapes everything that follows.
        </motion.p>

        {/* ── Top rule ─────────────────────────────────────────── */}
        <motion.div
          style={{ height: '0.5px', background: 'var(--color-border-mid)', marginTop: 'clamp(64px, 8vw, 112px)' }}
          initial={reduced ? false : { scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.0, ease }}
          viewport={{ once: true, margin: '-80px' }}
        />

        {/* ── Service rows ─────────────────────────────────────── */}
        {services.map((s, i) => (
          <motion.div
            key={s.number}
            // Entry animation
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease, delay: i * 0.08 }}
            viewport={{ once: true, margin: '-60px' }}
            // Hover state — propagates to all children via variants
            variants={reduced ? undefined : rowVariants}
            whileHover={reduced ? undefined : 'hovered'}
            animate="idle"
            data-cursor-hover
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderBottom: '0.5px solid var(--color-border)',
              cursor: 'pointer',
            }}
          >
            {/* ── Sweep fill (white, slides in from left) ── */}
            {!reduced && (
              <motion.div
                variants={sweepVariants}
                transition={sweepTransition}
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'var(--color-paper)',
                  transformOrigin: 'left center',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* ── Row content (sits above sweep) ── */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'grid',
                gridTemplateColumns: '72px 1fr auto',
                alignItems: 'center',
                gap: 'clamp(24px, 4vw, 64px)',
                padding: 'clamp(28px, 3.5vw, 44px) clamp(20px, 3vw, 40px)',
              }}
            >
              {/* Number */}
              <motion.span
                variants={reduced ? undefined : numVariants}
                transition={textTransition}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                  fontWeight: 300,
                  color: 'var(--color-text-muted)',
                  letterSpacing: '-0.01em',
                  userSelect: 'none',
                }}
              >
                {s.number}
              </motion.span>

              {/* Title */}
              <motion.h3
                className="type-h2"
                variants={reduced ? undefined : titleVariants}
                transition={textTransition}
                style={{ color: 'var(--color-text-primary)', margin: 0, fontWeight: 400 }}
              >
                {s.title}
              </motion.h3>

              {/* Description + arrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'flex-end' }}>
                <motion.p
                  className="type-body services-row-desc"
                  variants={reduced ? undefined : descVariants}
                  transition={textTransition}
                  style={{ color: 'var(--color-text-secondary)', margin: 0, maxWidth: '280px', textAlign: 'right' }}
                >
                  {s.description}
                </motion.p>
                {!reduced && (
                  <motion.span
                    variants={arrowVariants}
                    transition={{ duration: 0.3, ease }}
                    aria-hidden="true"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1.25rem',
                      color: 'var(--color-ink)',
                      flexShrink: 0,
                      lineHeight: 1,
                    }}
                  >
                    →
                  </motion.span>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* ── CTA row ──────────────────────────────────────────── */}
        <motion.div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'clamp(32px, 4vw, 48px)' }}
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <p
            className="type-body"
            style={{
              color: 'var(--color-text-muted)',
              margin: 0,
              fontStyle: 'italic',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.875rem, 1.2vw, 1.0625rem)',
            }}
          >
            Every engagement is custom — no off-the-shelf packages.
          </p>
          <Link
            href="/services"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              fontWeight: 400,
              letterSpacing: '0.04em',
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
              borderBottom: '0.5px solid var(--color-text-secondary)',
              paddingBottom: '2px',
              transition: 'border-color 200ms ease, color 200ms ease',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              marginLeft: '40px',
            }}
          >
            All services →
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
