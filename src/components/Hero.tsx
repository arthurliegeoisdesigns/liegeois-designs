'use client'

import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TextScramble } from '@/components/ui/TextScramble'
import MagneticWrapper from '@/components/ui/MagneticWrapper'

const CDN = 'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs'

/* ── Work samples ────────────────────────────────────────────── */
const SLIDES = [
  {
    src: 'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdc74bd6bad20709672_683f46b683ae96a1c334fcb4_6830bafcc24aad0888102a9b_Fivestone%252520-%252520Chevron%2525201_1.jpeg',
    alt: 'Chevron presentation',
    client: 'Chevron',
  },
  {
    src: 'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be0a41a17d562e29541_6851a95741c391912b4d0496_Portfolio_Slides_ProjectBe-Digital-Wellness-Conference_0002.jpeg',
    alt: 'Project Be wellness keynote',
    client: 'Project Be',
  },
  {
    src: 'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68cae362b6f7edca9f846307_Marriott_The_Luxury_Group_Slide_1.avif',
    alt: 'Marriott Luxury Group presentation',
    client: 'Marriott',
  },
  {
    src: 'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdca84275b62afc2282_6851c05f787e5e92c62ed1eb_221114_Echo_Society_Show_009.001.jpeg',
    alt: 'Echo Society event design',
    client: 'Echo Society',
  },
  {
    src: 'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be1a41a17d562e29560_6862fb26fe3dc646bb7b6f2d_Portfolio_Slides_ProjectBe-Digital-Wellness-Conference_0023.jpeg',
    alt: 'Project Be wellness keynote',
    client: 'Project Be',
  },
  {
    src: 'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be076a5b0a46c2f83e8_683f46b95f3aad03b0cb2e3a_681ba9dcdcb982e09a6e1696_Portfolio_Slides_Philips-Experience-Intro_0001.jpeg',
    alt: 'Philips experience presentation',
    client: 'Philips',
  },
]

const INTERVAL = 5200

/* ── Headline tokens ─────────────────────────────────────────── */
const HEADLINE = ['Story', '>', 'You', '>', 'Audience.']

export default function Hero() {
  const reduced = useReducedMotion() ?? false
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [prevIdx, setPrevIdx] = useState<number | null>(null)

  // Detect touch/mobile after mount — skip heavy animations that have no value on mobile
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  const shouldAnimate = !reduced && !isMobile

  /* Auto-advance slides — desktop only */
  useEffect(() => {
    if (!shouldAnimate) return
    const id = setInterval(() => {
      setActiveIdx(i => {
        setPrevIdx(i)
        return (i + 1) % SLIDES.length
      })
    }, INTERVAL)
    return () => clearInterval(id)
  }, [shouldAnimate])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Parallax only on desktop — skip useTransform work on mobile
  const contentY  = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const contentOp = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="section-dark"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100dvh',
        overflow: 'hidden',
        background: 'var(--color-void)',
      }}
    >

      {/* ── Work samples crossfade ───────────────────────────── */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      >
        {isMobile ? (
          /* Mobile: single static image, no slideshow, no Ken Burns */
          <Image
            src={SLIDES[0].src}
            alt={SLIDES[0].alt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        ) : (
          <AnimatePresence>
            {SLIDES.map((slide, idx) =>
              idx === activeIdx ? (
                <motion.div
                  key={slide.src}
                  style={{ position: 'absolute', inset: 0, willChange: 'opacity' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4, ease: 'easeInOut' }}
                >
                  {/* Ken Burns zoom */}
                  <motion.div
                    style={{ position: 'absolute', inset: 0 }}
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1.0 }}
                    transition={{ duration: INTERVAL / 1000 + 1.4, ease: 'linear' }}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      priority={idx === 0}
                      sizes="100vw"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </motion.div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        )}
      </div>

      {/* ── Gradient overlays ────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: [
            'linear-gradient(to top, rgba(8,8,9,1) 0%, rgba(8,8,9,0.92) 20%, rgba(8,8,9,0.55) 50%, rgba(8,8,9,0.15) 75%, transparent 100%)',
            'linear-gradient(to right, rgba(8,8,9,0.85) 0%, rgba(8,8,9,0.45) 35%, rgba(8,8,9,0.10) 65%, transparent 85%)',
            'linear-gradient(to bottom, rgba(8,8,9,0.50) 0%, transparent 20%)',
          ].join(', '),
          pointerEvents: 'none',
        }}
      />

      {/* ── Grain texture ────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="hero-grain"
        style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}
      />

      {/* ── Content ──────────────────────────────────────────── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          padding: 'clamp(40px, 6vw, 80px)',
          paddingBottom: 'clamp(80px, 9vw, 120px)',
          y: shouldAnimate ? contentY : 0,
          opacity: shouldAnimate ? contentOp : 1,
        }}
      >

        {/* Eyebrow */}
        <motion.div
          style={{ margin: '0 0 28px' }}
          initial={reduced ? false : { opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        >
          <TextScramble
            as="p"
            className="type-label"
            style={{
              color: 'var(--color-on-dark-faint)',
              letterSpacing: '0.18em',
              fontSize: '0.6875rem',
              margin: 0,
            }}
            duration={1.2}
            speed={0.03}
            trigger={shouldAnimate}
          >
            Presentation Design · Visual Storytelling
          </TextScramble>
        </motion.div>

        {/* Headline — "Story > You > Audience." */}
        <h1
          className="type-display hero-headline"
          style={{
            color: 'var(--color-on-dark)',
            margin: '0 0 28px',
          }}
        >
          {reduced ? (
            <>
              <span>Story </span>
              <span style={{ fontWeight: 100, opacity: 0.45 }}>{'>'}</span>
              <span> You </span>
              <span style={{ fontWeight: 100, opacity: 0.45 }}>{'>'}</span>
              <span> Audience.</span>
            </>
          ) : (
            HEADLINE.map((token, i) => {
              const isArrow = token === '>'
              return (
                <motion.span
                  key={i}
                  style={{
                    display: 'inline-block',
                    marginRight: isArrow ? '0.20em' : '0.18em',
                    marginLeft: isArrow ? '0.12em' : 0,
                    fontWeight: isArrow ? 100 : 300,
                    opacity: 1,
                    color: isArrow ? 'var(--color-on-dark-faint)' : 'var(--color-on-dark)',
                  }}
                  initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                  }}
                  transition={{
                    duration: 0.75,
                    delay: 0.10 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {token}
                </motion.span>
              )
            })
          )}
        </h1>

        {/* Subtext — intentionally starts visible (opacity:1) so the browser can fire LCP
             immediately on first paint. Only the y-offset animates in. */}
        <motion.p
          className="type-body-lg"
          style={{
            color: 'var(--color-on-dark-muted)',
            margin: '0 0 44px',
            maxWidth: '460px',
            lineHeight: 1.6,
          }}
          initial={reduced ? false : { y: 14 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        >
          I build presentations for founders, executives, and brands with something important to say, and the ambition to make it land.
        </motion.p>

        {/* CTAs */}
        <motion.div
          style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <MagneticWrapper strength={14}>
            <Link
              href="/work"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: 400,
                letterSpacing: '0.02em',
                padding: '14px 28px',
                background: 'var(--color-on-dark)',
                color: 'var(--color-canvas)',
                borderRadius: '3px',
                border: 'none',
                textDecoration: 'none',
                display: 'inline-block',
                lineHeight: 1,
                transition: 'opacity 150ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              See the Work
            </Link>
          </MagneticWrapper>
          <MagneticWrapper strength={14}>
            <Link
              href="/contact"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: 400,
                letterSpacing: '0.02em',
                padding: '13px 27px',
                background: 'transparent',
                color: 'var(--color-on-dark)',
                borderRadius: '3px',
                border: '1px solid var(--color-on-dark-hint)',
                textDecoration: 'none',
                display: 'inline-block',
                lineHeight: 1,
                transition: 'border-color 150ms ease, background 150ms ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.65)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = ''
                e.currentTarget.style.background = 'transparent'
              }}
            >
              Let&apos;s Talk
            </Link>
          </MagneticWrapper>
        </motion.div>

        {/* Slide indicator dots — desktop only */}
        {shouldAnimate && (
          <motion.div
            style={{ display: 'flex', gap: '6px', marginTop: '36px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {SLIDES.map((_, i) => (
              <button
                key={i}
                aria-label={`View ${SLIDES[i].client}`}
                onClick={() => { setPrevIdx(activeIdx); setActiveIdx(i) }}
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
                    width: i === activeIdx ? '24px' : '6px',
                    height: '2px',
                    background: i === activeIdx ? 'var(--color-on-dark)' : 'var(--color-on-dark-ghost)',
                    transition: 'width 400ms var(--ease-out-expo), background 300ms ease',
                  }}
                />
              </button>
            ))}
          </motion.div>
        )}

      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: reduced ? 0 : 0.45 }}
        transition={{ duration: 1.2, delay: 2.0 }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.5625rem',
            letterSpacing: '0.22em',
            color: 'var(--color-on-dark)',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <motion.div
          style={{
            width: '1px',
            height: '44px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)',
            originY: 0,
          }}
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

    </section>
  )
}
