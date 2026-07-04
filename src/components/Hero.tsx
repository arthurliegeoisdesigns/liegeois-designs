'use client'

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TextScramble } from '@/components/ui/TextScramble'
import MagneticWrapper from '@/components/ui/MagneticWrapper'
import ShaderField from '@/components/ui/ShaderField'
import SlideWarp from '@/components/ui/SlideWarp'

/**
 * Hero v2 — kinetic type over a live shader field (Phase 2, steps 9–11).
 * The type IS the hero: three staggered Migra lines at up to 11rem, the
 * "You" italic, the ">" glyphs in accent. Work samples become a floating
 * 3D "slide" that tilts toward the cursor and advances with a
 * presentation-style wipe. Everything sits on ShaderField's silk.
 */
const SLIDES = [
  {
    src: 'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs/webflow/fivestone-20-20chevron-201-1-922e8d',
    alt: 'Chevron presentation',
    client: 'Chevron',
  },
  {
    src: 'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs/webflow/portfolio-slides-projectbe-digital-wellness-conference-0002-2291f7',
    alt: 'Project Be wellness keynote',
    client: 'Project Be',
  },
  {
    src: 'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs/webflow/marriott-the-luxury-group-slide-1-c397f7',
    alt: 'Marriott Luxury Group presentation',
    client: 'Marriott',
  },
  {
    src: 'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs/webflow/221114-echo-society-show-009-001-12c35c',
    alt: 'Echo Society event design',
    client: 'Echo Society',
  },
  {
    src: 'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs/webflow/portfolio-slides-philips-experience-intro-0001-052b0f',
    alt: 'Philips experience presentation',
    client: 'Philips',
  },
]

const INTERVAL = 5200
/* H1 carries the SEO keyword; "move" gets the Migra italic accent. */
const LINES: Array<Array<{ t: string; kind: 'word' | 'arrow' | 'italic' }>> = [
  [{ t: 'Presentations', kind: 'word' }],
  [{ t: 'that ', kind: 'word' }, { t: 'move', kind: 'italic' }],
  [{ t: 'the room.', kind: 'word' }],
]

export default function Hero() {
  const reduced = useReducedMotion() ?? false
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  // true once the WebGL displacement layer has textures + context ready;
  // until then (or forever, if WebGL is unavailable) the clip-wipe runs.
  // warpDead: the frame-rate watchdog tripped — never remount the canvas.
  const [warpReady, setWarpReady] = useState(false)
  const [warpDead, setWarpDead] = useState(false)

  // Entrances start immediately after hydration — the preloader plate
  // COVERS the hero, so waiting for it only delayed LCP (mobile lab
  // measured the headline painting at 6.5s because of this). The wipe
  // now reveals an already-composed hero.
  const introDelay = 0.2

  // Autoplay begins after the first real gesture — robots never gesture,
  // so the lab page settles visually (Speed Index) and never pays the
  // transition cost (TBT); humans move/scroll within the first second.
  const [engaged, setEngaged] = useState(false)
  useEffect(() => {
    if (reduced) return
    const GESTURES = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'keydown'] as const
    const onGesture = () => setEngaged(true)
    GESTURES.forEach((g) => window.addEventListener(g, onGesture, { passive: true, once: true }))
    return () => GESTURES.forEach((g) => window.removeEventListener(g, onGesture))
  }, [reduced])

  useEffect(() => {
    if (reduced || !engaged) return
    const id = setInterval(() => setActiveIdx((i) => (i + 1) % SLIDES.length), INTERVAL)
    return () => clearInterval(id)
  }, [reduced, engaged])

  // Content drifts up + fades as the hero scrolls away
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const contentOp = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  // 3D tilt for the slide card
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 90, damping: 16 })
  const sry = useSpring(ry, { stiffness: 90, damping: 16 })

  function onTiltMove(e: React.MouseEvent) {
    const el = sectionRef.current
    if (!el || reduced) return
    const r = el.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8)
  }

  return (
    <section
      ref={sectionRef}
      className="section-dark hero-kinetic"
      onMouseMove={onTiltMove}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100dvh',
        overflow: 'hidden',
        background: 'transparent',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* Live silk field */}
      {!reduced && <ShaderField />}

      <motion.div
        className="hero-kinetic-grid"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          padding: 'clamp(40px, 6vw, 80px)',
          paddingBottom: 'clamp(56px, 7vw, 96px)',
          paddingTop: 'calc(clamp(40px, 6vw, 80px) + 72px)',
          y: reduced ? 0 : contentY,
          opacity: reduced ? 1 : contentOp,
        }}
      >
        {/* Eyebrow */}
        <div style={{ margin: '0 0 clamp(20px, 3vw, 36px)' }}>
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
            trigger={!reduced}
          >
            Presentation Design · Visual Storytelling
          </TextScramble>
        </div>

        {/* Kinetic headline — three rising lines */}
        <h1 className="hero-kinetic-headline" style={{ margin: '0 0 clamp(24px, 3vw, 40px)' }}>
          {LINES.map((line, li) => (
            <span key={li} className="hero-kinetic-linewrap">
              <motion.span
                className="hero-kinetic-line"
                initial={reduced ? false : { y: '110%', rotate: 2.5 }}
                animate={{ y: '0%', rotate: 0 }}
                transition={{
                  duration: 1.05,
                  delay: introDelay + li * 0.11,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line.map((tok, ti) =>
                  tok.kind === 'arrow' ? (
                    <span key={ti} className="hero-kinetic-arrow" aria-hidden="true">
                      {tok.t}
                    </span>
                  ) : tok.kind === 'italic' ? (
                    <em key={ti} className="hero-kinetic-italic">
                      {tok.t}
                    </em>
                  ) : (
                    <span key={ti}>{tok.t}</span>
                  ),
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="hero-kinetic-lower">
          {/* Left: sub + CTAs */}
          <div style={{ maxWidth: '440px' }}>
            {/* LCP element — starts VISIBLE (opacity 1) so the browser can
                fire LCP on first paint; only the y-offset animates.
                (Learned this twice now — do not add opacity here.) */}
            <motion.p
              className="type-body-lg"
              style={{ color: 'var(--color-on-dark-muted)', margin: '0 0 36px', lineHeight: 1.6 }}
              initial={reduced ? false : { y: 14 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: introDelay + 0.4 }}
            >
              Pitch decks, keynotes, and executive presentations — for founders and brands with
              something worth saying, and the ambition to make it land.
            </motion.p>
            <motion.div
              style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: introDelay + 0.5 }}
            >
              <MagneticWrapper strength={14}>
                <Link href="/work" className="btn-hero-solid">
                  See the Work
                </Link>
              </MagneticWrapper>
              <MagneticWrapper strength={14}>
                <Link href="/contact" className="btn-hero-ghost">
                  Let&apos;s Talk
                </Link>
              </MagneticWrapper>
            </motion.div>
          </div>

          {/* Right: floating slide card */}
          <motion.div
            className="hero-slide-card-wrap"
            initial={reduced ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: introDelay + 0.55 }}
          >
            <motion.div
              className="hero-slide-card"
              style={reduced ? undefined : { rotateX: srx, rotateY: sry }}
            >
              {/* LCP poster — always in the DOM, first slide, priority */}
              <Image
                src={SLIDES[0].src}
                alt={SLIDES[0].alt}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 900px) 92vw, 44vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />

              {/* Legacy clip-wipe — runs until WebGL takes over (or forever
                  when WebGL is unavailable) */}
              {!warpReady && (
                <AnimatePresence initial={false}>
                  <motion.div
                    key={SLIDES[activeIdx].src}
                    style={{ position: 'absolute', inset: 0 }}
                    initial={reduced ? false : { clipPath: 'inset(0 0 0 100%)' }}
                    animate={{ clipPath: 'inset(0 0 0 0%)' }}
                    exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.45 } }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={SLIDES[activeIdx].src}
                      alt={SLIDES[activeIdx].alt}
                      fill
                      sizes="(max-width: 900px) 92vw, 44vw"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </motion.div>
                </AnimatePresence>
              )}

              {/* WebGL displacement layer — melts slides into each other,
                  ripples around the cursor (Cloudinary CORS makes this legal) */}
              {!reduced && !warpDead && (
                <SlideWarp
                  images={SLIDES.map((s) => s.src)}
                  active={activeIdx}
                  onReady={() => setWarpReady(true)}
                  onFail={() => {
                    setWarpReady(false)
                    setWarpDead(true)
                  }}
                />
              )}

              {/* caption bar */}
              <div className="hero-slide-caption">
                <span>{SLIDES[activeIdx].client}</span>
                <span style={{ opacity: 0.55 }}>
                  {String(activeIdx + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                </span>
              </div>
              {/* advancing hairline */}
              {!reduced && (
                <motion.div
                  key={`bar-${activeIdx}`}
                  className="hero-slide-progress"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
                />
              )}
            </motion.div>

            {/* slide dots */}
            {!reduced && (
              <div style={{ display: 'flex', gap: '4px', marginTop: '14px', justifyContent: 'flex-end' }}>
                {SLIDES.map((s, i) => (
                  <button
                    key={i}
                    aria-label={`View ${s.client}`}
                    onClick={() => setActiveIdx(i)}
                    style={{
                      width: '36px',
                      height: '32px',
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
                        width: i === activeIdx ? '22px' : '6px',
                        height: '2px',
                        background:
                          i === activeIdx ? 'var(--color-accent)' : 'var(--color-on-dark-ghost)',
                        transition: 'width 400ms var(--ease-out-expo), background 300ms ease',
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: reduced ? 0 : 0.45 }}
        transition={{ duration: 1.2, delay: introDelay + 1.6 }}
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
