'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * LenisInit — initialises Lenis smooth scroll on the client only.
 * Loaded via dynamic({ ssr: false }) inside SmoothScrollProvider so it
 * never appears in the server-side prerender bundle (which causes the
 * null react-ssr hook crash in Next.js 16 / Turbopack + Webpack).
 */
export default function LenisInit() {
  useEffect(() => {
    // Skip on touch devices — native scroll is already smooth
    if (window.matchMedia('(pointer: coarse)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2,
    })

    // Expose on window so GSAP ScrollTrigger can sync if needed
    ;(window as unknown as Record<string, unknown>).lenis = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      delete (window as unknown as Record<string, unknown>).lenis
    }
  }, [])

  return null
}
