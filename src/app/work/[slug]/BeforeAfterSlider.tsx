'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Pair {
  before: string
  after: string
  label?: string
}

interface Props {
  pairs: Pair[]
}

const ease = [0.16, 1, 0.3, 1] as const

// ── Single drag slider ────────────────────────────────────────────────────────
function Slider({ before, after, label, index }: Pair & { index: number }) {
  const [position, setPosition] = useState(50) // 0–100 %
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const { left, width } = el.getBoundingClientRect()
    const pct = clamp(((clientX - left) / width) * 100, 2, 98)
    setPosition(pct)
  }, [])

  // Mouse events
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

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX)
  }
  const onTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX)
  }

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease, delay: index * 0.12 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      {/* Slider container */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
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
        {/* After (base layer — full width) */}
        <img
          src={after}
          alt={`${label ?? `Slide ${index + 1}`} — after`}
          draggable={false}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Before (clipped to left of handle) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            transition: dragging ? 'none' : 'clip-path 0.05s linear',
          }}
        >
          <img
            src={before}
            alt={`${label ?? `Slide ${index + 1}`} — before`}
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>

        {/* Divider line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${position}%`,
            width: '1px',
            background: 'rgba(255,255,255,0.8)',
            pointerEvents: 'none',
            transform: 'translateX(-0.5px)',
          }}
        />

        {/* Handle */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${position}%`,
            transform: 'translate(-50%, -50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 16px rgba(0,0,0,0.5)',
            pointerEvents: 'none',
            transition: dragging ? 'none' : 'left 0.05s linear',
          }}
        >
          {/* Arrow icons */}
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5H17M1 5L4 2M1 5L4 8M17 5L14 2M17 5L14 8" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Before / After labels */}
        <span style={{
          position: 'absolute',
          top: '12px',
          left: '14px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.5625rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.85)',
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          padding: '4px 8px',
          pointerEvents: 'none',
          opacity: position > 18 ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}>
          Before
        </span>
        <span style={{
          position: 'absolute',
          top: '12px',
          right: '14px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.5625rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.85)',
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          padding: '4px 8px',
          pointerEvents: 'none',
          opacity: position < 82 ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}>
          After
        </span>
      </div>

      {/* Slide label */}
      {label && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.6875rem',
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color: 'var(--color-on-dark-faint)',
          margin: 0,
          textAlign: 'center',
        }}>
          {label}
        </p>
      )}
    </motion.div>
  )
}

// ── Section wrapper ───────────────────────────────────────────────────────────
export default function BeforeAfterSlider({ pairs }: Props) {
  const reduced = useReducedMotion()

  return (
    <>
      <div style={{ height: '0.5px', background: 'var(--color-on-dark-border)' }} />
      <section style={{ padding: 'clamp(48px, 6vw, 80px) var(--section-pad-x)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>

          {/* Eyebrow + heading */}
          <motion.div
            style={{ marginBottom: 'clamp(36px, 5vw, 56px)' }}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease }}
          >
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.5625rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--color-on-dark-faint)',
              margin: '0 0 16px',
            }}>
              The Transformation
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 700,
              color: 'var(--color-on-dark)',
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              Before & After
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              color: 'rgba(255,255,255,0.45)',
              margin: '12px 0 0',
              lineHeight: 1.6,
            }}>
              Drag to reveal the redesign.
            </p>
          </motion.div>

          {/* Slider grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(24px, 3vw, 40px)',
          }}>
            {pairs.map((pair, i) => (
              <Slider key={i} {...pair} index={i} />
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
