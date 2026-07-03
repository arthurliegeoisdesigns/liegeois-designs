'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { caseStudies } from '@/content/case-studies'

/**
 * FeaturedWork v2 — pinned horizontal gallery (Phase 3, audit rec 18).
 * The section pins to the viewport and vertical scroll drives the track
 * sideways through the featured case studies. Giant index numbers, orange
 * progress hairline. data-no-drift opts out of ParallaxFlow's y-drift
 * (pin and drift both transform the section — they must not fight).
 *
 * Reduced motion / no JS: normal vertical flow, cards stacked.
 */
const featured = caseStudies
  .filter((cs) => cs.featured)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
  .slice(0, 6)

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    ;(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled || !sectionRef.current || !trackRef.current) return
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const track = trackRef.current

      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 0.35,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`
          },
        },
      })

      cleanup = () => {
        tween.scrollTrigger?.kill()
        tween.kill()
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
      className="work-rail"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Header — sits above the rail inside the pinned viewport */}
      <div className="work-rail-header">
        <p className="eyebrow" style={{ color: 'var(--color-on-dark-faint)', margin: '0 0 14px' }}>
          SELECTED WORK
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap' }}>
          <h2 className="type-h1" style={{ color: 'var(--color-on-dark)', margin: 0 }}>
            Work that changed the room.
          </h2>
          <Link href="/work" className="btn-text" style={{ fontSize: '0.9375rem', flexShrink: 0 }}>
            All {caseStudies.length} projects →
          </Link>
        </div>
      </div>

      {/* The rail */}
      <div ref={trackRef} className="work-rail-track">
        {featured.map((cs, i) => (
          <Link key={cs.slug} href={`/work/${cs.slug}`} className="work-rail-card" data-cursor="View">
            <span className="work-rail-index" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="work-rail-media">
              <Image
                src={cs.images[0]}
                alt={`${cs.client} — ${cs.project}`}
                fill
                priority={i < 2}
                sizes="(max-width: 768px) 88vw, 58vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                draggable="false"
              />
              <span className="work-rail-shade" aria-hidden="true" />
              <span className="work-rail-meta">
                <span className="work-rail-format">{cs.format}</span>
                <span className="work-rail-client">{cs.client}</span>
              </span>
            </span>
          </Link>
        ))}

        {/* End card → /work */}
        <Link href="/work" className="work-rail-card work-rail-endcard">
          <span className="work-rail-endcard-inner">
            <em>All</em> {caseStudies.length} projects <span aria-hidden="true">→</span>
          </span>
        </Link>
      </div>

      {/* Progress hairline */}
      <div className="work-rail-progress" aria-hidden="true">
        <div ref={barRef} className="work-rail-progress-fill" />
      </div>
    </section>
  )
}
