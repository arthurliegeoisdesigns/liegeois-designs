'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * StackFlow — deck-stacking section flow (audit rec 17, Lando Norris /
 * OFF+BRAND pattern), replacing the background-crossfade ScrollCanvas.
 *
 * Every home-page section pins to the top of the viewport (position:
 * sticky) and the next section scrolls up OVER it like a slide being
 * laid on a deck. As a section is covered it recedes: scales down and
 * dims, scrubbed to scroll. Seams between dark and light sections
 * disappear because sections physically cover each other.
 *
 * Progressive enhancement: no JS / reduced motion → normal flow.
 * GSAP imported dynamically to stay out of the SSR bundle.
 */
export default function StackFlow() {
  const pathname = usePathname()

  useEffect(() => {
    // Home page only for now — case studies & blog have their own scroll behavior
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
        const prev = {
          position: s.style.position,
          top: s.style.top,
          zIndex: s.style.zIndex,
          background: s.style.background,
        }
        // Sticky pin — the deck surface
        s.style.position = 'sticky'
        s.style.top = '0px'
        s.style.zIndex = String(i + 1)
        // Sections without their own surface must be opaque to cover the
        // one beneath (e.g. bare `.section` blocks on the bone canvas)
        const bg = getComputedStyle(s).backgroundColor
        if (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') {
          s.style.background = 'var(--color-paper)'
        }
        restore.push(() => {
          s.style.position = prev.position
          s.style.top = prev.top
          s.style.zIndex = prev.zIndex
          s.style.background = prev.background
        })
      })

      // As section i arrives, section i-1 recedes beneath it
      for (let i = 1; i < sections.length; i++) {
        const tween = gsap.fromTo(
          sections[i - 1],
          { scale: 1, filter: 'brightness(1)' },
          {
            scale: 0.94,
            filter: 'brightness(0.55)',
            transformOrigin: 'center 20%',
            ease: 'none',
            scrollTrigger: {
              trigger: sections[i],
              start: 'top bottom',
              end: 'top top',
              scrub: 0.3,
            },
          },
        )
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
      }

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
