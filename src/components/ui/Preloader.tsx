'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Preloader — 1.6s narrative intro (Phase 2, plan step 8).
 * Wordmark in Migra + counter 0→100 + hairline, then the whole plate
 * wipes upward into the hero. Runs once per browser session, home only.
 * Skipped entirely for reduced motion.
 *
 * Lives in layout.tsx OUTSIDE .page-transition-wrapper (route animation
 * transform breaks position:fixed descendants).
 *
 * ── WHY THIS RENDERS ON THE SERVER (measured, Aug 2026) ──────────────
 * This used to return null until hydration, which meant the plate — and
 * its wordmark — first painted at ~2170ms on Slow 4G. That paint became
 * the LCP element once the display font was subsetted and stopped being
 * the bottleneck. Measured: LCP 2172ms with the intro, 1480ms without,
 * i.e. hydration timing alone was costing ~690ms.
 *
 * Shortening DURATION does NOT fix this — it changes when the plate
 * LEAVES, not when it first paints, and LCP is set at paint.
 *
 * So the initial 'idle' phase now emits the real markup. It ships in the
 * document, paints with first paint (~1430ms = FCP), and LCP is set then.
 * The inline script in layout.tsx has already added .ld-no-intro before
 * this ever paints for anyone who should not see it, so there is no
 * flash for repeat visitors, reduced-motion users, or non-home routes.
 * ──────────────────────────────────────────────────────────────────── */
const KEY = 'ld-intro-done'
/* Measured (Lighthouse mobile, Aug 2026): the plate is what Speed Index
   punishes — a covered viewport reads as zero visual progress. With the
   intro on, SI was 7.0s (score 32) and TTI 11.7s (17); with it suppressed,
   1.7s (100) and 6.8s (55). LCP moves the other way (2.9s with, 3.9s
   without) because the wordmark paints early and claims the metric.

   Since LCP is set at PAINT, not at exit, we keep the early paint and
   simply spend less time on screen: 1400ms -> 700ms. The counter eases
   out-expo, so it already reads ~97% complete by the halfway point — the
   back half was dead time. EXIT stays 750ms and must keep matching the
   750ms transform transition on .preloader in globals.css. */
const DURATION = 700 // counter run
const EXIT = 750 // wipe — keep in sync with .preloader transition

export default function Preloader() {
  const pathname = usePathname()
  // 'idle' now RENDERS (see note above). Server and first client render
  // agree on it, so hydration matches.
  const [phase, setPhase] = useState<'idle' | 'exit' | 'done'>('idle')
  // The counter deliberately does NOT live in React state. Driving it with
  // setState re-rendered this component every animation frame (~84 renders)
  // during the exact window hydration needs the main thread — a measurable
  // slice of that 11.7s TTI. It writes straight to the DOM instead.
  const fillRef = useRef<HTMLSpanElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = document.documentElement
    const stand_down = () => {
      root.classList.add('ld-no-intro')
      root.style.overflow = ''
      setPhase('done')
    }

    if (pathname !== '/') return stand_down()
    if (window.sessionStorage.getItem(KEY)) return stand_down()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.sessionStorage.setItem(KEY, '1')
      return stand_down()
    }

    // The inline head script already locked scroll; we just release it.
    let raf = 0
    let t0 = 0
    let last = -1
    function tick(now: number) {
      if (!t0) t0 = now
      const p = Math.min((now - t0) / DURATION, 1)
      // ease-out-expo on the counter
      const eased = 1 - Math.pow(2, -10 * p)
      const n = Math.round(eased * 100)
      // Direct DOM writes — no React render. Skip when the integer has not
      // changed, so we touch the DOM ~100 times instead of once per frame.
      if (n !== last) {
        last = n
        if (countRef.current) countRef.current.textContent = String(n).padStart(3, '0')
        if (fillRef.current) fillRef.current.style.transform = `scaleX(${n / 100})`
      }
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setPhase('exit')
        window.sessionStorage.setItem(KEY, '1')
        window.setTimeout(() => {
          root.style.overflow = ''
          setPhase('done')
        }, EXIT)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      root.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (phase === 'done') return null

  return (
    <div className={`preloader${phase === 'exit' ? ' preloader-exit' : ''}`} aria-hidden="true">
      <div className="preloader-inner">
        <span className="preloader-mark">
          Liégeois <em>Designs</em>
        </span>
        <span className="preloader-rule">
          <span ref={fillRef} className="preloader-rule-fill" style={{ transform: 'scaleX(0)' }} />
        </span>
        <span ref={countRef} className="preloader-count">
          000
        </span>
      </div>
    </div>
  )
}
