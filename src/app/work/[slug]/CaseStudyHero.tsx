'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import type { CaseStudy } from '@/content/types'

const ease = [0.16, 1, 0.3, 1] as const

export default function CaseStudyHero({
  cs,
  index,
  total,
}: {
  cs: CaseStudy
  index: number
  total: number
}) {
  const reduced  = useReducedMotion()
  const heroRef  = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Parallax only on static image; video stays fixed (no GPU thrash)
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])

  const toggleMute = () => {
    if (!videoRef.current) return
    const next = !muted
    videoRef.current.muted = next
    setMuted(next)
  }

  const hasVideo = !!cs.video

  return (
    <>
      {/* ── Hero media (video OR parallax image) ── */}
      <div
        ref={heroRef}
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(380px, 72vh, 800px)',
          overflow: 'hidden',
          background: '#0A0A0A',
        }}
      >
        {hasVideo ? (
          /* ── Video hero ── */
          <video
            ref={videoRef}
            src={cs.video}
            poster={cs.images[0]}
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        ) : (
          /* ── Static image with parallax ── */
          <motion.div
            style={{
              position: 'absolute',
              inset: '-15% 0',
              y: reduced ? 0 : imageY,
            }}
          >
            <Image
              src={cs.images[0]}
              alt={`${cs.client} — ${cs.project}`}
              fill
              priority
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              sizes="100vw"
            />
          </motion.div>
        )}

        {/* Bottom fade to dark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(10,9,9,0.15) 0%, transparent 40%, var(--color-dark) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Top nav bar */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            padding: '24px var(--section-pad-x)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 10,
          }}
        >
          <motion.a
            href="/work"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              color: 'rgba(255,255,255,0.65)',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
          >
            ← All Work
          </motion.a>
          <motion.span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6875rem',
              fontWeight: 400,
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.40)',
              textTransform: 'uppercase',
            }}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {index + 1} / {total}
          </motion.span>
        </div>

        {/* Sound toggle — only shown when video is present */}
        {hasVideo && (
          <motion.button
            onClick={toggleMute}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{
              position: 'absolute',
              bottom: '24px',
              right: 'var(--section-pad-x)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'rgba(10,10,10,0.55)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '0.5px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.8)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'background 200ms ease, color 200ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
              e.currentTarget.style.color = '#ffffff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(10,10,10,0.55)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
            }}
          >
            {/* Speaker icon — inline SVG, no dependency */}
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              {muted ? (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </>
              ) : (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </>
              )}
            </svg>
            {muted ? 'Sound off' : 'Sound on'}
          </motion.button>
        )}
      </div>

      {/* ── Project header ── */}
      <section style={{ padding: 'clamp(40px, 5vw, 64px) var(--section-pad-x) 0' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>

          {/* Eyebrow chips */}
          <motion.div
            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            {[cs.format, cs.industry, String(cs.year)].filter(Boolean).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6875rem',
                  fontWeight: 400,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '5px 14px',
                  border: '0.5px solid var(--color-on-dark-border)',
                  color: 'var(--color-on-dark-faint)',
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Client */}
          <motion.h1
            className="type-display"
            style={{ color: 'var(--color-on-dark)', margin: '0 0 14px', maxWidth: '760px' }}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.28 }}
          >
            {cs.client}
          </motion.h1>

          {/* Project title */}
          <motion.p
            className="type-h3"
            style={{ color: 'var(--color-on-dark-muted)', margin: '0 0 10px', fontWeight: 400 }}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.35 }}
          >
            {cs.project}
          </motion.p>

          {/* Agency credit */}
          {cs.agency && (
            <motion.p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--color-on-dark-faint)',
                margin: '0 0 32px',
                letterSpacing: '0.01em',
              }}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              In partnership with {cs.agency}
            </motion.p>
          )}

          {/* Summary / tagline */}
          <motion.p
            className="type-body-lg"
            style={{
              color: 'rgba(255,255,255,0.72)',
              margin: cs.agency ? '0' : '24px 0 0',
              maxWidth: '600px',
              lineHeight: 1.7,
            }}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.42 }}
          >
            {cs.summary || cs.tagline}
          </motion.p>
        </div>
      </section>
    </>
  )
}
