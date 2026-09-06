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

    const planes = Array.from(
      document.querySelectorAll<HTMLElement>('.backdrop .bd[data-depth]')
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
