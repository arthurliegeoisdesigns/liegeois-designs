'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/**
 * WorldCanvas v2 — a lit atmosphere, not a flat color.
 * (Reference language: Luna UI's silk folds + dust, Worknight's light
 * sweeps, Montfort's environmental depth — translated warm.)
 *
 * Layers, back to front:
 *   silk     — broad diagonal light folds sweeping slowly (visible sheen)
 *   ember    — warm accent glow breathing low in the frame
 *   dust     — sparse drifting specks (depth)
 *   spot     — soft light that follows the cursor (lerped)
 *   vignette — edge falloff for focus
 * Site grain rides above everything. Styles in globals.css.
 *
 * Must render OUTSIDE .page-transition-wrapper (its route animation
 * retains a transform → breaks position:fixed descendants).
 */
export default function WorldCanvas() {
  const pathname = usePathname()
  const spotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (pathname !== '/') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let raf = 0
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let x = tx
    let y = ty

    function onMove(e: PointerEvent) {
      tx = e.clientX
      ty = e.clientY
    }
    function tick() {
      x += (tx - x) * 0.06
      y += (ty - y) * 0.06
      if (spotRef.current) {
        spotRef.current.style.transform = `translate3d(${x - 400}px, ${y - 400}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [pathname])

  if (pathname !== '/') return null

  return (
    <div aria-hidden="true" className="world-canvas">
      <div className="world-silk" />
      <div className="world-ember" />
      <div className="world-dust" />
      <div ref={spotRef} className="world-spot" />
      <div className="world-vignette" />
    </div>
  )
}
