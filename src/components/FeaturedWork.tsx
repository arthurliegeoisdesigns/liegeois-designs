'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { caseStudies } from '@/content/case-studies'

const CARD_GAP = 8

export default function FeaturedWork() {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragConstraint, setDragConstraint] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const wasDragged = useRef(false)
  const dragStartX = useRef(0)

  useEffect(() => {
    const calc = () => {
      if (!trackRef.current || !containerRef.current) return
      const overflow = trackRef.current.scrollWidth - containerRef.current.offsetWidth
      setDragConstraint(Math.max(0, overflow))
    }
    calc()
    const ro = new ResizeObserver(calc)
    const el = containerRef.current
    if (el) ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <section
      style={{
        background: 'var(--color-paper)',
        overflow: 'hidden',
        paddingBottom: 'var(--section-pad-y)',
      }}
    >
      {/* ── Header ───────────────────────────────────────────── */}
      <div
        className="container"
        style={{
          paddingTop: 'var(--section-pad-y)',
          paddingBottom: 'clamp(40px, 5vw, 64px)',
          paddingLeft: 'var(--section-pad-x)',
          paddingRight: 'var(--section-pad-x)',
        }}
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            <h2
              className="type-h1"
              style={{ color: 'var(--color-text-primary)', margin: 0, maxWidth: '560px' }}
            >
              Work that changed the room.
            </h2>
            <Link href="/work" className="btn-text" style={{ fontSize: '0.9375rem', flexShrink: 0 }}>
              View all {caseStudies.length} projects →
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Draggable carousel ───────────────────────────────── */}
      <div
        ref={containerRef}
        style={{
          overflow: 'hidden',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <motion.div
          ref={trackRef}
          drag={reduced ? false : 'x'}
          dragConstraints={{ right: 0, left: -dragConstraint }}
          dragElastic={0.07}
          dragMomentum={true}
          onDragStart={(_, info) => {
            dragStartX.current = info.point.x
            wasDragged.current = false
            setIsDragging(true)
          }}
          onDrag={(_, info) => {
            if (Math.abs(info.point.x - dragStartX.current) > 6) {
              wasDragged.current = true
            }
          }}
          onDragEnd={() => {
            // small delay so onClick can read wasDragged before reset
            setTimeout(() => { wasDragged.current = false }, 80)
            setIsDragging(false)
          }}
          style={{
            display: 'flex',
            gap: `${CARD_GAP}px`,
            paddingLeft: 'var(--section-pad-x)',
            paddingRight: 'var(--section-pad-x)',
            userSelect: 'none',
            // Allow vertical scroll to propagate to browser/Lenis;
            // framer-motion handles horizontal drag exclusively.
            touchAction: 'pan-y',
          }}
        >
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.slug}
              style={{
                position: 'relative',
                flexShrink: 0,
                width: 'clamp(280px, 72vw, 920px)',
                aspectRatio: '16 / 10',
                overflow: 'hidden',
              }}
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              viewport={{ once: true, margin: '-40px' }}
            >
              <Link
                href={`/work/${cs.slug}`}
                draggable="false"
                onClick={e => { if (wasDragged.current) e.preventDefault() }}
                style={{ display: 'block', position: 'absolute', inset: 0, textDecoration: 'none' }}
              >
                <Image
                  src={cs.images[0]}
                  alt={`${cs.client} — ${cs.project}`}
                  fill
                  priority={i < 2}
                  sizes="(max-width: 768px) 90vw, 72vw"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    pointerEvents: 'none',
                  }}
                  draggable="false"
                />

                {/* Bottom gradient */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(8,8,9,0.82) 0%, rgba(8,8,9,0.18) 40%, transparent 65%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Client label */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 'clamp(20px, 3vw, 36px)',
                    pointerEvents: 'none',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.5625rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.50)',
                      margin: '0 0 6px',
                    }}
                  >
                    {cs.format}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.125rem, 2.2vw, 1.75rem)',
                      fontWeight: 300,
                      color: '#ffffff',
                      margin: 0,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.05,
                    }}
                  >
                    {cs.client}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Drag hint ────────────────────────────────────────── */}
      <motion.p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.5625rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          margin: 'clamp(16px, 2vw, 24px) 0 0',
          textAlign: 'center',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        viewport={{ once: true }}
      >
        ← Drag to explore →
      </motion.p>
    </section>
  )
}
