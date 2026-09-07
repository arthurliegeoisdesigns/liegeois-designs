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

/* CLIENTS. Not employers.
 *
 * FLAG, 7 Sep 2026: 'Apple' is still in this list and it should probably come
 * out. The schema, the about-page prose and the hero were all corrected today
 * to say plainly that Apple, Oracle and Smartbox are EMPLOYERS and that IBM,
 * Ogilvy, Chevron and the rest are CLIENTS — because both ChatGPT and Gemini
 * were returning Apple as a portfolio client and that is a credibility problem
 * the moment a recruiter probes it.
 *
 * A client marquee with Apple in it contradicts all of that, in the most
 * visible place on the site. Left in place pending Arthur's call rather than
 * removed unilaterally: he may have done presentation work for Apple presenters
 * during the 2011-2015 role, and the homepage does carry a "Presenter, Apple"
 * testimonial. If that work was done AS AN EMPLOYEE it does not belong here.
 */
const NAMES = [
  'Chevron', 'IBM', 'Marriott', 'Philips', 'Google', 'Lilly', 'Ogilvy',
  'RAPP', 'Bloomberg', 'Mastercard', 'Johnson & Johnson', 'Apple', 'Starz',
  'Evolus', 'CDW', 'NOXX Therapeutics',
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
