'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion'
import { caseStudies } from '@/content/case-studies'

/**
 * WorkPageClient v2 — the project index (Phase 6).
 * Default view: every project as a typographic Migra row — client huge,
 * format/year in the margins — with a live slide preview floating at the
 * cursor (the ClientIndex pattern, exhaustive). Grid view remains one
 * toggle away for scanners. Dark, on the one-world aesthetic.
 */
const formats = [
  { label: 'All', value: 'All' },
  { label: 'Pitch & Investor Decks', value: 'Pitch & Investor Deck' },
  { label: 'Executive Presentations', value: 'Executive Presentation' },
  { label: 'Sales & Agency Decks', value: 'Sales & Agency Deck' },
] as const

type FormatValue = (typeof formats)[number]['value']
type View = 'index' | 'grid'

const ease = [0.16, 1, 0.3, 1] as const

export default function WorkPageClient() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState<FormatValue>('All')
  const [view, setView] = useState<View>('index')
  const [hovered, setHovered] = useState<string | null>(null)

  const filtered =
    active === 'All' ? caseStudies : caseStudies.filter((cs) => cs.format === active)

  const hoveredStudy = caseStudies.find((cs) => cs.slug === hovered)

  // Cursor-following preview (lazy spring)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 130, damping: 22, mass: 0.6 })
  const py = useSpring(my, { stiffness: 130, damping: 22, mass: 0.6 })

  function onMove(e: React.MouseEvent) {
    mx.set(Math.min(e.clientX + 32, window.innerWidth - 380))
    my.set(e.clientY - 130)
  }

  return (
    <main
      className="section-dark"
      style={{ background: 'var(--color-canvas)', minHeight: '100vh' }}
      onMouseMove={reduced ? undefined : onMove}
    >
      {/* Header */}
      <section className="section" style={{ paddingTop: 'calc(72px + clamp(40px, 6vw, 72px))', paddingBottom: 'clamp(24px, 3vw, 40px)' }}>
        <div className="container">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="eyebrow" style={{ color: 'var(--color-on-dark-faint)', margin: '0 0 16px' }}>
              SELECTED & COMPLETE — {caseStudies.length} PROJECTS
            </p>
            <h1 className="type-display" style={{ color: 'var(--color-on-dark)', margin: '0 0 20px' }}>
              Work that changed <em style={{ fontStyle: 'italic' }}>the room.</em>
            </h1>
            <p className="type-body-lg" style={{ color: 'var(--color-on-dark-muted)', margin: 0, maxWidth: '560px' }}>
              Every deck built to shift something: in the room, in the market, in how an audience
              sees a brand.
            </p>
          </motion.div>

          {/* Controls: filters + view toggle */}
          <motion.div
            className="work-controls"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
          >
            <div className="work-filters" role="tablist" aria-label="Filter work by format">
              {formats.map((f) => {
                const count =
                  f.value === 'All'
                    ? caseStudies.length
                    : caseStudies.filter((cs) => cs.format === f.value).length
                const isActive = active === f.value
                return (
                  <button
                    key={f.value}
                    role="tab"
                    aria-pressed={isActive}
                    className={`work-filter${isActive ? ' is-active' : ''}`}
                    onClick={() => setActive(f.value)}
                  >
                    {f.label} <sup>{count}</sup>
                  </button>
                )
              })}
            </div>
            <div className="work-view-toggle" role="tablist" aria-label="View">
              <button
                role="tab"
                aria-pressed={view === 'index'}
                className={`work-filter${view === 'index' ? ' is-active' : ''}`}
                onClick={() => setView('index')}
              >
                Index
              </button>
              <button
                role="tab"
                aria-pressed={view === 'grid'}
                className={`work-filter${view === 'grid' ? ' is-active' : ''}`}
                onClick={() => setView('grid')}
              >
                Grid
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── INDEX VIEW ── */}
      {view === 'index' && (
        <section style={{ paddingBottom: 'var(--section-pad-y)' }}>
          <div className="container" style={{ paddingLeft: 'var(--section-pad-x)', paddingRight: 'var(--section-pad-x)' }}>
            <div className="work-index" key={active}>
              {filtered.map((cs, i) => (
                <Link
                  key={cs.slug}
                  href={`/work/${cs.slug}`}
                  className="work-index-row"
                  data-cursor="View"
                  onMouseEnter={() => setHovered(cs.slug)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className="work-index-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="work-index-client">{cs.client}</span>
                  <span className="work-index-meta">
                    <span>{cs.format}</span>
                    <span className="work-index-year">{cs.year}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Floating slide preview */}
          {!reduced && (
            <AnimatePresence>
              {hoveredStudy && (
                <motion.div
                  key={hoveredStudy.slug}
                  aria-hidden="true"
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    x: px,
                    y: py,
                    width: 'min(360px, 32vw)',
                    aspectRatio: '16 / 10',
                    zIndex: 60,
                    pointerEvents: 'none',
                    overflow: 'hidden',
                    border: '0.5px solid rgba(255,253,248,0.18)',
                    rotate: -2,
                  }}
                  initial={{ opacity: 0, scale: 0.86, clipPath: 'inset(50% 0% 50% 0%)' }}
                  animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.32, ease }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={hoveredStudy.images[0]}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </section>
      )}

      {/* ── GRID VIEW ── */}
      {view === 'grid' && (
        <section style={{ paddingBottom: 'var(--section-pad-y)' }}>
          <div className="container" style={{ paddingLeft: 'var(--section-pad-x)', paddingRight: 'var(--section-pad-x)' }}>
            <div key={active} className="grid-3">
              {filtered.map((cs, idx) => (
                <motion.article
                  key={cs.slug}
                  className="portfolio-card"
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, ease, delay: (idx % 6) * 0.05 }}
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
                      <p className="type-label" style={{ color: 'var(--color-on-dark-faint)', marginBottom: '6px' }}>
                        {cs.format} · {cs.year}
                      </p>
                      <h2 className="type-h3" style={{ color: 'var(--color-on-dark)', margin: '0 0 6px' }}>
                        {cs.client}
                      </h2>
                      <p className="type-caption" style={{ color: 'var(--color-on-dark-muted)', margin: 0 }}>
                        {cs.tagline}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
