'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { links } from '@/lib/config'
import { ScrambleEyebrow } from '@/components/ui/ScrambleEyebrow'

const services = [
  {
    number: '01',
    title: 'Pitch & Investor Decks',
    tagline: 'For founders raising capital.',
    description:
      'The deck you bring into the most important room of your year. Built around your story, your audience, and the specific ask that needs to land. Structure first, design second — always.',
    deliverables: ['Narrative architecture', 'Slide design (10–30 slides)', 'Speaker notes', 'PDF + editable file'],
    timeline: '1–2 weeks',
    image: 'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be15b2139addb3912b6_683f46ba0845e65a13ecb3a3_6830b476a23481588a2f808f_Portfolio_Slides_RAPP-Evolus-Pitch-Deck_0007.jpeg',
    imageAlt: 'Evolus pitch deck — Liégeois Designs',
  },
  {
    number: '02',
    title: 'Executive Presentations',
    tagline: 'High stakes by definition.',
    description:
      'Board decks, C-suite briefings, and strategic reviews that show — not just tell — the decision that needs to be made. Designed to be trusted on sight.',
    deliverables: ['Story structure review', 'Data visualization', 'Executive-grade design', 'Multiple format exports'],
    timeline: '1–2 weeks',
    image: 'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdc74bd6bad20709672_683f46b683ae96a1c334fcb4_6830bafcc24aad0888102a9b_Fivestone%252520-%252520Chevron%2525201_1.jpeg',
    imageAlt: 'Chevron executive presentation — Liégeois Designs',
  },
  {
    number: '03',
    title: 'Sales & Agency Decks',
    tagline: "Proposals that don't wait for a follow-up.",
    description:
      "Proposals, capabilities decks, and RFP responses that make prospects say yes before the meeting ends. Tailored to your sales motion and your buyer's psychology.",
    deliverables: ['Positioning review', 'Modular slide system', 'Brand integration', 'Editable master template'],
    timeline: '1–3 weeks',
    image: 'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be1473ae2fd117e5f13_683f46bad2c7f4eec55f8758_6830b0d200991d0e8d6cdabc_Portfolio_Slides_RAPP-Spectrum_0001.webp',
    imageAlt: 'Spectrum × RAPP sales deck — Liégeois Designs',
  },
  {
    number: '04',
    title: 'Strategic Narrative',
    tagline: 'When the story needs fixing first.',
    description:
      "When the problem isn't the design — it's the story. A deep-dive engagement that starts upstream: audience, insight, message architecture, then visual expression. For teams who need the whole thing fixed.",
    deliverables: ['Audience & insight workshop', 'Message hierarchy', 'Full deck design', 'Presenter coaching notes'],
    timeline: '2–4 weeks',
    image: 'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68cae362b6f7edca9f846307_Marriott_The_Luxury_Group_Slide_1.avif',
    imageAlt: 'Marriott Luxury Group strategic narrative — Liégeois Designs',
  },
]

export default function ServicesPage() {
  const reduced = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [showScrollHint, setShowScrollHint] = useState(true)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const idx = Math.round(track.scrollLeft / track.clientWidth)
      setActiveIdx(idx)
      if (track.scrollLeft > 40) setShowScrollHint(false)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = useCallback((idx: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: idx * track.clientWidth, behavior: 'smooth' })
  }, [])

  return (
    <main style={{ background: 'var(--color-void)', minHeight: '100vh' }}>

      {/* ── Fixed top bar ─────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: '24px var(--section-pad-x)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: 'var(--color-on-dark-muted)',
            textDecoration: 'none',
            letterSpacing: '0.04em',
            pointerEvents: 'auto',
            transition: 'color 200ms ease',
          }}
        >
          ← Home
        </Link>

        {/* Panel indicators */}
        <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
          {services.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to ${services[i].title}`}
              onClick={() => goTo(i)}
              style={{
                width: i === activeIdx ? '28px' : '8px',
                height: '2px',
                background: i === activeIdx ? 'var(--color-on-dark)' : 'var(--color-on-dark-ghost)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'width 400ms cubic-bezier(0.16,1,0.3,1), background 250ms ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Left / Right nav arrows ──────────────────────────── */}
      {activeIdx > 0 && (
        <button
          aria-label="Previous service"
          onClick={() => goTo(activeIdx - 1)}
          className="services-nav-arrow"
          style={{
            position: 'fixed',
            left: 'clamp(12px, 2.5vw, 28px)',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 40,
            background: 'rgba(255,255,255,0.08)',
            border: '0.5px solid rgba(255,255,255,0.18)',
            borderRadius: '2px',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            color: 'rgba(255,255,255,0.75)',
            fontSize: '1.1rem',
            transition: 'background 200ms ease, border-color 200ms ease, color 200ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
            e.currentTarget.style.color = '#ffffff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
          }}
        >
          ←
        </button>
      )}
      {activeIdx < services.length - 1 && (
        <button
          aria-label="Next service"
          onClick={() => goTo(activeIdx + 1)}
          className="services-nav-arrow"
          style={{
            position: 'fixed',
            right: 'clamp(12px, 2.5vw, 28px)',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 40,
            background: 'rgba(255,255,255,0.08)',
            border: '0.5px solid rgba(255,255,255,0.18)',
            borderRadius: '2px',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            color: 'rgba(255,255,255,0.75)',
            fontSize: '1.1rem',
            transition: 'background 200ms ease, border-color 200ms ease, color 200ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
            e.currentTarget.style.color = '#ffffff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
          }}
        >
          →
        </button>
      )}

      {/* ── Scroll hint — fades out after first scroll ────────── */}
      {showScrollHint && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            bottom: 'clamp(28px, 5vh, 44px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'rgba(255,255,255,0.40)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            animation: 'pulse-hint 2s ease-in-out infinite',
          }}
        >
          <span style={{ display: 'inline-block', width: '20px', height: '0.5px', background: 'rgba(255,255,255,0.30)' }} />
          Scroll to explore
          <span style={{ display: 'inline-block', width: '20px', height: '0.5px', background: 'rgba(255,255,255,0.30)' }} />
        </div>
      )}

      {/* ── Horizontal scroll track ───────────────────────────── */}
      <div
        ref={trackRef}
        className="services-scroll-track"
        style={{
          display: 'flex',
          overflowX: reduced ? 'auto' : 'scroll',
          scrollSnapType: reduced ? 'none' : 'x mandatory',
          height: '100dvh',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        } as React.CSSProperties}
      >
        {services.map((service, i) => (
          <div
            key={service.number}
            style={{
              width: '100vw',
              height: '100dvh',
              flexShrink: 0,
              scrollSnapAlign: 'start',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 'var(--section-pad-x)',
              paddingTop: '120px',
              paddingBottom: 'clamp(48px, 6vw, 80px)',
              boxSizing: 'border-box',
              borderLeft: i > 0 ? '0.5px solid var(--color-dark-border)' : 'none',
              overflow: 'hidden',
            }}
          >
            {/* ── Work sample image — right side ── */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '52%',
                height: '100%',
                pointerEvents: 'none',
              }}
            >
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                priority={i === 0}
                sizes="52vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
              {/* Gradient fade — left blends into dark bg */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, var(--color-void) 0%, rgba(8,8,9,0.55) 25%, rgba(8,8,9,0.15) 55%, transparent 100%)',
                }}
              />
              {/* Gradient fade — bottom blends with content */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, var(--color-void) 0%, rgba(8,8,9,0.30) 30%, transparent 58%)',
                }}
              />
            </div>

            {/* Large background number */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '50%',
                left: 'var(--section-pad-x)',
                transform: 'translateY(-62%)',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(180px, 22vw, 300px)',
                fontWeight: 300,
                lineHeight: 1,
                color: 'rgba(255,255,255,0.11)',
                userSelect: 'none',
                pointerEvents: 'none',
                letterSpacing: '-0.04em',
              }}
            >
              {service.number}
            </div>

            {/* Top-left: number + tagline */}
            <div
              style={{
                position: 'absolute',
                top: 'clamp(88px, 10vh, 120px)',
                left: 'var(--section-pad-x)',
                display: 'flex',
                alignItems: 'baseline',
                gap: '20px',
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9375rem', fontWeight: 400, color: 'var(--color-on-dark-faint)', letterSpacing: '0.04em' }}>
                {service.number}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-on-dark-faint)' }}>
                {service.tagline}
              </span>
            </div>

            {/* Service title */}
            <motion.h2
              className="type-display"
              style={{ color: 'var(--color-on-dark)', margin: '0 0 clamp(28px, 4vh, 44px)', maxWidth: '600px', position: 'relative', zIndex: 1 }}
              animate={i === activeIdx ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {service.title}
            </motion.h2>

            {/* Bottom row: description + deliverables + CTA */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                className="services-bottom-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: 'clamp(32px, 5vw, 64px)',
                  alignItems: 'start',
                  borderTop: '0.5px solid var(--color-dark-border)',
                  paddingTop: 'clamp(20px, 3vh, 32px)',
                  marginBottom: 'clamp(24px, 3vh, 36px)',
                }}
              >
                <motion.p
                  className="type-body-lg"
                  style={{ color: 'rgba(255,255,255,0.72)', margin: 0, maxWidth: '480px', lineHeight: 1.7 }}
                  animate={i === activeIdx ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                >
                  {service.description}
                </motion.p>

                <motion.div
                  style={{ minWidth: '180px', maxWidth: '240px' }}
                  animate={i === activeIdx ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
                >
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.625rem', fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-on-dark-faint)', margin: '0 0 10px' }}>
                    Includes
                  </p>
                  <ul style={{ margin: '0 0 16px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                    {service.deliverables.map((d) => (
                      <li key={d} style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.70)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '12px', height: '0.5px', background: 'rgba(255,255,255,0.35)', display: 'inline-block', flexShrink: 0 }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', margin: 0, letterSpacing: '0.04em' }}>
                    Timeline: {service.timeline}
                  </p>
                </motion.div>
              </div>

              {/* Navigation row — always in flow, no overlap */}
              <motion.div
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                animate={i === activeIdx ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
              >
                {i < services.length - 1 ? (
                  <button
                    onClick={() => goTo(i + 1)}
                    aria-label={`Next: ${services[i + 1].title}`}
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '0.5px solid rgba(255,255,255,0.20)',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 20px',
                      color: 'rgba(255,255,255,0.80)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.10em',
                      textTransform: 'uppercase',
                      backdropFilter: 'blur(8px)',
                      transition: 'background 200ms ease, border-color 200ms ease, color 200ms ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.13)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.40)'
                      e.currentTarget.style.color = '#ffffff'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.20)'
                      e.currentTarget.style.color = 'rgba(255,255,255,0.80)'
                    }}
                  >
                    {services[i + 1].title} →
                  </button>
                ) : (
                  <a
                    href={links.calendly || '/contact'}
                    target={links.calendly ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{
                      background: '#ffffff',
                      border: '1px solid rgba(255,255,255,0.20)',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '13px 24px',
                      color: '#0d0d0d',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.10em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      transition: 'opacity 200ms ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
                  >
                    Book a Free Call →
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom CTA section ────────────────────────────────── */}
      <section
        style={{
          background: 'var(--color-void)',
          padding: 'clamp(80px, 10vw, 140px) var(--section-pad-x)',
          borderTop: '0.5px solid var(--color-dark-border)',
          textAlign: 'center',
        }}
      >
        <ScrambleEyebrow style={{ marginBottom: '24px', display: 'block' }}>Ready to start?</ScrambleEyebrow>
        <h2 className="type-h1" style={{ color: 'var(--color-on-dark)', margin: '0 auto 32px', maxWidth: '600px' }}>
          Let&apos;s talk about what you&apos;re trying to change.
        </h2>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={links.calendly} className="btn-primary" style={{ background: '#ffffff', color: '#0d0d0d' }}>Book a Free Call</a>
          <Link href="/work" className="btn-ghost" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.25)' }}>See the Work</Link>
        </div>
      </section>

    </main>
  )
}
