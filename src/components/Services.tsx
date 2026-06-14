'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionCut from './SectionCut'

const formats = [
  {
    num: '01',
    label: 'FORMAT 01',
    title: 'Pitch & Investor Decks',
    description: 'For founders raising capital. Built to move money.',
  },
  {
    num: '02',
    label: 'FORMAT 02',
    title: 'Executive Presentations',
    description: 'Board meetings, all-hands, keynotes. High stakes by definition.',
  },
  {
    num: '03',
    label: 'FORMAT 03',
    title: 'Sales & Agency Decks',
    description: "Proposals that don't wait for a follow-up email.",
  },
]

const subItems = [
  {
    title: 'Message Architecture',
    body: 'Structuring the narrative before a slide is touched',
  },
  {
    title: 'Visual Systems',
    body: 'A coherent visual language that travels across every asset',
  },
  {
    title: 'Content Direction',
    body: 'Copy, hierarchy, and flow — reviewed and refined',
  },
]

export default function Services() {
  const reduced = useReducedMotion()

  return (
    <section className="section section-dark">
      <div className="container">
        {/* Header */}
        <motion.div
          style={{ marginBottom: '48px', maxWidth: '600px' }}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <h2 className="type-h1" style={{ color: 'var(--color-on-dark)', margin: '0 0 16px' }}>
            Strategy, story, design.
            <br />
            In that order.
          </h2>
          <p className="type-body" style={{ color: 'var(--color-on-dark-muted)', margin: 0 }}>
            Every project starts with one question: what do we need people to think, feel, or do?
            The answer shapes everything that follows.
          </p>
        </motion.div>

        {/* Tier 1 — Discipline card */}
        <motion.div
          className="services-discipline-grid"
          style={{
            border: '0.5px solid var(--color-on-dark-border)',
            borderRadius: 'var(--radius-md)',
            padding: '36px',
            marginBottom: '12px',
          }}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Left */}
          <div>
            <h3 className="type-h2" style={{ color: 'var(--color-on-dark)', margin: '0 0 16px' }}>
              Strategic Visual Storytelling
            </h3>
            <p className="type-body" style={{ color: 'var(--color-on-dark-muted)', margin: '0 0 24px' }}>
              The discipline that sits at the intersection of strategy, narrative, and design.
              Not decoration — direction.
            </p>
            <p
              className="type-quote"
              style={{ color: 'var(--color-on-dark-faint)', margin: 0, borderLeft: '2px solid var(--color-on-dark-border)', paddingLeft: '16px' }}
            >
              &ldquo;Narrative-led. Always.&rdquo;
            </p>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {subItems.map((item) => (
              <div
                key={item.title}
                style={{ borderLeft: '2px solid var(--color-accent)', paddingLeft: '16px' }}
              >
                <p
                  className="type-h3"
                  style={{ color: 'var(--color-on-dark)', margin: '0 0 6px' }}
                >
                  {item.title}
                </p>
                <p className="type-body" style={{ color: 'var(--color-on-dark-muted)', margin: 0 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tier 2 — Format cards */}
        <motion.div
          className="services-formats-grid"
          style={{
            border: '0.5px solid var(--color-on-dark-border)',
            borderRadius: 'var(--radius-md)',
          }}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          {formats.map((f, i) => (
            <div
              key={f.num}
              className="services-format-item"
              style={{
                padding: '28px 24px',
                borderRight: i < 2 ? '0.5px solid var(--color-on-dark-border)' : 'none',
              }}
            >
              <p
                className="type-label"
                style={{ color: 'var(--color-on-dark-muted)', marginBottom: '16px' }}
              >
                {f.label}
              </p>
              <h4 className="type-h3" style={{ color: 'var(--color-on-dark)', margin: '0 0 10px' }}>
                {f.title}
              </h4>
              <p className="type-body" style={{ color: 'var(--color-on-dark-muted)', margin: 0 }}>
                {f.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <SectionCut from="dark" to="cream" />
    </section>
  )
}
