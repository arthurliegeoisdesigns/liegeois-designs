'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

interface Pair {
  before: string
  after: string
  label?: string
}

interface Props {
  pairs: Pair[]
}

const ease = [0.16, 1, 0.3, 1] as const

/** Append Cloudinary transformation params after /upload/ */
function clOpt(url: string, transforms = 'f_auto,q_auto,w_960'): string {
  return url.replace('/upload/', `/upload/${transforms}/`)
}

// ── Single drag slider ────────────────────────────────────────────────────────
function Slider({ before, after, label, index }: Pair & { index: number }) {
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const { left, width } = el.getBoundingClientRect()
    setPosition(clamp(((clientX - left) / width) * 100, 2, 98))
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setDragging(true)
    updatePosition(e.clientX)
  }

  useEffect(() => {
    if (!dragging) return
    const onMove = (e: MouseEvent) => updatePosition(e.clientX)
    const onUp = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [dragging, updatePosition])

  const onTouchMove = (e: React.TouchEvent) => updatePosition(e.touches[0].clientX)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Drag slider */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchMove}
        onTouchMove={onTouchMove}
        style={{
          position: 'relative',
          aspectRatio: '16/9',
          overflow: 'hidden',
          cursor: dragging ? 'grabbing' : 'col-resize',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          background: '#0a0a0a',
        }}
      >
        {/* After — base layer */}
        <img
          src={clOpt(after)}
          alt={`${label ?? `Slide ${index + 1}`} — after`}
          draggable={false}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* Before — clipped */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            transition: dragging ? 'none' : 'clip-path 0.04s linear',
          }}
        >
          <img
            src={clOpt(before)}
            alt={`${label ?? `Slide ${index + 1}`} — before`}
            draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Divider line */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          left: `${position}%`, width: '1px',
          background: 'rgba(255,255,255,0.85)',
          pointerEvents: 'none', transform: 'translateX(-0.5px)',
        }} />

        {/* Handle */}
        <div style={{
          position: 'absolute', top: '50%', left: `${position}%`,
          transform: 'translate(-50%, -50%)',
          width: '40px', height: '40px', borderRadius: '50%',
          background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 16px rgba(0,0,0,0.5)',
          pointerEvents: 'none',
          transition: dragging ? 'none' : 'left 0.04s linear',
        }}>
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <path d="M1 5H17M1 5L4 2M1 5L4 8M17 5L14 2M17 5L14 8" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Before label */}
        <span style={{
          position: 'absolute', top: '12px', left: '14px',
          fontFamily: 'var(--font-body)', fontSize: '0.5625rem',
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.85)',
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)', padding: '4px 8px',
          pointerEvents: 'none',
          opacity: position > 18 ? 1 : 0, transition: 'opacity 0.2s ease',
        }}>Before</span>

        {/* After label */}
        <span style={{
          position: 'absolute', top: '12px', right: '14px',
          fontFamily: 'var(--font-body)', fontSize: '0.5625rem',
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.85)',
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)', padding: '4px 8px',
          pointerEvents: 'none',
          opacity: position < 82 ? 1 : 0, transition: 'opacity 0.2s ease',
        }}>After</span>
      </div>

      {/* Slide label */}
      {label && (
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.6875rem',
          letterSpacing: '0.10em', textTransform: 'uppercase',
          color: 'var(--color-on-dark-faint)', margin: 0, textAlign: 'center',
        }}>
          {label}
        </p>
      )}
    </div>
  )
}

// ── Section with carousel ─────────────────────────────────────────────────────
export default function BeforeAfterSlider({ pairs }: Props) {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = (next: number) => {
    setDirection(next > active ? 1 : -1)
    setActive(next)
  }
  const prev = () => go(active === 0 ? pairs.length - 1 : active - 1)
  const next = () => go(active === pairs.length - 1 ? 0 : active + 1)

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '6%' : '-6%', opacity: 0 }),
    center: { x: '0%', opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? '-6%' : '6%', opacity: 0 }),
  }

  return (
    <>
      <div style={{ height: '0.5px', background: 'var(--color-on-dark-border)' }} />
      <section style={{ padding: 'clamp(48px, 6vw, 80px) var(--section-pad-x)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>

          {/* Header row */}
          <motion.div
            style={{ marginBottom: 'clamp(32px, 4vw, 48px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease }}
          >
            <div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.5625rem',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--color-on-dark-faint)', margin: '0 0 12px',
              }}>
                The Transformation
              </p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 700, color: 'var(--color-on-dark)',
                margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em',
              }}>
                Before & After
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.55)', margin: '10px 0 0', lineHeight: 1.6,
              }}>
                Drag to reveal the redesign.
              </p>
            </div>

            {/* Prev / Next arrows */}
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              {[{ fn: prev, label: '←' }, { fn: next, label: '→' }].map(({ fn, label }) => (
                <button
                  key={label}
                  onClick={fn}
                  aria-label={label === '←' ? 'Previous slide' : 'Next slide'}
                  style={{
                    width: '40px', height: '40px',
                    border: '0.5px solid rgba(255,255,255,0.20)',
                    background: 'transparent', color: 'rgba(255,255,255,0.7)',
                    fontFamily: 'var(--font-body)', fontSize: '1rem',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'border-color 200ms ease, color 200ms ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.55)'
                    ;(e.currentTarget as HTMLButtonElement).style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.20)'
                    ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)'
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease }}
              >
                <Slider {...pairs[active]} index={active} />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Dot indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '28px' }}>
            {pairs.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: i === active ? '24px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i === active ? 'var(--color-accent)' : 'rgba(255,255,255,0.20)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'width 300ms ease, background 300ms ease',
                }}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
