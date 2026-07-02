'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * ParallaxFlow — sections fly over one continuous background
 * (chosen over deck stacking July 2026; see WorldCanvas).
 *
 * On the home page every section after the hero loses its own surface,
 * is re-themed dark, and drifts vertically at its own speed while
 * scrolling — content floating over the textured world rather than
 * blocks stacking on each other. Section distinction disappears.
 *
 * Progressive enhancement: no JS / reduced motion → sections keep their
 * original solid surfaces and normal flow.
 */
export default function ParallaxFlow() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    ;(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      const lenis = (window as unknown as Record<string, unknown>).lenis as
        | { on: (e: string, cb: () => void) => void }
        | undefined
      lenis?.on('scroll', ScrollTrigger.update)

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>('#main-content main > section'),
      )
      if (sections.length < 2) return

      const restore: Array<() => void> = []
      const triggers: ScrollTrigger[] = []

      sections.forEach((s, i) => {
        if (i === 0) return // hero keeps its own world (image slideshow)

        const prevBg = s.style.background
        const hadDark = s.classList.contains('section-dark')

        // Surface off — the WorldCanvas shows through
        s.style.background = 'transparent'
        // Everything lives on the dark world → dark text theme everywhere
        if (!hadDark) s.classList.add('section-dark')

        restore.push(() => {
          s.style.background = prevBg
          if (!hadDark) s.classList.remove('section-dark')
        })

        // Vertical drift — each section floats at a clearly different
        // speed, scrubbed across its whole journey through the viewport
        const amp = 90 + (i % 3) * 55
        const tween = gsap.fromTo(
          s,
          { y: amp },
          {
            y: -amp,
            ease: 'none',
            scrollTrigger: {
              trigger: s,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.4,
            },
          },
        )
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
      })

      cleanup = () => {
        triggers.forEach((t) => t.kill())
        restore.forEach((fn) => fn())
      }
    })()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [pathname])

  return null
}
