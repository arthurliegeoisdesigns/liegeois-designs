import Link from 'next/link'
import Image from 'next/image'
import { servicePages } from '@/content/services-pages'

/**
 * /services — the index (rewritten 15 Aug 2026).
 *
 * WHAT THIS REPLACED
 * A 1,075-line dark horizontal panel carousel: four full-bleed scenes with a
 * slide counter, prev/next arrows, DELIVERABLES/PROCESS tabs, a scroll hint and
 * a "next service" control. It duplicated every field already in
 * services-pages.ts and was the clearest example of the site doing motion where
 * it should have been doing content.
 *
 * WHY A SIGNPOST, NOT AN EXPERIENCE
 * This is what the nav points at, so it is the page most visitors reach. A
 * founder clicking "Services" already knows they want a pitch deck; the
 * carousel made them browse four options first. All the persuasion lives on the
 * four detail pages, which carry the deck-stack hero and the ServiceProof band.
 * This page's only job is to get them there in one click.
 *
 * Server component on purpose: pure content, zero JS, and it lands in the HTML
 * crawlers read. The previous version shipped framer-motion and a keyboard
 * navigation controller to render four links.
 *
 * Data comes from servicePages so the index can never drift from the detail
 * pages again, which is exactly how the old carousel ended up with its own copy.
 */

const FAQS = [
  {
    q: 'How long does a typical project take?',
    a: 'Pitch decks and executive presentations run 1–2 weeks. Sales decks and modular systems run 1–3 weeks. Strategic Narrative engagements run 2–4 weeks. Rush projects are possible with a surcharge; mention it in your brief.',
  },
  {
    q: 'What does it cost?',
    a: 'Engagements start at $5,000. Beyond that it depends on scope: a focused redesign of an existing narrative costs less than a full strategic build from scratch. After a 30-minute intake call you get a fixed quote, not an hourly meter.',
  },
  {
    q: 'What tools do you design in?',
    a: "Keynote first, given the choice, for the motion and build sequencing it allows. PowerPoint whenever your team has to own and edit the deck afterwards, and I know it inside out. Figma Slides where a design team is already living there. Google Slides only if you are locked to it.",
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

/* Spelled from servicePages.length rather than typed. The h1 read "Four ways
   in" for several hours after the fifth service shipped, which is the third
   hardcoded-count drift caught in one day (sitemap SERVICE_SLUGS, industry hub
   leads, this). If a number describes data, derive it. */
const COUNT_WORD = ['no', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight']

export default function ServicesPage() {
  const ways = COUNT_WORD[servicePages.length] ?? String(servicePages.length)
  return (
    <main style={{ background: 'var(--color-paper)', minHeight: '100vh' }}>
      {/* ── header ── */}
      <section
        style={{
          padding: 'calc(var(--nav-h, 80px) + clamp(48px, 7vw, 96px)) var(--section-pad-x) clamp(36px, 4.5vw, 60px)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p className="svc-idx-eyebrow">Services</p>
          <h1
            className="type-display"
            style={{ color: 'var(--color-text-primary)', margin: '0 0 22px', maxWidth: '17ch' }}
          >
            {ways} ways in. One method.
          </h1>
          <p
            className="type-body-lg"
            style={{ color: 'var(--color-text-secondary)', margin: 0, maxWidth: '54ch', lineHeight: 1.7 }}
          >
            Whatever the format, the work starts the same way: with the argument, not
            the slides. Structure first, design second. Always.
          </p>
        </div>
      </section>

      {/* ── the four, straight through ── */}
      <section style={{ padding: '0 var(--section-pad-x) clamp(56px, 7vw, 96px)' }}>
        <div className="svc-idx-grid">
          {servicePages.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="svc-idx-card">
              <div className="svc-idx-media">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(max-width: 860px) 92vw, 520px"
                  quality={68}
                  loading={i < 2 ? undefined : 'lazy'}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <p className="svc-idx-num">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="svc-idx-name">{s.name}</h2>
              <p className="svc-idx-tag">{s.tagline}</p>
              <p className="svc-idx-lead">{s.lead}</p>
              <p className="svc-idx-more">
                <span>{s.timeline}</span>
                <span className="svc-idx-arrow">Full details &rarr;</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── questions ── */}
      <section style={{ padding: '0 var(--section-pad-x) clamp(56px, 7vw, 96px)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <p className="svc-idx-eyebrow" style={{ marginBottom: '20px' }}>
            Questions, answered
          </p>
          {FAQS.map((f) => (
            <details key={f.q} style={{ borderBottom: '0.5px solid var(--color-border)', padding: '18px 0' }}>
              <summary
                className="type-body"
                style={{ color: 'var(--color-text-primary)', fontWeight: 500, cursor: 'pointer', listStyle: 'none' }}
              >
                {f.q}
              </summary>
              <p
                className="type-body"
                style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, margin: '14px 0 0' }}
              >
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{ padding: '0 var(--section-pad-x) clamp(80px, 10vw, 140px)', textAlign: 'center' }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 className="type-h1" style={{ color: 'var(--color-text-primary)', margin: '0 0 20px' }}>
            Ready when you are.
          </h2>
          <p className="type-body" style={{ color: 'var(--color-text-secondary)', margin: '0 0 32px' }}>
            A 30-minute intake call. No forms, no auto-responders, the project, the
            stakes, and whether there&apos;s a fit.
          </p>
          <Link href="/contact" className="btn-primary" style={{ display: 'inline-block' }}>
            Let&apos;s talk
          </Link>
        </div>
      </section>
    </main>
  )
}
