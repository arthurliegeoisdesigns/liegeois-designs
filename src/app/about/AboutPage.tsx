'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { links } from '@/lib/config'
import { ScrambleEyebrow } from '@/components/ui/ScrambleEyebrow'

const PORTRAIT =
  'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs/webflow/portrait-arthur-liegeois-2-3-7854f9'

const pillars = [
  {
    label: 'Strategic Thinking',
    title: 'I deconstruct before I design.',
    body: 'Better questions, fewer assumptions. Every decision is rooted in clarity, intent, and business goals. The aesthetics follow the logic.',
  },
  {
    label: 'Voice',
    title: 'Every brand has something to say. I make sure it lands.',
    body: 'From naming a company to rewriting slide 37, I obsess over tone, language, and consistency. How you say it is the brand.',
  },
  {
    label: 'Energy',
    title: 'Clients call it momentum. I call it normal.',
    body: 'Fast, strategic, all-in from the first call. I take feedback seriously, and push back when I see a smarter move.',
  },
]

const skills = [
  {
    title: 'Story-First Thinking',
    body: 'Narrative before deliverables. Meaning drives the design, not the other way around.',
  },
  {
    title: 'Systems Thinking',
    body: 'Connecting dots across silos, turning complexity into coherence.',
  },
  {
    title: 'Strategic Empathy',
    body: 'Designing for people, not personas. Business intelligence meets emotional intelligence.',
  },
  {
    title: 'High-Velocity Execution',
    body: 'Fast and precise. Ideas to life with urgency and craft in equal measure.',
  },
  {
    title: 'Radical Ownership',
    body: 'Responsible for outcomes, not just tasks. Clarity and reliability, without the hand-holding.',
  },
  {
    title: 'Challenger Mindset',
    body: 'Questioning defaults to unlock better outcomes, with tact, rigor, and zero ego.',
  },
]

const stats = [
  { num: '5', label: 'Countries lived and worked in' },
  { num: '15+', label: 'Years of design practice' },
  { num: '3', label: 'Companies founded or co-founded' },
]

export default function AboutPage() {
  const reduced = useReducedMotion()

  return (
    <main style={{ background: 'var(--color-dark)', minHeight: '100vh' }}>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        className="section section-dark"
        style={{ paddingTop: 'calc(80px + clamp(48px, 8vw, 96px))' }}
      >
        <div className="container">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <ScrambleEyebrow style={{ color: 'var(--color-text-secondary)' }}>ABOUT</ScrambleEyebrow>
            <h1
              className="type-display"
              style={{ color: 'var(--color-text-primary)', margin: '24px 0 40px', maxWidth: '820px' }}
            >
              The Story Behind the Storyteller
            </h1>
          </motion.div>

          <motion.div
            className="about-hero-grid"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          >
            <p className="type-body-lg" style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
              Founder. Strategist. Designer. I've worked in five countries, built brands at Apple
              and Oracle, and launched a startup from scratch, all to answer one question: how
              do you turn a complex idea into something people actually feel?
            </p>
            <div className="about-hero-ctas">
              <a
                href={links.calendly}
                className="btn-primary"
              >
                Start a Project
              </a>
              <Link href="/work" className="btn-ghost">View Work</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PILLARS ───────────────────────────────────────────────── */}
      <section
        className="section section-dark"
        style={{
          borderTop: '0.5px solid var(--color-dark-border)',
          paddingTop: '72px',
          paddingBottom: '72px',
        }}
      >
        <div className="container">
          <motion.div
            className="about-pillars"
            variants={reduced ? undefined : {
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
            }}
            initial={reduced ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {pillars.map((p, i) => (
              <motion.div
                key={p.label}
                className="about-pillar-item"
                style={{ borderLeft: i > 0 ? '0.5px solid var(--color-dark-border)' : 'none' }}
                variants={reduced ? undefined : {
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.625rem',
                    letterSpacing: '0.16em',
                    color: 'var(--color-on-dark-muted)',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '24px',
                  }}
                >
                  {p.label}
                </span>
                <h2 className="type-h2" style={{ color: 'var(--color-text-primary)', margin: '0 0 16px' }}>
                  {p.title}
                </h2>
                <p className="type-body" style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                  {p.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── JOURNEY ───────────────────────────────────────────────── */}
      <section
        className="section section-dark section-surface"
        style={{ borderTop: '0.5px solid var(--color-dark-border)' }}
      >
        <div className="container">
          <div className="about-journey-grid">

            {/* Left — eyebrow + stat figures */}
            <motion.div
              initial={reduced ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-60px' }}
            >
              <ScrambleEyebrow style={{ color: 'var(--color-text-secondary)', display: 'block', marginBottom: '56px' }}>
                THE JOURNEY
              </ScrambleEyebrow>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
                {stats.map(({ num, label }) => (
                  <div key={label}>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
                        fontWeight: 300,
                        color: 'var(--color-on-dark-muted)',
                        margin: '0 0 4px',
                        lineHeight: 1,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {num}
                    </p>
                    <p className="type-caption" style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — narrative */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              viewport={{ once: true, margin: '-60px' }}
            >
              <h2 className="type-h1" style={{ color: 'var(--color-text-primary)', margin: '0 0 32px' }}>
                Five countries. One discipline.
              </h2>
              <p className="type-body-lg" style={{ color: 'var(--color-text-secondary)', margin: '0 0 24px' }}>
                I didn&apos;t fall into visual storytelling. I earned it, working across Europe and
                North America, building brands at Apple, Oracle, and Smartbox, then launching
                Norigami in London from scratch: no blueprint, no funding, just guts, vision,
                and design firepower.
              </p>
              <p className="type-body" style={{ color: 'var(--color-text-secondary)', margin: '0 0 24px' }}>
                Along the way, I partnered with IBM, Marriott, Ogilvy, J&amp;J, and Philips,
                pulling global best practices into creative work that actually moves the needle.
              </p>
              <p className="type-body" style={{ color: 'var(--color-text-secondary)', margin: '0 0 36px' }}>
                Here&apos;s how I work: I listen. Really listen: to what you say and what you
                don&apos;t. I take feedback seriously, and I&apos;ll push back when I know there&apos;s a
                smarter move. The goal isn&apos;t to please you in the moment. It&apos;s to make the
                work impossible to ignore once it&apos;s out in the world.
              </p>
              <p
                className="type-body"
                style={{
                  color: 'var(--color-on-dark-hint)',
                  margin: 0,
                }}
              >
                I use AI as fuel, not a crutch. I prompt, refine, and push until it bends to my
                vision. Not faster or cheaper. <em style={{ fontStyle: 'italic' }}>Just a higher bar.</em>
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── SKILLS ────────────────────────────────────────────────── */}
      <section
        className="section section-dark"
        style={{ borderTop: '0.5px solid var(--color-dark-border)' }}
      >
        <div className="container">
          <motion.h2
            className="type-h1"
            style={{ color: 'var(--color-text-primary)', margin: '0 0 56px', maxWidth: '500px' }}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-60px' }}
          >
            The skills that make it possible.
          </motion.h2>

          <motion.div
            className="about-skills-grid"
            variants={reduced ? undefined : {
              hidden: {},
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
            }}
            initial={reduced ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {skills.map((skill, i) => (
              <motion.div
                key={skill.title}
                className="about-skill-item"
                style={{
                  paddingRight: i % 2 === 0 ? '40px' : '0',
                  paddingLeft: i % 2 === 1 ? '40px' : '0',
                }}
                variants={reduced ? undefined : {
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                <p className="type-h3" style={{ color: 'var(--color-text-primary)', margin: '0 0 8px' }}>
                  {skill.title}
                </p>
                <p className="type-body" style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                  {skill.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW I WORK ────────────────────────────────────────────── */}
      <section
        className="section section-dark section-surface"
        style={{ borderTop: '0.5px solid var(--color-dark-border)' }}
      >
        <div className="container">
          <motion.p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.625rem',
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--color-on-dark-faint)',
              margin: '0 0 clamp(40px, 5vw, 56px)',
            }}
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            How I work
          </motion.p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
            borderTop: '0.5px solid var(--color-dark-border)',
            paddingTop: 'clamp(36px, 4.5vw, 56px)',
          }}>
            {[
              {
                label: 'Process',
                headline: 'I start from blank slides.',
                body: "Every project is built from scratch. Before I open a single deck, I dig into your business, challenge your narrative, and sharpen the message. Sometimes I question the model itself. If the story has a gap, I'll find it. Because a beautiful deck on a fragile argument is still a loss in the room.",
              },
              {
                label: 'Craft',
                headline: 'What I deliver is presentation-day ready.',
                body: 'No typos. No animation misfire. No placeholder that slipped through. I am thorough by nature: every build is tested, every timing is intentional, every transition earns its place. When the deck leaves my hands, it can stand in front of anyone, on any day, without a last-minute panic.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              >
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.5625rem',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  margin: '0 0 16px',
                }}>
                  {item.label}
                </p>
                <h3 className="type-h2" style={{ color: 'var(--color-text-primary)', margin: '0 0 16px' }}>
                  {item.headline}
                </h3>
                <p className="type-body" style={{ color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.7 }}>
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOOLS ─────────────────────────────────────────────────── */}
      <section
        className="section section-dark"
        style={{ borderTop: '0.5px solid var(--color-dark-border)' }}
      >
        <div className="container">
          <motion.p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.625rem',
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--color-on-dark-faint)',
              margin: '0 0 clamp(40px, 5vw, 56px)',
            }}
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Built in
          </motion.p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            borderTop: '0.5px solid var(--color-dark-border)',
          }}>
            {[
              {
                tool: 'Keynote',
                level: 'Primary',
                note: 'Where I do my most demanding work. Apple brought me to Cupertino to design for their top executive audiences; the precision of animation, timing, and visual language that Keynote enables is unmatched for high-stakes storytelling.',
              },
              {
                tool: 'PowerPoint',
                level: 'Expert',
                note: 'A decade of enterprise-grade work: fully interactive decks, complex animation builds, touch-wall formats, and editable templates that live in clients\' hands long after delivery. The industry standard, and I know every corner of it.',
              },
              {
                tool: 'Figma Slides',
                level: 'Fluent',
                note: 'Ideal for visually rich static decks where the design system already lives in Figma. Excellent for pitch decks and collaboration. Not built for complex animation; I reach for it when the visual craft matters more than motion.',
              },
              {
                tool: 'Google Slides',
                level: 'Functional',
                note: 'Used when large enterprise clients require it. Capable of clean, on-brand work, but too constrained for the immersive animated experiences I typically design. I make it work; I just don\'t prefer it.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.tool}
                style={{
                  padding: 'clamp(28px, 3.5vw, 44px) clamp(0px, 0vw, 0px)',
                  paddingRight: 'clamp(20px, 3vw, 36px)',
                  paddingLeft: i > 0 ? 'clamp(20px, 3vw, 36px)' : '0',
                  borderLeft: i > 0 ? '0.5px solid var(--color-dark-border)' : 'none',
                }}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: '12px',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                }}>
                  <p
                    className="type-h3"
                    style={{ color: 'var(--color-on-dark)', margin: 0 }}
                  >
                    {item.tool}
                  </p>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.5625rem',
                    fontWeight: 500,
                    letterSpacing: '0.13em',
                    textTransform: 'uppercase',
                    color: item.level === 'Primary' ? 'var(--color-accent)'
                         : item.level === 'Expert'   ? 'rgba(255,255,255,0.50)'
                         : 'rgba(255,255,255,0.30)',
                    flexShrink: 0,
                  }}>
                    {item.level}
                  </span>
                </div>
                <p
                  className="type-body"
                  style={{ color: 'rgba(255,255,255,0.45)', margin: 0, fontSize: '0.875rem', lineHeight: 1.65 }}
                >
                  {item.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTRAIT + CTA ────────────────────────────────────────── */}
      <section
        className="section section-dark section-surface"
        style={{ borderTop: '0.5px solid var(--color-dark-border)', overflow: 'hidden' }}
      >
        <div className="container">
          <div className="about-cta-grid">

            {/* Left — personal aside + CTA */}
            <motion.div
              initial={reduced ? false : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-60px' }}
            >
              <ScrambleEyebrow style={{ color: 'var(--color-text-secondary)', display: 'block', marginBottom: '20px' }}>
                WHEN I&apos;M NOT DESIGNING
              </ScrambleEyebrow>
              <p className="type-body" style={{ color: 'var(--color-text-secondary)', margin: '0 0 48px' }}>
                Kitesurfing. Jazz-funk on a keyboard. Cooking things that have no business
                taking that long. Shaping wood into something useful. Or not. Getting
                lost in cities I&apos;ve never been to.
              </p>

              <div style={{ borderTop: '0.5px solid var(--color-dark-border)', paddingTop: '44px' }}>
                <h2
                  className="type-h1"
                  style={{ color: 'var(--color-text-primary)', margin: '0 0 20px', maxWidth: '440px' }}
                >
                  The work only works when the chemistry does.
                </h2>
                <p
                  className="type-body"
                  style={{ color: 'var(--color-text-secondary)', margin: '0 0 36px', maxWidth: '400px' }}
                >
                  Looking for a creative partner who&apos;s strategic, collaborative, and not afraid
                  to push? Let&apos;s find out if we&apos;re the right fit.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                  <a
                    href={links.calendly}
                    className="btn-primary"
                  >
                    Start a Project
                  </a>
                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right — portrait */}
            <motion.div
              style={{
                position: 'relative',
                aspectRatio: '3 / 4',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
              }}
              initial={reduced ? false : { opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              viewport={{ once: true, margin: '-60px' }}
            >
              <Image
                src={PORTRAIT}
                alt="Portrait of Arthur Liégeois"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  )
}
