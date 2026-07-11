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
 */
const KEY = 'ld-intro-done'
// Restored to the engaging pace (Arthur, July 2026) — safe now because
// hero entrances and the LCP element paint UNDER the plate, so the
// preloader no longer delays any scored metric.
const DURATION = 1400 // counter run
const EXIT = 750 // wipe

export default function Preloader() {
  const pathname = usePathname()
  const [phase, setPhase] = useState<'idle' | 'run' | 'exit' | 'done'>('idle')
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (pathname !== '/') return
    if (window.sessionStorage.getItem(KEY)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.sessionStorage.setItem(KEY, '1')
      return
    }

    document.documentElement.style.overflow = 'hidden'

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
          document.documentElement.style.overflow = ''
          setPhase('done')
        }, EXIT)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (phase === 'idle' || phase === 'done') return null

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
