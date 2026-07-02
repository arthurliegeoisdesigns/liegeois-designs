'use client'

import { useEffect, useRef } from 'react'
import { testimonials } from '@/content/testimonials'

/**
 * Testimonials v2 — cinematic pull quotes (Phase 3, audit rec 23).
 * The section pins and three quotes take the full viewport one at a
 * time: words rise in as you scroll, author appears last, quote hands
 * off to the next. Glass card deleted. data-no-drift (pinned).
 *
 * Reduced motion / no JS: quotes render stacked, fully visible.
 */
const FEATURED = testimonials.slice(0, 3)

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    ;(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled || !sectionRef.current) return
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const quotes = Array.from(section.querySelectorAll<HTMLElement>('.testi-cine-quote'))

      // Prepare: words hidden, quotes stacked
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${quotes.length * 90}%`,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
        },
      })

      quotes.forEach((q, i) => {
        const words = q.querySelectorAll('.testi-cine-word')
        const author = q.querySelector('.testi-cine-author')
        gsap.set(q, { autoAlpha: i === 0 ? 1 : 0 })

        if (i > 0) tl.to(q, { autoAlpha: 1, duration: 0.12 }, `q${i}`)
        tl.fromTo(
          words,
          { yPercent: 55, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.018, duration: 0.30, ease: 'power2.out' },
          i === 0 ? 0.02 : `q${i}+=0.06`,
        )
        tl.fromTo(
          author,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.12 },
          '>-0.05',
        )
        tl.to({}, { duration: 0.22 }) // hold
        if (i < quotes.length - 1) {
          tl.to(q, { autoAlpha: 0, y: -30, duration: 0.14 }, `q${i + 1}-=0.10`)
        }
      })

      cleanup = () => {
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    })()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      data-no-drift
      className="section-dark testi-cine"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <p className="eyebrow testi-cine-eyebrow">THE KIND OF WORDS YOU CAN&apos;T WRITE YOURSELF</p>

      <div className="testi-cine-stage">
        {FEATURED.map((t) => (
          <blockquote key={t.id} className="testi-cine-quote">
            <p className="testi-cine-text">
              {t.quote.split(' ').map((w, wi) => (
                <span key={wi}>
                  <span className="testi-cine-wordwrap">
                    <span className="testi-cine-word">{w}</span>
                  </span>{' '}
                </span>
              ))}
            </p>
            <footer className="testi-cine-author">
              <cite>{t.author}</cite>
              <span>
                {t.title}, {t.company}
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
