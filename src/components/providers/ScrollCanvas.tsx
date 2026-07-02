'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * ScrollCanvas — continuous background canvas (audit rec 16).
 *
 * Progressive enhancement: on the server / without JS, every section keeps
 * its own solid background (no regression). On mount, this component makes
 * section backgrounds transparent and animates <body>'s background color
 * between the dark and bone zones as the visitor scrolls — the page flows
 * instead of switching.
 *
 * GSAP is imported dynamically inside useEffect to stay out of the SSR
 * bundle (same Next 16 dual-React constraint as LenisInit).
 */
const DARK = '#0A0908'
const LIGHT = '#F4F1EC'

function isDark(el: Element) {
  return (
    el.classList.contains('section-dark') ||
    el.classList.contains('section-surface')
  )
}

export default function ScrollCanvas() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    ;(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      // Keep ScrollTrigger in sync with Lenis if it's running
      const lenis = (window as unknown as Record<string, unknown>).lenis as
        | { on: (e: string, cb: () => void) => void }
        | undefined
      lenis?.on('scroll', ScrollTrigger.update)

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>('#main-content section'),
      )
      if (sections.length === 0) return

      const restore: Array<() => void> = []
      const triggers: ScrollTrigger[] = []

      // Hand backgrounds over to <body>
      const prevBodyBg = document.body.style.backgroundColor
      document.body.style.backgroundColor = isDark(sections[0]) ? DARK : LIGHT
      for (const s of sections) {
        const prev = s.style.background
        s.style.background = 'transparent'
        restore.push(() => {
          s.style.background = prev
        })
      }

      for (const s of sections) {
        const color = isDark(s) ? DARK : LIGHT
        triggers.push(
          ScrollTrigger.create({
            trigger: s,
            start: 'top 55%',
            end: 'bottom 55%',
            onEnter: () =>
              gsap.to('body', {
                backgroundColor: color,
                duration: 0.7,
                ease: 'power2.out',
                overwrite: 'auto',
              }),
            onEnterBack: () =>
              gsap.to('body', {
                backgroundColor: color,
                duration: 0.7,
                ease: 'power2.out',
                overwrite: 'auto',
              }),
          }),
        )
      }

      cleanup = () => {
        triggers.forEach((t) => t.kill())
        restore.forEach((fn) => fn())
        document.body.style.backgroundColor = prevBodyBg
      }
    })()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [pathname])

  return null
}
