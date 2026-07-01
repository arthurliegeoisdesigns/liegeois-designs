'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { caseStudies } from '@/content/case-studies'

const formats = [
  { label: 'All',                      value: 'All' },
  { label: 'Pitch & Investor Decks',   value: 'Pitch & Investor Deck' },
  { label: 'Executive Presentations',  value: 'Executive Presentation' },
  { label: 'Sales & Agency Decks',     value: 'Sales & Agency Deck' },
] as const

type FormatValue = typeof formats[number]['value']

const cardVariants = {
  hidden:   { opacity: 0, y: 20 },
  visible:  { opacity: 1, y: 0 },
}

const ease = [0.16, 1, 0.3, 1] as const

export default function WorkPageClient() {
  const [active, setActive] = useState<FormatValue>('All')
  const reduced = useReducedMotion()

  const filtered = active === 'All'
    ? caseStudies
    : caseStudies.filter((cs) => cs.format === active)

  return (
    <main style={{ background: 'var(--color-paper)', minHeight: '100vh' }}>

      {/* Back link */}
      <div style={{ paddingTop: 'calc(80px + 20px)', paddingLeft: 'var(--section-pad-x)', paddingRight: 'var(--section-pad-x)', paddingBottom: '16px', position: 'relative', zIndex: 10 }}>
        <Link
          href="/"
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color var(--duration-fast) ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
        >
          ← Home
        </Link>
      </div>

      {/* Header */}
      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="container">
          <motion.div
            style={{ marginBottom: '48px', maxWidth: '700px' }}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <h1 className="type-display" style={{ color: 'var(--color-text-primary)', margin: '0 0 20px' }}>
              Work that changed the room.
            </h1>
            <p className="type-body-lg" style={{ color: 'var(--color-text-secondary)', margin: 0, maxWidth: '560px' }}>
              Every deck built to shift something: in the room, in the market, in how an audience sees a brand.
            </p>
          </motion.div>

          {/* ── Filter blocks ── */}
          <motion.div
            role="tablist"
            aria-label="Filter work by format"
            className="work-filter-blocks"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1px',
              marginBottom: '56px',
              border: '0.5px solid var(--color-border-mid)',
            }}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
          >
            {formats.map((f, i) => {
              const count = f.value === 'All'
                ? caseStudies.length
                : caseStudies.filter((cs) => cs.format === f.value).length
              const isActive = active === f.value

              return (
                <button
                  key={f.value}
                  role="tab"
                  aria-pressed={isActive}
                  onClick={() => setActive(f.value)}
                  style={{
                    position: 'relative',
                    padding: 'clamp(20px, 2.5vw, 28px) clamp(16px, 2vw, 24px)',
                    background: isActive ? 'var(--color-canvas)' : 'var(--color-paper)',
                    border: 'none',
                    borderLeft: i > 0 ? '0.5px solid var(--color-border-mid)' : 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 250ms ease',
                    minHeight: 'clamp(80px, 10vw, 110px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}
                >
                  {/* Count */}
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.625rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--color-on-dark-hint)' : 'var(--color-text-muted)',
                    transition: 'color 250ms ease',
                  }}>
                    {count} {count === 1 ? 'project' : 'projects'}
                  </span>
                  {/* Label */}
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(0.8125rem, 1.4vw, 1.0625rem)',
                    fontWeight: 400,
                    color: isActive ? 'var(--color-on-dark)' : 'var(--color-text-primary)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.01em',
                    transition: 'color 250ms ease',
                  }}>
                    {f.label}
                  </span>
                </button>
              )
            })}
          </motion.div>

          {/* Grid */}
          <div key={active} className="grid-3">
            {filtered.map((cs, idx) => (
              <motion.article
                key={cs.slug}
                className="portfolio-card"
                variants={reduced ? undefined : cardVariants}
                initial={reduced ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, ease, delay: idx * 0.05 }}
              >
                <Link href={`/work/${cs.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div className="portfolio-card-image">
                    <Image
                      src={cs.images[0]}
                      alt={`${cs.client} — ${cs.project}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="portfolio-card-body">
                    <p className="type-label" style={{ color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
                      {cs.format} · {cs.year}
                    </p>
                    <h2 className="type-h3" style={{ color: 'var(--color-text-primary)', margin: '0 0 6px' }}>
                      {cs.client}
                    </h2>
                    <p className="type-caption" style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                      {cs.tagline}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
