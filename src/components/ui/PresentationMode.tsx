'use client'

import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { featuredWork } from '@/content/home-work'
import { testimonials } from '@/content/testimonials'
import ObfuscatedEmail from '@/components/ui/ObfuscatedEmail'

/**
 * PresentationMode — the signature easter egg (Phase 4, audit rec 32).
 * Press P anywhere: the site becomes a deck. Arrow keys / space / click
 * advance, Esc closes. A presentation designer's site that literally
 * presents itself.
 *
 * Lives in layout.tsx OUTSIDE .page-transition-wrapper (position:fixed).
 */
const work = featuredWork.slice(0, 3)

const quote = testimonials[0]

type Slide =
  | { kind: 'title' }
  | { kind: 'statement'; eyebrow: string; line1: string; line2: string }
  | { kind: 'work'; image: string; client: string; project: string }
  | { kind: 'quote' }
  | { kind: 'end' }

const SLIDES: Slide[] = [
  { kind: 'title' },
  { kind: 'statement', eyebrow: 'THE BELIEF', line1: 'Story first.', line2: 'Pixels second.' },
  ...work.map((cs) => ({
    kind: 'work' as const,
    image: cs.image,
    client: cs.client,
    project: cs.project,
  })),
  { kind: 'quote' },
  { kind: 'end' },
]

export default function PresentationMode() {
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState(0)

  const close = useCallback(() => {
    setOpen(false)
    document.documentElement.style.overflow = ''
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable) return

      if (!open) {
        if (e.key.toLowerCase() === 'p' && !e.metaKey && !e.ctrlKey && !e.altKey) {
          setIdx(0)
          setOpen(true)
          document.documentElement.style.overflow = 'hidden'
        }
        return
      }
      if (e.key === 'Escape' || e.key.toLowerCase() === 'p') close()
      else if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowDown') {
        e.preventDefault()
        setIdx((i) => Math.min(i + 1, SLIDES.length - 1))
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        setIdx((i) => Math.max(i - 1, 0))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  if (!open) return null

  const slide = SLIDES[idx]

  return (
    <div
      className="pmode"
      role="dialog"
      aria-label="Presentation mode"
      onClick={() => (idx < SLIDES.length - 1 ? setIdx(idx + 1) : close())}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          className="pmode-slide"
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {slide.kind === 'title' && (
            <div className="pmode-center">
              <p className="pmode-eyebrow">LIÉGEOIS DESIGNS — A PRESENTATION ABOUT PRESENTATIONS</p>
              <h2 className="pmode-display">
                Presentations
                <br />
                that <em>move</em>
                <br />
                the room.
              </h2>
            </div>
          )}

          {slide.kind === 'statement' && (
            <div className="pmode-center">
              <p className="pmode-eyebrow">{slide.eyebrow}</p>
              <h2 className="pmode-display">
                {slide.line1}
                <br />
                <em>{slide.line2}</em>
              </h2>
            </div>
          )}

          {slide.kind === 'work' && (
            <div className="pmode-work">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={slide.image} alt={`${slide.client} — ${slide.project}`} />
              <div className="pmode-work-caption">
                <span>{slide.client}</span>
                <span>{slide.project}</span>
              </div>
            </div>
          )}

          {slide.kind === 'quote' && (
            <div className="pmode-center">
              <p className="pmode-eyebrow">
                {quote.author} — {quote.title}, {quote.company}
              </p>
              <h2 className="pmode-quote">&ldquo;{quote.quote}&rdquo;</h2>
            </div>
          )}

          {slide.kind === 'end' && (
            <div className="pmode-center">
              <p className="pmode-eyebrow">THE LAST SLIDE IS ALWAYS THE ASK</p>
              <h2 className="pmode-display">
                Let&apos;s <em>talk</em>
                <span style={{ color: 'var(--color-accent)' }}>.</span>
              </h2>
              <span className="pmode-email" onClick={(e) => e.stopPropagation()}>
                <ObfuscatedEmail />
              </span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* chrome */}
      <div className="pmode-chrome" aria-hidden="true">
        <span>P / ESC — EXIT</span>
        <span>← → — NAVIGATE</span>
        <span className="pmode-counter">
          {String(idx + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </span>
      </div>
      <div className="pmode-progress" aria-hidden="true">
        <div style={{ transform: `scaleX(${(idx + 1) / SLIDES.length})` }} />
      </div>
    </div>
  )
}
