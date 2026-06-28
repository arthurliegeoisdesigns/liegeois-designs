'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

export default function CTA() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section section-dark"
      style={{ position: 'relative', overflow: 'hidden' }}
    >

      {/* ── Background ghost type — parallax ─────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          y: reduced ? 0 : bgY,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(120px, 22vw, 280px)',
            fontWeight: 300,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.03)',
            letterSpacing: '-0.02em',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            lineHeight: 1,
          }}
        >
          Let&apos;s Talk
        </span>
      </motion.div>

      {/* ── Top rule ─────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '0.5px',
          background: 'var(--color-dark-border)',
        }}
      />

      {/* ── Content ──────────────────────────────────────────── */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <motion.div
          style={{ maxWidth: '560px' }}
          initial={reduced ? false : { opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <h2
            className="type-display"
            style={{
              color: 'var(--color-on-dark)',
              margin: '0 0 20px',
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            }}
          >
            Ready to tell a better story?
          </h2>

          <p className="type-body-lg" style={{ color: 'var(--color-on-dark-muted)', margin: '0 0 48px' }}>
            The best projects start with a conversation. Let&apos;s have one.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '14px',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/contact"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: 400,
                letterSpacing: '0.02em',
                padding: '14px 32px',
                background: 'var(--color-on-dark)',
                color: 'var(--color-canvas)',
                borderRadius: '3px',
                border: 'none',
                textDecoration: 'none',
                display: 'inline-block',
                lineHeight: 1,
                transition: 'opacity 150ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Start a Project
            </Link>
            <Link
              href="/work"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: 400,
                letterSpacing: '0.02em',
                padding: '13px 31px',
                background: 'transparent',
                color: 'var(--color-on-dark)',
                borderRadius: '3px',
                border: '1px solid var(--color-on-dark-hint)',
                textDecoration: 'none',
                display: 'inline-block',
                lineHeight: 1,
                transition: 'border-color 150ms ease, background 150ms ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.65)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = ''
                e.currentTarget.style.background = 'transparent'
              }}
            >
              See the Work
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
