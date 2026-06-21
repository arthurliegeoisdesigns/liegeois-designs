'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { featuredCaseStudies } from '@/content/case-studies'

gsap.registerPlugin(ScrollTrigger)

const stack = featuredCaseStudies.slice(0, 4)

export default function PortfolioStack() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>('.pstack-card')

        cards.forEach((card, i) => {
          if (i < cards.length - 1) {
            ScrollTrigger.create({
              trigger: card,
              start: 'top 80px',
              endTrigger: cards[cards.length - 1],
              end: 'top 80px',
              pin: true,
              pinSpacing: false,
            })

            gsap.to(card, {
              scale: 0.93,
              opacity: 0.45,
              ease: 'none',
              scrollTrigger: {
                trigger: cards[i + 1],
                start: 'top bottom',
                end: 'top 80px',
                scrub: true,
              },
            })
          }
        })
      }, ref)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {stack.map((cs, i) => (
        <div
          key={cs.slug}
          className="pstack-card"
          style={{
            position: 'relative',
            minHeight: '82vh',
            overflow: 'hidden',
            borderRadius: 0,
            marginBottom: i < stack.length - 1 ? '12px' : 0,
          }}
        >
          {/* Full-bleed image */}
          <Image
            src={cs.images[0]}
            alt={`${cs.client} — ${cs.project}`}
            fill
            priority={i === 0}
            className="pstack-card-image"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            sizes="(max-width: 768px) 100vw, calc(100vw - clamp(48px, 12vw, 160px))"
          />

          {/* Gradient overlay — enhanced with deeper bottom */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: [
                'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.50) 35%, transparent 60%)',
                'linear-gradient(to right, rgba(8,8,8,0.60) 0%, transparent 50%)',
              ].join(', '),
              zIndex: 1,
            }}
          />

          {/* Glass border overlay — subtle frame effect */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              borderRadius: 0,
              border: '0.5px solid rgba(255, 255, 255, 0.04)',
              pointerEvents: 'none',
            }}
          />

          {/* Bottom glow line */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              left: '5%',
              right: '5%',
              height: '1px',
              zIndex: 3,
              background: 'var(--color-dark-border)',
            }}
          />

          {/* Text overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 'clamp(24px, 4vw, 56px)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: '24px',
              }}
            >
              {/* Left — primary info */}
              <div style={{ maxWidth: '580px' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6875rem',
                    fontWeight: 400,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-on-dark-faint)',
                    margin: '0 0 14px',
                  }}
                >
                  {cs.format}
                </p>

                <h3
                  className="type-h1"
                  style={{
                    color: 'var(--color-on-dark)',
                    margin: '0 0 12px',
                    lineHeight: 0.98,
                  }}
                >
                  {cs.client}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(0.9375rem, 1.6vw, 1.25rem)',
                    fontWeight: 400,
                    color: 'var(--color-on-dark-muted)',
                    margin: '0 0 28px',
                    lineHeight: 1.4,
                    letterSpacing: '-0.01em',
                    maxWidth: '480px',
                  }}
                >
                  {cs.tagline}
                </p>

                <Link
                  href={`/work/${cs.slug}`}
                  className="btn-ghost"
                  style={{ display: 'inline-block' }}
                >
                  View Case Study
                </Link>
              </div>

              {/* Right — meta */}
              <div
                className="pstack-meta"
                style={{
                  textAlign: 'right',
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    color: 'var(--color-on-dark-hint)',
                    margin: 0,
                  }}
                >
                  {cs.industry}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    color: 'var(--color-on-dark-faint)',
                    margin: 0,
                    letterSpacing: '0.04em',
                  }}
                >
                  {cs.year}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
