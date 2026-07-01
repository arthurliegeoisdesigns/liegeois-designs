'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { links } from '@/lib/config'
import { ScrambleEyebrow } from '@/components/ui/ScrambleEyebrow'

const services = [
  {
    number: '01',
    title: 'Pitch & Investor Decks',
    tagline: 'For founders raising capital.',
    description:
      'The deck you bring into the most important room of your year. Built around your story, your audience, and the specific ask that needs to land. Structure first, design second. Always.',
    deliverables: ['Narrative architecture', 'Slide design (10–30 slides)', 'Speaker notes', 'PDF + editable file'],
    process: [
      { title: 'Intake call', detail: 'Context, investor profile, and the specific ask' },
      { title: 'Narrative map', detail: 'Argument structure, objections addressed, slide outline' },
      { title: 'Design', detail: 'Visual concepts, data visualization, brand expression' },
      { title: 'Two revision rounds', detail: 'One structural, one polish' },
      { title: 'Handoff', detail: 'Final files and coaching notes for presenting' },
    ],
    timeline: '1–2 weeks',
    image: 'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be15b2139addb3912b6_683f46ba0845e65a13ecb3a3_6830b476a23481588a2f808f_Portfolio_Slides_RAPP-Evolus-Pitch-Deck_0007.jpeg',
    imageAlt: 'Evolus pitch deck — Liégeois Designs',
  },
  {
    number: '02',
    title: 'Executive Presentations',
    tagline: 'High stakes by definition.',
    description:
      'Board decks, C-suite briefings, and strategic reviews that show, not just tell, the decision that needs to be made. Designed to be trusted on sight.',
    deliverables: ['Story structure review', 'Data visualization', 'Executive-grade design', 'Multiple format exports'],
    process: [
      { title: 'Brief', detail: 'Stakeholder map, decision context, and room dynamics' },
      { title: 'Content architecture', detail: 'What stays, what moves, what order' },
      { title: 'Design', detail: 'Visual hierarchy built for executive attention spans' },
      { title: 'Revision and sign-off', detail: 'Collaborative, focused, efficient' },
      { title: 'Delivery', detail: 'All required formats and presenter notes' },
    ],
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
    process: [
      { title: 'Sales motion review', detail: 'Understand the buyer and the objection sequence' },
      { title: 'Positioning pass', detail: 'Sharpen the value proposition until it cuts' },
      { title: 'Modular design', detail: 'Slides that work in sequence and standalone' },
      { title: 'Template build', detail: 'Fully editable, reusable, on-brand' },
      { title: 'Handoff', detail: 'Team walkthrough included' },
    ],
    timeline: '1–3 weeks',
    image: 'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be1473ae2fd117e5f13_683f46bad2c7f4eec55f8758_6830b0d200991d0e8d6cdabc_Portfolio_Slides_RAPP-Spectrum_0001.webp',
    imageAlt: 'Spectrum × RAPP sales deck — Liégeois Designs',
  },
  {
    number: '04',
    title: 'Strategic Narrative',
    tagline: 'When the story needs fixing first.',
    description:
      "When the problem isn't the design. It's the story. A deep-dive engagement that starts upstream: audience, insight, message architecture, then visual expression. For teams who need the whole thing fixed.",
    deliverables: ['Audience & insight workshop', 'Message hierarchy', 'Full deck design', 'Presenter coaching notes'],
    process: [
      { title: 'Diagnostic', detail: "Why the current story isn't working, and for whom" },
      { title: 'Audience workshop', detail: '2–3 hours covering beliefs, blockers, what needs to change' },
      { title: 'Message architecture', detail: 'The argument, the narrative spine, the one sentence that matters' },
      { title: 'Full deck design', detail: 'Visual expression of the new story' },
      { title: 'Presenter coaching', detail: 'How to deliver it, not just read it' },
    ],
    timeline: '2–4 weeks',
    image: 'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68cae362b6f7edca9f846307_Marriott_The_Luxury_Group_Slide_1.avif',
    imageAlt: 'Marriott Luxury Group strategic narrative — Liégeois Designs',
  },
]

const PROCESS_PHASES = [
  {
    number: '01',
    name: 'Discovery',
    description: "A 30-minute intake call. No forms, no auto-responders. We cover the project, the stakes, and whether there's a fit.",
  },
  {
    number: '02',
    name: 'Narrative Architecture',
    description: "Before a single slide exists, we map the argument: who's in the room, what they believe walking in, and what needs to be true when they leave.",
  },
  {
    number: '03',
    name: 'Design',
    description: 'Visual concepts built around the story. Never the other way around. Slide system, data visualization, brand expression.',
  },
  {
    number: '04',
    name: 'Refinement',
    description: 'Two structured revision rounds: one for structure and content, one for polish. Focused feedback, not open-ended iteration.',
  },
  {
    number: '05',
    name: 'Delivery',
    description: 'Final files in your format of choice, speaker notes, and a handoff call so nothing gets lost between design and stage.',
  },
]

const FAQS = [
  {
    q: 'How long does a typical project take?',
    a: 'Pitch decks and executive presentations run 1–2 weeks. Sales decks and modular systems run 1–3 weeks. Strategic Narrative engagements run 2–4 weeks. Rush projects are possible with a surcharge; mention it in your brief.',
  },
  {
    q: 'What tools do you design in?',
    a: "PowerPoint, Keynote, and Figma Slides, depending on what your team needs to own and edit after delivery. If you're unsure, we'll sort it out on the intake call.",
  },
  {
    q: 'How many revision rounds are included?',
    a: 'Two structured rounds per project: one for structure and content, one for final polish. This keeps the process focused and the quality high.',
  },
  {
    q: 'Do you work with existing brand guidelines?',
    a: "Always. Every project adapts to your brand system. If your brand isn't fully defined, that conversation happens before any design does.",
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes. Standard NDAs are signed before any brief is shared. Confidentiality is the baseline, not a negotiation.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Fully remote, always. Clients across North America, Europe, and the Middle East. Time zones are manageable, great work is non-negotiable.',
  },
]

const ease = [0.16, 1, 0.3, 1] as const

export default function ServicesPage() {
  const reduced = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [showScrollHint, setShowScrollHint] = useState(true)
  const [activeTabs, setActiveTabs] = useState<Record<number, 'deliverables' | 'process'>>({})
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [animatedPanels, setAnimatedPanels] = useState<Set<number>>(new Set([0]))
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])

  // Dismiss scroll hint on first scroll
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      if (track.scrollLeft > 40) setShowScrollHint(false)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  // IntersectionObserver per panel:
  // - at 0.2 → add to animatedPanels (content fades in before fully visible)
  // - at 0.5 → update activeIdx (pill indicator + arrows; only one panel can be >50% at once)
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const observers: IntersectionObserver[] = []
    panelRefs.current.forEach((panel, idx) => {
      if (!panel) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            if (entry.intersectionRatio >= 0.2) {
              setAnimatedPanels((prev) => {
                if (prev.has(idx)) return prev
                const next = new Set(prev)
                next.add(idx)
                return next
              })
            }
            if (entry.intersectionRatio >= 0.5) {
              setActiveIdx(idx)
            }
          })
        },
        { root: track, threshold: [0.2, 0.5] },
      )
      obs.observe(panel)
      observers.push(obs)
    })
    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  const goTo = useCallback((idx: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: idx * track.clientWidth, behavior: 'smooth' })
  }, [])

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      goTo(Math.min(activeIdx + 1, services.length - 1))
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goTo(Math.max(activeIdx - 1, 0))
    }
  }, [activeIdx, goTo])

  const getTab = (i: number) => activeTabs[i] ?? 'deliverables'

  return (
    <main style={{ background: 'var(--color-void)', minHeight: '100vh' }}>

      <h1 className="sr-only">Services — Liégeois Designs</h1>

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
        <div style={{ display: 'flex', pointerEvents: 'auto' }}>
          {services.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to ${services[i].title}`}
              onClick={() => goTo(i)}
              style={{
                position: 'relative',
                width: '44px',
                height: '44px',
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'block',
                  width: i === activeIdx ? '28px' : '8px',
                  height: '2px',
                  background: i === activeIdx ? 'var(--color-on-dark)' : 'var(--color-on-dark-ghost)',
                  transition: 'width 400ms cubic-bezier(0.16,1,0.3,1), background 250ms ease',
                }}
              />
            </button>
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
            e.currentTarget.style.color = 'var(--color-on-dark)'
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
            e.currentTarget.style.color = 'var(--color-on-dark)'
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

      {/* ── Scroll hint ───────────────────────────────────────── */}
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
        tabIndex={0}
        aria-label="Service panels — use arrow keys to navigate"
        onKeyDown={onKeyDown}
        style={{
          display: 'flex',
          overflowX: reduced ? 'auto' : 'scroll',
          scrollSnapType: reduced ? 'none' : 'x mandatory',
          height: '100dvh',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          outline: 'none',
        } as React.CSSProperties}
      >
        {services.map((service, i) => (
          <div
            key={service.number}
            ref={(el) => { panelRefs.current[i] = el }}
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
            {/* Work sample image — right side */}
            <div
              aria-hidden="true"
              style={{ position: 'absolute', top: 0, right: 0, width: '52%', height: '100%', pointerEvents: 'none' }}
            >
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                priority={i === 0}
                sizes="52vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--color-void) 0%, rgba(8,8,9,0.55) 25%, rgba(8,8,9,0.15) 55%, transparent 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--color-void) 0%, rgba(8,8,9,0.30) 30%, transparent 58%)' }} />
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
              animate={animatedPanels.has(i) ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease }}
            >
              {service.title}
            </motion.h2>

            {/* Bottom row: description + deliverables/process + CTA */}
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
                  style={{ color: 'rgba(255,255,255,0.90)', margin: 0, maxWidth: '520px', lineHeight: 1.8 }}
                  animate={animatedPanels.has(i) ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.65, ease, delay: 0.08 }}
                >
                  {service.description}
                </motion.p>

                <motion.div
                  style={{ minWidth: '220px', maxWidth: '300px' }}
                  animate={animatedPanels.has(i) ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.65, ease, delay: 0.14 }}
                >
                  {/* Tab switcher */}
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                    {(['deliverables', 'process'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTabs(prev => ({ ...prev, [i]: tab }))}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          padding: '0 0 6px',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.5625rem',
                          fontWeight: 400,
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: getTab(i) === tab ? 'var(--color-on-dark)' : 'var(--color-on-dark-faint)',
                          borderBottom: getTab(i) === tab ? '1px solid var(--color-on-dark)' : '1px solid transparent',
                          transition: 'color 200ms ease, border-color 200ms ease',
                        }}
                      >
                        {tab === 'deliverables' ? 'Deliverables' : 'Process'}
                      </button>
                    ))}
                  </div>

                  {/* Tab content */}
                  <AnimatePresence mode="wait">
                    <motion.ul
                      key={`${i}-${getTab(i)}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      style={{ margin: '0 0 14px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}
                    >
                      {getTab(i) === 'deliverables' ? (
                        service.deliverables.map((item) => (
                          <li
                            key={item}
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.875rem',
                              color: 'rgba(255,255,255,0.80)',
                              padding: '9px 0',
                              borderTop: '0.5px solid rgba(255,255,255,0.08)',
                              lineHeight: 1.5,
                            }}
                          >
                            {item}
                          </li>
                        ))
                      ) : (
                        service.process.map((step, si) => (
                          <li key={step.title} style={{ padding: '0 0 11px' }}>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                              <span style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '0.6875rem',
                                color: 'rgba(255,255,255,0.22)',
                                flexShrink: 0,
                                lineHeight: 1.6,
                                letterSpacing: '0.02em',
                                minWidth: '20px',
                              }}>
                                {String(si + 1).padStart(2, '0')}
                              </span>
                              <div>
                                <p style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '0.875rem',
                                  fontWeight: 500,
                                  color: 'rgba(255,255,255,0.90)',
                                  margin: '0 0 2px',
                                  lineHeight: 1.4,
                                }}>{step.title}</p>
                                <p style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '0.8125rem',
                                  color: 'rgba(255,255,255,0.48)',
                                  margin: 0,
                                  lineHeight: 1.5,
                                }}>{step.detail}</p>
                              </div>
                            </div>
                          </li>
                        ))
                      )}
                    </motion.ul>
                  </AnimatePresence>

                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.62)', margin: 0, letterSpacing: '0.04em' }}>
                    Timeline: {service.timeline}
                  </p>
                </motion.div>
              </div>

              {/* Navigation row */}
              <motion.div
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                animate={animatedPanels.has(i) ? { opacity: 1 } : { opacity: 0 }}
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
                      e.currentTarget.style.color = 'var(--color-on-dark)'
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
                      background: 'var(--color-on-dark)',
                      border: '1px solid rgba(255,255,255,0.20)',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '13px 24px',
                      color: 'var(--color-canvas)',
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

      {/* ══════════════════════════════════════════════════════════
          THE PROCESS
      ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: 'var(--color-void)',
          borderTop: '0.5px solid var(--color-dark-border)',
          padding: 'clamp(72px, 9vw, 120px) var(--section-pad-x)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            style={{ marginBottom: 'clamp(48px, 6vw, 80px)' }}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            viewport={{ once: true, margin: '-60px' }}
          >
            <ScrambleEyebrow style={{ color: 'var(--color-on-dark-faint)', display: 'block', marginBottom: '20px' }}>
              HOW IT WORKS
            </ScrambleEyebrow>
            <h2
              className="type-h1"
              style={{ color: 'var(--color-on-dark)', margin: 0, maxWidth: '560px' }}
            >
              Every engagement follows the same five phases.
            </h2>
          </motion.div>

          {/* 5-phase grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
              gap: '0',
              borderTop: '0.5px solid var(--color-dark-border)',
            }}
          >
            {PROCESS_PHASES.map((phase, i) => (
              <motion.div
                key={phase.number}
                style={{
                  padding: 'clamp(28px, 3.5vw, 40px) clamp(20px, 2.5vw, 32px)',
                  borderRight: i < PROCESS_PHASES.length - 1 ? '0.5px solid var(--color-dark-border)' : 'none',
                  borderBottom: '0.5px solid var(--color-dark-border)',
                }}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease, delay: i * 0.07 }}
                viewport={{ once: true, margin: '-40px' }}
              >
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                    fontWeight: 300,
                    lineHeight: 1,
                    color: 'rgba(255,255,255,0.28)',
                    letterSpacing: '-0.03em',
                    marginBottom: '20px',
                  }}
                >
                  {phase.number}
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1rem, 1.4vw, 1.1875rem)',
                    fontWeight: 400,
                    color: 'var(--color-on-dark)',
                    margin: '0 0 12px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {phase.name}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.55)',
                    margin: 0,
                  }}
                >
                  {phase.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Narrative Architecture callout */}
          <motion.div
            style={{
              marginTop: 'clamp(40px, 5vw, 60px)',
              padding: 'clamp(24px, 3vw, 36px)',
              border: '0.5px solid rgba(255,255,255,0.10)',
              borderRadius: '2px',
              background: 'rgba(255,255,255,0.03)',
            }}
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            viewport={{ once: true, margin: '-40px' }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.5625rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-on-dark-faint)', margin: '0 0 12px' }}>
              What is Narrative Architecture?
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                fontWeight: 400,
                lineHeight: 1.5,
                color: 'rgba(255,255,255,0.80)',
                margin: 0,
                maxWidth: '760px',
                letterSpacing: '-0.01em',
              }}
            >
              It&apos;s the invisible structure that makes a presentation feel inevitable rather than assembled.
              Before any design begins, we define who&apos;s in the room, what they believe right now, what stands between
              them and a yes, and what the single most important thing they need to leave with is.
              Every slide that follows serves that map. Or it doesn&apos;t make the cut.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FAQs
      ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: 'rgba(255,255,255,0.025)',
          borderTop: '0.5px solid var(--color-dark-border)',
          padding: 'clamp(72px, 9vw, 120px) var(--section-pad-x)',
        }}
      >
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <motion.div
            style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            viewport={{ once: true, margin: '-60px' }}
          >
            <ScrambleEyebrow style={{ color: 'var(--color-on-dark-faint)', display: 'block', marginBottom: '20px' }}>
              COMMON QUESTIONS
            </ScrambleEyebrow>
            <h2 className="type-h1" style={{ color: 'var(--color-on-dark)', margin: 0 }}>
              Before you ask.
            </h2>
          </motion.div>

          <div style={{ borderTop: '0.5px solid var(--color-dark-border)' }}>
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                style={{ borderBottom: '0.5px solid var(--color-dark-border)' }}
                initial={reduced ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.55, ease, delay: i * 0.04 }}
                viewport={{ once: true, margin: '-20px' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    padding: 'clamp(20px, 2.5vw, 28px) 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '24px',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1rem, 1.5vw, 1.1875rem)',
                      fontWeight: 400,
                      color: openFaq === i ? 'var(--color-on-dark)' : 'rgba(255,255,255,0.75)',
                      letterSpacing: '-0.01em',
                      transition: 'color 200ms ease',
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      width: '28px',
                      height: '28px',
                      border: '0.5px solid rgba(255,255,255,0.20)',
                      borderRadius: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255,255,255,0.55)',
                      fontSize: '1rem',
                      fontWeight: 300,
                      transition: 'transform 300ms ease, border-color 200ms ease',
                      transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                          lineHeight: 1.75,
                          color: 'rgba(255,255,255,0.60)',
                          margin: '0 0 clamp(20px, 2.5vw, 28px)',
                          paddingRight: '52px',
                        }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          NOT A FIT
      ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: 'var(--color-void)',
          borderTop: '0.5px solid var(--color-dark-border)',
          padding: 'clamp(72px, 9vw, 120px) var(--section-pad-x)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            viewport={{ once: true, margin: '-60px' }}
          >
            <ScrambleEyebrow style={{ color: 'var(--color-on-dark-faint)', display: 'block', marginBottom: '28px' }}>
              WORTH SAYING
            </ScrambleEyebrow>
            <h2
              className="type-h1"
              style={{
                color: 'var(--color-on-dark)',
                margin: '0 0 clamp(24px, 3vw, 36px)',
                maxWidth: '720px',
              }}
            >
              Not the right fit for everyone.
            </h2>
            <p
              className="type-body-lg"
              style={{
                color: 'rgba(255,255,255,0.60)',
                margin: '0 0 clamp(20px, 2.5vw, 28px)',
                maxWidth: '640px',
                lineHeight: 1.8,
              }}
            >
              I take on a limited number of projects each quarter, which means I can afford to be selective.
              I&apos;m not the right choice if you need a deck in 48 hours, want unlimited revision rounds,
              or are looking for a template someone else designed.
            </p>
            <p
              className="type-body-lg"
              style={{
                color: 'rgba(255,255,255,0.60)',
                margin: '0 0 clamp(32px, 4vw, 48px)',
                maxWidth: '640px',
                lineHeight: 1.8,
              }}
            >
              But if you&apos;re walking into a room where it matters, and you want someone who takes
              your story as seriously as you do, let&apos;s talk.
            </p>
            <a
              href={links.calendly || '/contact'}
              target={links.calendly ? '_blank' : undefined}
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: 400,
                letterSpacing: '0.04em',
                color: 'var(--color-on-dark)',
                borderBottom: '0.5px solid rgba(255,255,255,0.35)',
                paddingBottom: '3px',
                textDecoration: 'none',
                transition: 'border-color 200ms ease, opacity 200ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              Book a call →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom CTA section ────────────────────────────────── */}
      <section
        style={{
          background: 'var(--color-void)',
          padding: 'clamp(80px, 10vw, 140px) var(--section-pad-x)',
          borderTop: '0.5px solid var(--color-dark-border)',
          textAlign: 'center',
        }}
      >
        <ScrambleEyebrow style={{ marginBottom: '24px', display: 'block' }}>READY TO START?</ScrambleEyebrow>
        <h2 className="type-h1" style={{ color: 'var(--color-on-dark)', margin: '0 auto 32px', maxWidth: '600px' }}>
          Let&apos;s talk about what you&apos;re trying to change.
        </h2>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={links.calendly} className="btn-primary" style={{ background: 'var(--color-on-dark)', color: 'var(--color-canvas)' }}>Book a Free Call</a>
          <Link href="/work" className="btn-ghost" style={{ color: 'var(--color-on-dark)', borderColor: 'rgba(255,255,255,0.25)' }}>See the Work</Link>
        </div>
      </section>

    </main>
  )
}
