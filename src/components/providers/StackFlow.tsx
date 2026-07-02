'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * StackFlow — section flow engine, two modes (temporary A/B for review):
 *
 *   stack (default) — deck stacking: sections pin and the next one slides
 *     over while the covered one recedes (scales down, dims).
 *   wipe — cinematic letterbox wipes: the incoming section arrives as a
 *     thin horizontal band that opens to full bleed, scrubbed to scroll,
 *     like a film transition between scenes.
 *
 * Press "W" to flip modes (persists per browser, page reloads).
 * ?flow=stack / ?flow=wipe also works. Remove the loser after review.
 *
 * Home page only. Reduced motion / no JS → normal flow.
 */
const KEY = 'ld-flow'
const MODES = ['stack', 'wipe'] as const
type Mode = (typeof MODES)[number]

function currentMode(): Mode {
  const param = new URLSearchParams(window.location.search).get('flow')
  if (param && MODES.includes(param as Mode)) {
    window.localStorage.setItem(KEY, param)
    return param as Mode
  }
  const stored = window.localStorage.getItem(KEY)
  return stored && MODES.includes(stored as Mode) ? (stored as Mode) : 'stack'
}

export default function StackFlow() {
  const pathname = usePathname()

  // Mode toggle — available on every page so it works mid-scroll
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable) return
      if (e.key.toLowerCase() !== 'w' || e.metaKey || e.ctrlKey || e.altKey) return
      const next: Mode = currentMode() === 'stack' ? 'wipe' : 'stack'
      window.localStorage.setItem(KEY, next)
      window.location.reload()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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

      const mode = currentMode()
      const restore: Array<() => void> = []
      const triggers: ScrollTrigger[] = []

      sections.forEach((s, i) => {
        const prev = {
          position: s.style.position,
          top: s.style.top,
          zIndex: s.style.zIndex,
          background: s.style.background,
        }
        // Sticky pin — both modes layer sections over each other
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

      if (mode === 'stack') {
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
      } else {
        // wipe — incoming section opens from a letterbox slit as it arrives;
        // the scene beneath dims slightly so the reveal reads
        for (let i = 1; i < sections.length; i++) {
          const wipe = gsap.fromTo(
            sections[i],
            { clipPath: 'inset(46% 0% 46% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              ease: 'none',
              scrollTrigger: {
                trigger: sections[i],
                start: 'top bottom',
                end: 'top top',
                scrub: 0.3,
              },
            },
          )
          if (wipe.scrollTrigger) triggers.push(wipe.scrollTrigger)

          const dim = gsap.fromTo(
            sections[i - 1],
            { filter: 'brightness(1)' },
            {
              filter: 'brightness(0.7)',
              ease: 'none',
              scrollTrigger: {
                trigger: sections[i],
                start: 'top 80%',
                end: 'top top',
                scrub: 0.3,
              },
            },
          )
          if (dim.scrollTrigger) triggers.push(dim.scrollTrigger)
        }
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
