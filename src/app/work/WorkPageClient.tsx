'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { caseStudies } from '@/content/case-studies'

const formats = [
  'All',
  'Pitch & Investor Deck',
  'Executive Presentation',
  'Sales & Agency Deck',
] as const

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function WorkPageClient() {
  const [activeFormat, setActiveFormat] = useState<string>('All')
  const reduced = useReducedMotion()

  const filtered =
    activeFormat === 'All'
      ? caseStudies
      : caseStudies.filter((cs) => cs.format === activeFormat)

  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* Back link */}
      <div style={{ paddingTop: 'calc(80px + 20px)', paddingLeft: 'var(--section-pad-x)', paddingRight: 'var(--section-pad-x)', paddingBottom: '16px', position: 'relative', zIndex: 10 }}>
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: 'var(--color-text-secondary)',
            textDecoration: 'none',
            transition: 'color var(--duration-fast) ease',
          }}
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
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="type-display"
              style={{ color: 'var(--color-text-primary)', margin: '0 0 20px' }}
            >
              Work that changed the room.
            </h1>
            <p
              className="type-body-lg"
              style={{ color: 'var(--color-text-secondary)', margin: 0, maxWidth: '560px' }}
            >
              Every deck built to shift something — in the room, in the market,
              in how an audience sees a brand.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '48px' }}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            {formats.map((format) => (
              <button
                key={format}
                onClick={() => setActiveFormat(format)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  padding: '10px 18px',
                  minHeight: '44px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid',
                  borderColor: activeFormat === format ? 'var(--color-text-primary)' : 'var(--color-border-mid)',
                  background: activeFormat === format ? 'var(--color-text-primary)' : 'transparent',
                  color: activeFormat === format ? '#ffffff' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  transition: 'background 150ms ease, color 150ms ease, border-color 150ms ease',
                }}
              >
                {format}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <div key={activeFormat} className="grid-3">
            {filtered.map((cs, idx) => (
              <motion.article
                key={cs.slug}
                className="portfolio-card"
                variants={reduced ? undefined : cardVariants}
                initial={reduced ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
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
