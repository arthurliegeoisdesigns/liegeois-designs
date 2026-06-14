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
    <main style={{ background: 'var(--color-dark)', minHeight: '100vh' }}>
      {/* Back link */}
      <div
        style={{
          padding: '22px var(--section-pad-x)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--color-on-dark-muted)',
            textDecoration: 'none',
            transition: 'color var(--duration-fast) ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-on-dark)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-on-dark-muted)')}
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
              style={{ color: 'var(--color-on-dark)', margin: '0 0 20px' }}
            >
              Work that changed the room.
            </h1>
            <p
              className="type-body-lg"
              style={{ color: 'var(--color-on-dark-muted)', margin: 0, maxWidth: '560px' }}
            >
              Every deck built to shift something — in the room, in the market,
              in how an audience sees a brand.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '48px',
            }}
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
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  padding: '9px 18px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid',
                  borderColor:
                    activeFormat === format
                      ? 'var(--color-on-dark)'
                      : 'var(--color-on-dark-border)',
                  background:
                    activeFormat === format
                      ? 'var(--color-on-dark)'
                      : 'transparent',
                  color:
                    activeFormat === format
                      ? 'var(--color-dark)'
                      : 'var(--color-on-dark-muted)',
                  cursor: 'pointer',
                  transition:
                    'background var(--duration-fast) var(--ease-out-expo), color var(--duration-fast) var(--ease-out-expo), border-color var(--duration-fast) var(--ease-out-expo)',
                }}
              >
                {format}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div
            key={activeFormat}
            className="grid-3"
            variants={
              reduced
                ? undefined
                : {
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.06 } },
                  }
            }
            initial={reduced ? false : 'hidden'}
            animate="visible"
          >
            {filtered.map((cs) => (
              <motion.article
                key={cs.slug}
                className="portfolio-card"
                style={{ background: 'var(--color-cream)' }}
                variants={reduced ? undefined : cardVariants}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
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
                  <p
                    className="type-label"
                    style={{
                      color: 'var(--color-text-secondary)',
                      marginBottom: '6px',
                    }}
                  >
                    {cs.format} · {cs.year}
                  </p>
                  <h3
                    className="type-h3"
                    style={{
                      color: 'var(--color-text-primary)',
                      margin: '0 0 6px',
                    }}
                  >
                    {cs.client}
                  </h3>
                  <p
                    className="type-caption"
                    style={{ color: 'var(--color-text-secondary)', margin: 0 }}
                  >
                    {cs.tagline}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
