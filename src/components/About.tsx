'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ScrambleEyebrow } from '@/components/ui/ScrambleEyebrow'

const pillars = [
  {
    number: '01',
    title: 'Strategy',
    body: 'Every project starts with one question: what do we need people to think, feel, or do?',
  },
  {
    number: '02',
    title: 'Story',
    body: 'The narrative arc that connects vision to audience — and makes the work impossible to forget.',
  },
  {
    number: '03',
    title: 'Design',
    body: 'The visual execution that makes it undeniable — bold, clear, and built to last.',
  },
]

export default function About() {
  const reduced = useReducedMotion()

  return (
    <section
      id="about"
      className="section"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Bio block */}
        <motion.div
          style={{ maxWidth: '640px', marginBottom: 'clamp(56px, 7vw, 96px)' }}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <ScrambleEyebrow>The Approach</ScrambleEyebrow>
          <h2 className="type-h1" style={{ color: 'var(--color-text-primary)', margin: '0 0 24px' }}>
            I&apos;ve been on all three sides of the table.
          </h2>
          <p className="type-body" style={{ color: 'var(--color-text-secondary)', margin: '0 0 28px' }}>
            Founder. Strategist. Designer. I&apos;ve sat where you&apos;re sitting — and I know
            what&apos;s on the line. The work earns its place because it starts with the right questions.
          </p>
          <Link href="/about" className="btn-text">
            About Me ↗
          </Link>
        </motion.div>

        {/* Top rule */}
        <motion.div
          style={{ height: '0.5px', background: 'var(--color-border-mid)', marginBottom: 0 }}
          initial={reduced ? false : { scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-60px' }}
        />

        {/* Pillars — editorial rows */}
        <div className="about-pillars-grid" style={{ gap: 0 }}>
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              style={{
                padding: 'clamp(28px, 3.5vw, 44px) clamp(20px, 3vw, 40px)',
                paddingLeft: i === 0 ? 0 : undefined,
                paddingRight: i === pillars.length - 1 ? 0 : undefined,
                borderLeft: i > 0 ? '0.5px solid var(--color-border)' : 'none',
                position: 'relative',
              }}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              viewport={{ once: true, margin: '-60px' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontWeight: 300,
                  color: 'var(--color-text-muted)',
                  lineHeight: 1,
                  display: 'block',
                  marginBottom: '16px',
                  letterSpacing: '-0.01em',
                }}
              >
                {p.number}
              </span>
              <p className="type-h3" style={{ color: 'var(--color-text-primary)', margin: '0 0 10px' }}>
                {p.title}
              </p>
              <p className="type-body" style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom rule */}
        <div style={{ height: '0.5px', background: 'var(--color-border)' }} />

      </div>
    </section>
  )
}
