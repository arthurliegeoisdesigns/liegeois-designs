'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import type { CaseStudy } from '@/content/types'

const ease = [0.16, 1, 0.3, 1] as const

export default function CaseStudyHero({
  cs,
  index,
  total,
}: {
  cs: CaseStudy
  index: number
  total: number
}) {
  const reduced = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])

  return (
    <>
      {/* ── Hero image with parallax ── */}
      <div
        ref={heroRef}
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(380px, 72vh, 800px)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: '-15% 0',
            y: reduced ? 0 : imageY,
          }}
        >
          <Image
            src={cs.images[0]}
            alt={`${cs.client} — ${cs.project}`}
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            sizes="100vw"
          />
        </motion.div>

        {/* Bottom fade */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(10,9,9,0.15) 0%, transparent 40%, var(--color-dark) 100%)',
          }}
        />

        {/* Top nav bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: '24px var(--section-pad-x)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 10,
          }}
        >
          <motion.a
            href="/work"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              color: 'rgba(255,255,255,0.65)',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
          >
            ← All Work
          </motion.a>
          <motion.span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6875rem',
              fontWeight: 400,
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.40)',
              textTransform: 'uppercase',
            }}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {index + 1} / {total}
          </motion.span>
        </div>
      </div>

      {/* ── Project header ── */}
      <section style={{ padding: 'clamp(40px, 5vw, 64px) var(--section-pad-x) 0' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>

          {/* Eyebrow chips */}
          <motion.div
            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            {[cs.format, cs.industry, String(cs.year)].filter(Boolean).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6875rem',
                  fontWeight: 400,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '5px 14px',
                  border: '0.5px solid var(--color-on-dark-border)',
                  color: 'var(--color-on-dark-faint)',
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Client */}
          <motion.h1
            className="type-display"
            style={{ color: 'var(--color-on-dark)', margin: '0 0 14px', maxWidth: '760px' }}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.28 }}
          >
            {cs.client}
          </motion.h1>

          {/* Project title */}
          <motion.p
            className="type-h3"
            style={{ color: 'var(--color-on-dark-muted)', margin: '0 0 10px', fontWeight: 400 }}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.35 }}
          >
            {cs.project}
          </motion.p>

          {/* Agency credit */}
          {cs.agency && (
            <motion.p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--color-on-dark-faint)',
                margin: '0 0 32px',
                letterSpacing: '0.01em',
              }}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              In partnership with {cs.agency}
            </motion.p>
          )}

          {/* Summary / tagline */}
          <motion.p
            className="type-body-lg"
            style={{
              color: 'rgba(255,255,255,0.72)',
              margin: cs.agency ? '0' : '24px 0 0',
              maxWidth: '600px',
              lineHeight: 1.7,
            }}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.42 }}
          >
            {cs.summary || cs.tagline}
          </motion.p>
        </div>
      </section>
    </>
  )
}
