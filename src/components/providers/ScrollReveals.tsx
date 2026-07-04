'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * ScrollReveals — scrubbed line-by-line text reveals (audit rec 20).
 *
 * Any element with a `data-reveal` attribute is split into lines
 * (GSAP SplitText — free since 3.13) and revealed line-by-line,
 * scrubbed to scroll position so the text *flows* with the reader
 * instead of firing once.
 *
 * Progressive enhancement: without JS or with reduced motion the
 * text simply renders. Waits for `document.fonts.ready` so lines
 * split against the real display font, not the fallback.
 */
export default function ScrollReveals() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    ;(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const { SplitText } = await import('gsap/SplitText')
      await document.fonts.ready
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger, SplitText)

      const targets = Array.from(
        document.querySelectorAll<HTMLElement>('[data-reveal]'),
      )
      if (targets.length === 0) return

      const splits: SplitText[] = []
      const triggers: ScrollTrigger[] = []

      for (const el of targets) {
        const split = new SplitText(el, {
          type: 'lines',
          linesClass: 'reveal-line',
        })
        splits.push(split)

        const tween = gsap.fromTo(
          split.lines,
          { yPercent: 60, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            ease: 'none',
            stagger: 0.15,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'top 50%',
              scrub: 0.4,
            },
          },
        )
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
      }

      cleanup = () => {
        triggers.forEach((t) => t.kill())
        splits.forEach((s) => s.revert())
      }
    })()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [pathname])

  return null
}
