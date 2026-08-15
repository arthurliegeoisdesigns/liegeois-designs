'use client'

import { useEffect, useRef } from 'react'

/**
 * ClientMarquee — the client roster, replacing a static logo wall.
 *
 * Names set in the display face rather than SVG logos: a logo wall is the most
 * dated device on a studio site, and these names read better as type. Speed AND
 * direction follow scroll velocity, so it accelerates as you scroll, reverses
 * when you scroll back, and eases to a drift when you stop.
 *
 * Runs on rAF with a transform only (no layout), and is fully static under
 * prefers-reduced-motion.
 */

const NAMES = [
  'Chevron', 'IBM', 'Marriott', 'Philips', 'Google', 'Lilly', 'Ogilvy',
  'RAPP', 'Bloomberg', 'Mastercard', 'Johnson & Johnson', 'Apple', 'Starz', 'Evolus', 'CDW',
]

export default function ClientMarquee() {
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = track.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let x = 0, vel = 1, lastY = window.scrollY, half = 0, raf = 0
    const onScroll = () => {
      const d = window.scrollY - lastY
      lastY = window.scrollY
      vel = Math.max(-9, Math.min(9, 1 + d * 0.28))
    }
    const tick = () => {
      if (!half) half = el.scrollWidth / 3
      x -= vel
      if (x <= -half) x += half
      if (x > 0) x -= half
      el.style.transform = `translate3d(${x}px,0,0)`
      vel += (1 - vel) * 0.045
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  const run = NAMES.map((n) => (
    <span key={n + Math.random()} className="v2-mq-item">{n}<i>&#10022;</i></span>
  ))

  return (
    <section className="v2-roster" aria-label="Selected clients">
      <div className="v2-mq" ref={track}>{run}{run}{run}</div>
    </section>
  )
}
