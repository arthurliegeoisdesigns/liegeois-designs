'use client'

import Link from 'next/link'

/**
 * Services v2 — a deck of slides (Phase 3, audit rec 24).
 * Each service is a card that pins and gets covered by the next one
 * stacking on top, like flipping through a presentation. Pure CSS
 * sticky stacking — no JS, works everywhere, degrades to a simple
 * stack without sticky support.
 */
const services = [
  {
    number: '01',
    title: 'Pitch & Investor Decks',
    description: 'For founders raising capital. Built to move money.',
  },
  {
    number: '02',
    title: 'Executive Presentations',
    description: 'Board meetings, all-hands, keynotes. High stakes by definition.',
  },
  {
    number: '03',
    title: 'Sales & Agency Decks',
    description: "Proposals that don't wait for a follow-up email.",
  },
  {
    number: '04',
    title: 'Strategic Narrative',
    description: "When the problem isn't the design. It's the story.",
  },
]

export default function Services() {
  return (
    <section
      className="section-dark svc-deck"
      style={{ position: 'relative', padding: 'var(--section-pad-y) var(--section-pad-x)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Headline */}
        <h2
          data-reveal
          className="type-display"
          style={{ color: 'var(--color-text-primary)', margin: 0, maxWidth: '820px', lineHeight: 1.0 }}
        >
          Strategy, story, design.
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>In that order.</em>
        </h2>

        <p
          className="type-body-lg"
          style={{
            color: 'var(--color-text-secondary)',
            margin: 'clamp(32px, 4vw, 56px) 0 clamp(48px, 6vw, 88px)',
            maxWidth: '480px',
          }}
        >
          Every project starts with one question: what do we need people to think, feel, or do?
          The answer shapes everything that follows.
        </p>

        {/* The deck */}
        <div className="svc-deck-stack">
          {services.map((s, i) => (
            <Link
              key={s.number}
              href="/services"
              className="svc-deck-card"
              style={{ top: `calc(96px + ${i * 18}px)` }}
              data-cursor-hover
            >
              <span className="svc-deck-num" aria-hidden="true">
                {s.number}
              </span>
              <span className="svc-deck-body">
                <span className="svc-deck-title">{s.title}</span>
                <span className="svc-deck-desc">{s.description}</span>
              </span>
              <span className="svc-deck-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
