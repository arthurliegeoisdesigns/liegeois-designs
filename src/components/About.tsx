'use client'

import { motion, useReducedMotion } from 'framer-motion'

const pillars = [
  {
    num: '01',
    title: 'Strategy',
    body: 'Every project starts with one question: what do we need people to think, feel, or do?',
  },
  {
    num: '02',
    title: 'Story',
    body: 'The narrative arc that connects vision to audience — and makes the work impossible to forget.',
  },
  {
    num: '03',
    title: 'Design',
    body: 'The visual execution that makes it undeniable — bold, clear, and built to last.',
  },
]

export default function About() {
  const reduced = useReducedMotion()

  return (
    <section id="about" className="section section-cream">
      <div
        className="container about-grid"
      >
        {/* Left column */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <span className="eyebrow">THE APPROACH</span>
          <h2 className="type-h1" style={{ color: 'var(--color-text-primary)', margin: '0 0 24px' }}>
            I&apos;ve been on all three sides of the table.
          </h2>
          <p className="type-body" style={{ color: 'var(--color-text-secondary)', margin: '0 0 16px' }}>
            Founder. Strategist. Designer. I&apos;ve sat where you&apos;re sitting — and I know
            what&apos;s on the line.
          </p>
          <p className="type-body" style={{ color: 'var(--color-text-secondary)', margin: '0 0 28px' }}>
            Strategy, story, design — in that order. The work earns its place because it starts
            with the right questions.
          </p>
          <a href="#about-full" className="btn-text">
            About Me ↗
          </a>
        </motion.div>

        {/* Right column — pillar list */}
        <motion.div
          style={{
            background: 'rgba(15,13,10,0.08)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
          }}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          {pillars.map((p, i) => (
            <div
              key={p.num}
              style={{
                padding: '28px 28px',
                borderBottom: i < pillars.length - 1 ? '0.5px solid rgba(15,13,10,0.08)' : 'none',
                display: 'flex',
                gap: '20px',
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '26px',
                  fontWeight: 700,
                  color: 'var(--color-accent)',
                  lineHeight: 1,
                  flexShrink: 0,
                  fontVariationSettings: "'opsz' 26, 'WONK' 0",
                }}
              >
                {p.num}
              </span>
              <div>
                <p
                  className="type-h3"
                  style={{ color: 'var(--color-text-primary)', margin: '0 0 6px' }}
                >
                  {p.title}
                </p>
                <p className="type-body" style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
