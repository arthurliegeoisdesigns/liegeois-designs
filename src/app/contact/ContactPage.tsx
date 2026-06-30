'use client'

import { useActionState, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Script from 'next/script'
import { sendContactForm, type ContactFormState } from './actions'
import { links } from '@/lib/config'
import { ScrambleEyebrow } from '@/components/ui/ScrambleEyebrow'

const projectTypes = [
  'Presentation Design',
  'Pitch Deck',
  'Brand Narrative',
  'Event Keynote',
  'Workshop / Training',
  'Strategic Consulting',
  'Other',
]

const timelines = [
  'ASAP (under 2 weeks)',
  '1 – 2 months',
  '3 months+',
  'Ongoing retainer',
  'Not sure yet',
]

const budgets = [
  'Under $2,000',
  '$2,000 – $5,000',
  '$5,000 – $15,000',
  '$15,000+',
  "Let's discuss",
]

const steps = [
  {
    num: '01',
    title: 'I read everything.',
    body: 'Every brief gets my full attention. No skim-reads, no templated replies.',
  },
  {
    num: '02',
    title: 'You hear back within 48 hours.',
    body: 'A real response — not a bot, not a VA. Just me.',
  },
  {
    num: '03',
    title: 'We talk if it fits.',
    body: "A 30-minute call to make sure the project, timeline, and chemistry are right.",
  },
]

const initialState: ContactFormState = { status: 'idle' }

export default function ContactPage() {
  const reduced = useReducedMotion()
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, isPending] = useActionState(sendContactForm, initialState)

  return (
    <main style={{ background: 'var(--color-paper)', minHeight: '100vh' }}>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        className="section"
        style={{ paddingTop: 'calc(80px + clamp(48px, 8vw, 96px))', paddingBottom: 'clamp(48px, 6vw, 80px)' }}
      >
        <div className="container">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <ScrambleEyebrow style={{ color: 'var(--color-text-muted)' }}>LET&apos;S TALK</ScrambleEyebrow>
            <h1
              className="type-display"
              style={{ color: 'var(--color-text-primary)', margin: '24px 0 24px', maxWidth: '760px' }}
            >
              Tell me what you&apos;re building.
            </h1>
            <p
              className="type-body-lg"
              style={{ color: 'var(--color-text-secondary)', maxWidth: '560px', margin: 0 }}
            >
              I take on a limited number of projects each quarter. If what you&apos;re working on
              is worth doing, let&apos;s find out if we&apos;re the right fit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FORM + SIDEBAR ────────────────────────────────────────── */}
      <section
        className="section"
        style={{
          borderTop: '0.5px solid var(--color-border)',
          paddingTop: 'clamp(48px, 6vw, 80px)',
        }}
      >
        <div className="container">
          <div className="contact-grid">

            {/* ── LEFT: FORM ── */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              {state.status === 'success' ? (
                <div className="contact-success">
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      border: '1.5px solid var(--color-text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '28px',
                      color: 'var(--color-text-secondary)',
                      fontSize: '1.375rem',
                    }}
                  >
                    ✓
                  </div>
                  <h2 className="type-h1" style={{ color: 'var(--color-text-primary)', margin: '0 0 16px' }}>
                    Got it, {state.name}.
                  </h2>
                  <p className="type-body-lg" style={{ color: 'var(--color-text-secondary)', margin: '0 0 36px' }}>
                    I&apos;ll read your brief carefully and get back to you within 48 hours.
                    In the meantime, feel free to explore the work.
                  </p>
                  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                    <Link href="/work" className="btn-primary">View the Work</Link>
                    <Link href="/" className="btn-ghost">Back to Home</Link>
                  </div>
                </div>
              ) : (
                <form ref={formRef} action={formAction} noValidate>
                  <div className="contact-form">

                    {/* Row 1: Name + Company */}
                    <div className="contact-row">
                      <div className="contact-field">
                        <label className="contact-label" htmlFor="name">
                          Name <span style={{ color: 'var(--color-text-muted)' }}>*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Arthur Liégeois"
                          required
                          className="contact-input"
                        />
                      </div>
                      <div className="contact-field">
                        <label className="contact-label" htmlFor="company">
                          Company
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          autoComplete="organization"
                          placeholder="Liégeois Designs"
                          className="contact-input"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="contact-field">
                      <label className="contact-label" htmlFor="email">
                        Email <span style={{ color: 'var(--color-text-muted)' }}>*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        required
                        className="contact-input"
                      />
                    </div>

                    {/* Row 2: Project type + Timeline */}
                    <div className="contact-row">
                      <div className="contact-field">
                        <label className="contact-label" htmlFor="projectType">
                          Project Type
                        </label>
                        <select id="projectType" name="projectType" className="contact-input contact-select">
                          <option value="">Select one…</option>
                          {projectTypes.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div className="contact-field">
                        <label className="contact-label" htmlFor="timeline">
                          Timeline
                        </label>
                        <select id="timeline" name="timeline" className="contact-input contact-select">
                          <option value="">Select one…</option>
                          {timelines.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="contact-field">
                      <label className="contact-label" htmlFor="budget">
                        Budget Range
                      </label>
                      <select id="budget" name="budget" className="contact-input contact-select">
                        <option value="">Select one…</option>
                        {budgets.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="contact-field">
                      <label className="contact-label" htmlFor="message">
                        Tell me about the project <span style={{ color: 'var(--color-text-muted)' }}>*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        placeholder="What are you building, what's the goal, and what makes this one worth getting right?"
                        required
                        className="contact-input contact-textarea"
                      />
                    </div>

                    {/* Error state */}
                    {state.status === 'error' && (
                      <p
                        role="alert"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.8125rem',
                          color: '#a3423a',
                          margin: '0 0 4px',
                        }}
                      >
                        {state.message}
                      </p>
                    )}

                    {/* Submit */}
                    <button type="submit" disabled={isPending} className="contact-submit">
                      {isPending ? 'Sending…' : 'Send Brief →'}
                    </button>

                  </div>
                </form>
              )}
            </motion.div>

            {/* ── RIGHT: SIDEBAR ── */}
            <motion.div
              className="contact-sidebar"
              initial={reduced ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
            >
              {/* What happens next */}
              <div style={{ marginBottom: '48px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.625rem',
                    letterSpacing: '0.16em',
                    color: 'var(--color-text-muted)',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '28px',
                  }}
                >
                  WHAT HAPPENS NEXT
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  {steps.map((step) => (
                    <div key={step.num} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.8125rem',
                          fontWeight: 400,
                          color: 'var(--color-text-muted)',
                          flexShrink: 0,
                          lineHeight: 1.6,
                          letterSpacing: '0.04em',
                        }}
                      >
                        {step.num}
                      </span>
                      <div>
                        <p className="type-h3" style={{ color: 'var(--color-text-primary)', margin: '0 0 4px' }}>
                          {step.title}
                        </p>
                        <p className="type-body" style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                          {step.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: '0.5px solid var(--color-border)', paddingTop: '36px', marginBottom: '36px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.625rem',
                    letterSpacing: '0.16em',
                    color: 'var(--color-text-muted)',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '16px',
                  }}
                >
                  PREFER A CALL?
                </span>
                <p className="type-body" style={{ color: 'var(--color-text-secondary)', margin: '0 0 20px' }}>
                  Skip the form. Book a 30-minute intro call directly.
                </p>
                <a
                  href={links.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ display: 'inline-block' }}
                >
                  Book a Call ↗
                </a>
              </div>

              {/* Divider + Connect */}
              <div style={{ borderTop: '0.5px solid var(--color-border)', paddingTop: '36px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.625rem',
                    letterSpacing: '0.16em',
                    color: 'var(--color-text-muted)',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '16px',
                  }}
                >
                  OR FIND ME HERE
                </span>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                    style={{ fontSize: '0.8125rem' }}
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href={`mailto:arthur@liegeoisdesigns.com`}
                    className="btn-ghost"
                    style={{ fontSize: '0.8125rem' }}
                  >
                    Email ↗
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── CALENDLY EMBED ───────────────────────────────────────── */}
      <section
        className="section"
        style={{ borderTop: '0.5px solid var(--color-border)', paddingTop: 'clamp(48px, 6vw, 80px)', paddingBottom: 0 }}
      >
        <div className="container">
          <motion.div
            style={{ marginBottom: '40px' }}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-60px' }}
          >
            <ScrambleEyebrow style={{ color: 'var(--color-text-muted)' }}>PREFER A CALL?</ScrambleEyebrow>
            <h2 className="type-h1" style={{ color: 'var(--color-text-primary)', margin: '0', maxWidth: '500px' }}>
              Book 30 minutes directly.
            </h2>
          </motion.div>
        </div>
        <div
          className="calendly-inline-widget"
          data-url={links.calendly}
          style={{ minWidth: '320px', height: '700px', border: 'none' }}
        />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </section>

      {/* ── PULL QUOTE ────────────────────────────────────────────── */}
      <section
        className="section"
        style={{ borderTop: '0.5px solid var(--color-border)', background: 'var(--color-card-bg)' }}
      >
        <div className="container">
          <motion.div
            style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-60px' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.375rem, 3vw, 2.25rem)',
                fontWeight: 400,
                color: 'var(--color-text-primary)',
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
                margin: '0 0 24px',
              }}
            >
              &ldquo;I don&apos;t take every project. I take the ones where I know I can make
              a difference — and where the client is ready to let me.&rdquo;
            </p>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                color: 'var(--color-text-secondary)',
                textTransform: 'uppercase',
              }}
            >
              Arthur Liégeois — Founder, Liégeois Designs
            </span>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
