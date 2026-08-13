'use client'

import { useEffect, useState } from 'react'
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
const DURATION = 1400 // counter run
const EXIT = 750 // wipe

export default function Preloader() {
  const pathname = usePathname()
  // 'idle' now RENDERS (see note above). Server and first client render
  // agree on it, so hydration matches.
  const [phase, setPhase] = useState<'idle' | 'run' | 'exit' | 'done'>('idle')
  const [count, setCount] = useState(0)

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
    function tick(now: number) {
      if (!t0) {
        t0 = now
        setPhase('run')
      }
      const p = Math.min((now - t0) / DURATION, 1)
      // ease-out-expo on the counter
      const eased = 1 - Math.pow(2, -10 * p)
      setCount(Math.round(eased * 100))
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
          <span className="preloader-rule-fill" style={{ transform: `scaleX(${count / 100})` }} />
        </span>
        <span className="preloader-count">{String(count).padStart(3, '0')}</span>
      </div>
    </div>
  )
}
