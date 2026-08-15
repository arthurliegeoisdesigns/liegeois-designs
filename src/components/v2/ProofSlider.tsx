'use client'

import { useEffect, useRef } from 'react'

/**
 * ProofSlider — the before/after, and the only real interaction on the page.
 *
 * It DEMONSTRATES ITSELF once on entry, sweeping the handle across and back,
 * then hands over the instant the visitor touches it. Sliders are invisible
 * affordances; without the demo most people never discover there is anything
 * to drag, and this is the single most persuasive thing on the site.
 *
 * Uses plain <img> rather than next/image on purpose: both frames must be
 * pixel-identical in size and position for the clip-path reveal to read as one
 * slide changing rather than two images swapping.
 */

type Props = { before: string; after: string; project: string; slide: string }

export default function ProofSlider({ before, after, project, slide }: Props) {
  const box = useRef<HTMLDivElement>(null)
  const handle = useRef<HTMLDivElement>(null)
  const taken = useRef(false)

  const put = (v: number) => {
    box.current?.style.setProperty('--x', v + '%')
    if (handle.current) handle.current.style.left = v + '%'
  }

  useEffect(() => {
    put(50)
    const el = box.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let drag = false
    const set = (e: PointerEvent) => {
      taken.current = true
      const r = el.getBoundingClientRect()
      put(Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1) * 100)
    }
    const down = (e: PointerEvent) => { drag = true; el.setPointerCapture(e.pointerId); set(e) }
    const move = (e: PointerEvent) => { if (drag) set(e) }
    const up = () => { drag = false }
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)

    let io: IntersectionObserver | undefined
    if (!reduced) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return
          io?.unobserve(en.target)
          window.setTimeout(() => {
            let t = 0
            const id = window.setInterval(() => {
              if (taken.current) { window.clearInterval(id); return }
              t += 0.022
              put(50 + Math.sin(t * Math.PI) * 42)
              if (t >= 2) { window.clearInterval(id); put(50) }
            }, 16)
          }, 420)
        })
      }, { threshold: 0.25 })
      io.observe(el)
    }

    return () => {
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      io?.disconnect()
    }
  }, [])

  return (
    <>
      <div className="v2-ba" ref={box}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before} alt={`${project}, original slide`} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="v2-ba-after" src={after} alt={`${project}, redesigned slide`} />
        <span className="v2-ba-tag is-l">Before</span>
        <span className="v2-ba-tag is-r">After</span>
        <div className="v2-ba-handle" ref={handle} />
      </div>
      <div className="v2-ba-foot"><span>{project}</span><span>{slide}</span></div>
    </>
  )
}
