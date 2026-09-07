'use client'

import { useEffect } from 'react'

/**
 * Parallax for the fixed backdrop. Companion to Backdrop.tsx, which is a
 * server component and ships the markup; this only moves it.
 *
 * Deliberately small and deliberately dumb:
 *
 * - ONE rAF loop, transform only. No layout reads per frame beyond scrollY,
 *   no width/height, nothing that forces reflow. The planes are already
 *   position:fixed with inset:-30%, so there is slack to move into and no
 *   edge can ever be exposed.
 *
 * - Rates are 0.10 far and 0.26 near, read from data-depth so the values live
 *   next to the markup they describe rather than in here. The vignette has no
 *   data-depth and therefore never moves, which is intentional: a moving
 *   vignette reads as a spotlight following you.
 *
 * - prefers-reduced-motion returns before any listener is attached, so the
 *   whole system is genuinely inert rather than merely slower.
 *
 * Why not Framer Motion: this runs on every page and must not cost anything.
 * A scroll handler and a transform string is the entire requirement.
 */
export default function BackdropParallax() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    // Any [data-depth] inside .backdrop, not just .bd — the sphere positions
    // itself and does not carry .bd, and scoping to .bd silently dropped it.
    const planes = Array.from(
      document.querySelectorAll<HTMLElement>('.backdrop [data-depth]')
    ).map((el) => ({ el, depth: parseFloat(el.dataset.depth || '0') }))

    if (!planes.length) return

    let ticking = false

    const frame = () => {
      const y = window.scrollY
      for (const { el, depth } of planes) {
        el.style.transform = `translate3d(0, ${(y * depth * -1).toFixed(1)}px, 0)`
      }
      ticking = false
    }
    // Rates were 0.10 / 0.26 and Arthur reported the motion as barely visible.
    // Raising them was only half the fix: the real problem was that the field
    // had no edges, so there was nothing to perceive moving. With a hard-edged
    // sphere in the stack, 0.08 / 0.24 / 0.52 reads clearly. If it ever feels
    // like too much, lower the SPHERE first — it is the one you actually see.

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(frame)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    frame()

    return () => {
      window.removeEventListener('scroll', onScroll)
      for (const { el } of planes) el.style.transform = ''
    }
  }, [])

  return null
}
