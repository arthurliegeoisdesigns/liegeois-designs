'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * SmoothScrollProvider
 * Wraps the app with Lenis smooth scroll. Skips on touch/mobile
 * to avoid fighting native iOS momentum scrolling.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Don't apply on touch devices — native scroll is already smooth there
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
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

  return <>{children}</>
}
