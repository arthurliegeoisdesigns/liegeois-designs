'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

/**
 * JourneyHero — "Scroll to present." (Hero v3, July 2026)
 *
 * A scroll-driven journey through slides, replacing the v2 hero:
 *   Scene 0  Title slide (LCP — pure text, paints immediately; the
 *            wormhole runs behind it as the invitation)
 *   Scene 1  THE SEQUENCE — 10 real Chevron builds flow through the
 *            camera inside a wireframe wormhole (canvas 2D, no WebGL)
 *   Scene 2  THE DOORS — teddy/bear before-after parts onto the chaos,
 *            which streamlines into two clean rows
 *   Scene 3  THE WHISPER — 33-tool storm, blackout, the truth line
 *   Scene 4  "They're so well done. Who did those?" → hands off to
 *            The Company We Keep.
 *
 * Rules honored:
 * - LCP RULE: the scene-0 headline NEVER animates opacity on load.
 * - The wrapper carries no transforms (route transition is opacity-only),
 *   so ScrollTrigger pins and the fixed deck-frame/canvas are safe here
 *   (same pattern as FeaturedWork's pinned rail).
 * - Sections live inside a <div>, so ParallaxFlow's `main > section`
 *   query never re-themes or drifts them.
 * - Reduced motion: no pins, no canvas — CSS shows a static fallback.
 */

/* Journey assets now live on CLOUDINARY, not /public (Aug 2026).
   They were the only raster images on the site still served as local
   files, which meant next/image's custom loader passed them straight
   through — no AVIF, no responsive sizing. 12 files, 1824 KB of JPEG,
   all 1920x1080 being painted at ~478px on a phone. That payload was
   the whole of the 11.9s TTI: Lantern derives TTI from bytes on the
   wire, and the page shipped 2756 KB total while TBT was only 60ms.
   Nothing was blocking; there was just too much to download.

   Via the Cloudinary loader these become f_auto (AVIF/WebP) + w_<size>
   + c_limit, resized on Cloudinary's CDN so Vercel performs — and bills
   — zero transformations. See src/lib/cloudinary-loader.ts and the note
   in next.config.ts about the July 2026 overage.

   Originals remain in /public/images/journey as the source of truth. */
const CDN_BASE = 'https://res.cloudinary.com/dryyhpqew/image/upload/liegeois-designs/journey'

const BUILDS = [
  { file: 'chevron-00-cover', tag: 'Build 01: the cover' },
  { file: 'chevron-01', tag: 'Build 02: "Hi."' },
  { file: 'chevron-02', tag: 'Build 03: clearing the room' },
  { file: 'chevron-03', tag: 'Build 04: no logo hunt' },
  { file: 'chevron-04', tag: 'Build 05: no silver bullet' },
  { file: 'chevron-05', tag: 'Build 06: the turn' },
  { file: 'chevron-06', tag: 'Build 07: the people' },
  { file: 'chevron-07', tag: 'Build 08: the thinking' },
  { file: 'chevron-08', tag: 'Build 09: the question' },
  { file: 'chevron-09', tag: 'Build 10: the landing' },
]

const CDN = 'https://res.cloudinary.com/dryyhpqew/image/upload'
const FRAGS: Array<
  | { kind: 'img'; w: string; src: string }
  | { kind: 'txt'; w: string; lines: string[] }
  | { kind: 'chart'; w: string; chart: 'line' | 'bars' }
> = [
  { kind: 'img', w: '19vw', src: `${CDN}/f_auto,q_auto,w_700,c_fill,ar_16:9/liegeois-designs/webflow/norigami-deck-slide-1-426866` },
  { kind: 'img', w: '16vw', src: `${CDN}/f_auto,q_auto,w_700,c_fill,ar_16:9/liegeois-designs/webflow/portfolio-slides-echo-society-pitch-deck-0001-51d816` },
  { kind: 'img', w: '17vw', src: `${CDN}/f_auto,q_auto,w_700,c_fill,ar_16:9/liegeois-designs/chevron-01` },
  { kind: 'img', w: '15vw', src: `${CDN}/f_auto,q_auto,w_700,c_fill,ar_16:9/liegeois-designs/webflow/portfolio-slides-university-startups-pitch-deck-0001-8eedd5` },
  { kind: 'img', w: '16vw', src: `${CDN}/f_auto,q_auto,w_700,c_fill,ar_16:9/liegeois-designs/webflow/marriott-the-luxury-group-slide-1-c397f7` },
  { kind: 'img', w: '14vw', src: `${CDN}/f_auto,q_auto,w_700,c_fill,ar_16:9/liegeois-designs/webflow/portfolio-slides-philips-experience-intro-0001-052b0f` },
  { kind: 'txt', w: '12vw', lines: ['"we need it', 'by thursday"'] },
  { kind: 'txt', w: '11vw', lines: ['47 bullet points,', 'one slide'] },
  { kind: 'txt', w: '12vw', lines: ['v14_FINAL_', 'final2.pptx'] },
  { kind: 'txt', w: '11vw', lines: ['"can you make', 'the logo bigger?"'] },
  { kind: 'txt', w: '12vw', lines: ["the founder's", 'napkin sketch'] },
  { kind: 'chart', w: '12vw', chart: 'line' },
  { kind: 'chart', w: '11vw', chart: 'bars' },
]

const TOOLS = [
  'PowerPoint', 'Keynote', 'Google Slides', 'Canva', 'Prezi', 'Pitch', 'Gamma',
  'Beautiful.ai', 'Plus AI', 'Presentations.AI', 'Slidebean', 'Visme', 'Genially',
  'Decktopus', 'Powtoon', 'Emaze', 'Zoho Show', 'Ludus', 'Slides.com', 'Haiku Deck',
  'Adobe Express', 'Figma Slides', 'Copilot', 'Gemini', 'Claude', 'ChatGPT',
  'NotebookLM', 'SlidesAI', 'Alai', 'Napkin AI', 'Storydoc', 'Mentimeter',
]
const DEAD_TOOL = 'Tome (2020–2025)'

export default function JourneyHero() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /* ── LCP GATE (measured, Aug 2026) ──────────────────────────────────
     The scene-0 <h1> is the LCP element, and Chrome doesn't score it
     until PP Migra repaints the text. On Slow 4G the display face was
     landing at ~4.5s and LCP fired ~25ms later — because ~200 KB of
     below-fold journey imagery was sharing the pipe with it.

     These images are ALL decorative (alt="") and start at opacity:0
     inside absolutely-positioned, aspect-ratio-locked containers, so
     withholding src costs no layout shift and shows the user nothing
     they could have seen anyway. We release them once the display face
     has landed (or after 2.5s, whichever comes first). ────────────── */
  const [assetsReady, setAssetsReady] = useState(false)

  useEffect(() => {
    let released = false
    const release = () => {
      if (released) return
      released = true
      setAssetsReady(true)
    }

    // Safety net: never hold decorative art hostage to a stalled font.
    const timer = window.setTimeout(release, 2500)

    const fonts = document.fonts
    if (fonts?.ready) {
      fonts.ready.then(release).catch(release)
    } else {
      release()
    }

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    ;(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      const lenis = (window as unknown as Record<string, unknown>).lenis as
        | { on: (e: string, cb: () => void) => void }
        | undefined
      lenis?.on('scroll', ScrollTrigger.update)

      const mobile = window.matchMedia('(max-width: 768px)').matches
      const slideNo = root.querySelector<HTMLElement>('.jn-slide-no')
      const setNo = (n: number) => {
        if (slideNo) slideNo.textContent = `Slide 0${n} / 05`
      }

      /* ── storm placement: 7×5 shuffled grid, no clusters ── */
      const rng = ((seed: number) => () => (seed = (seed * 16807) % 2147483647) / 2147483647)(42)
      const storm = root.querySelector<HTMLElement>('.jn-storm')
      const COLS = 7
      const ROWS = 5
      const cells: Array<[number, number]> = []
      for (let c = 0; c < COLS; c++) for (let r = 0; r < ROWS; r++) cells.push([c, r])
      for (let i = cells.length - 1; i > 0; i--) {
        const k = Math.floor(rng() * (i + 1))
        ;[cells[i], cells[k]] = [cells[k], cells[i]]
      }
      const ghosts: HTMLElement[] = []
      if (storm && storm.childElementCount === 0) {
        ;[...TOOLS, DEAD_TOOL].forEach((name, i) => {
          const el = document.createElement('span')
          el.className = 'jn-ghost' + (name === DEAD_TOOL ? ' jn-ghost-dead' : '')
          el.textContent = name
          const depth = 0.35 + rng() * 1.1
          el.dataset.g = String(depth)
          const [c, r] = cells[i % cells.length]
          el.style.left = `${1.5 + (c + 0.08 + rng() * 0.45) * (94 / COLS)}%`
          el.style.top = `${3 + (r + 0.1 + rng() * 0.55) * (92 / ROWS)}%`
          el.style.fontSize = `clamp(${0.9 + depth * 0.5}rem, ${1.2 + depth * 2.4}vw, ${1.1 + depth * 2.2}rem)`
          storm.appendChild(el)
          ghosts.push(el)
        })
      }

      const ctx = gsap.context(() => {
        /* ── SCENE 0: the scene departs as you leave (y + late fade only —
           LCP paints at full opacity, untouched until the user scrolls).
           Targets .jn-s0-grid: the old .jn-s0-center no longer exists, and a
           GSAP selector that matches nothing fails silently — the scene would
           simply have stopped animating with no error. The copy and the deck
           leave together so the composition holds while it travels; the deck
           drifts slightly further for parallax depth. ── */
        gsap.to('.jn-s0-grid', {
          y: -120,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: { trigger: '.jn-s0', start: 'top top', end: 'bottom top', scrub: 0.4 },
        })
        gsap.to('.jn-s0-stage', {
          y: -46,
          ease: 'none',
          scrollTrigger: { trigger: '.jn-s0', start: 'top top', end: 'bottom top', scrub: 0.4 },
        })

        /* ── SCENE 1: THE SEQUENCE ── */
        const seq = gsap.utils.toArray<HTMLElement>('.jn-seq-slide')
        const s1 = gsap.timeline({
          scrollTrigger: {
            trigger: '.jn-s1',
            start: 'top top',
            end: mobile ? '+=420%' : '+=580%',
            scrub: 0.5,
            pin: true,
            onEnter: () => setNo(2),
            onLeaveBack: () => setNo(1),
            onUpdate: (st) => {
              vortexProgress = st.progress
            },
          },
        })
        seq.forEach((sl, i) => {
          const t = i * 0.62
          s1.fromTo(
            sl,
            { scale: 0.24, opacity: 0, yPercent: -44, xPercent: -50 },
            { scale: 1, opacity: 1, yPercent: -50, ease: 'power1.out', duration: 0.5 },
            t,
          ).to(sl, { scale: 3.1, opacity: 0, ease: 'power2.in', duration: 0.4 }, t + 0.62)
        })
        s1.to('[data-jn-cap="0"]', { opacity: 1, duration: 0.2 }, 0)
          .to('[data-jn-cap="0"]', { opacity: 0, duration: 0.2 }, 2.1)
          .to('[data-jn-cap="1"]', { opacity: 1, duration: 0.2 }, 2.3)
          .to('[data-jn-cap="1"]', { opacity: 0, duration: 0.2 }, 4.4)
          .to('[data-jn-cap="2"]', { opacity: 1, duration: 0.25 }, 4.6)

        /* ── SCENE 2: DOORS + CHAOS → STREAMLINED ── */
        const frags = gsap.utils.toArray<HTMLElement>('.jn-frag')
        const chaos = [
          { x: -40, y: -34, r: -14 }, { x: 36, y: -40, r: 10 }, { x: -32, y: 28, r: 8 },
          { x: 42, y: 24, r: -9 }, { x: -14, y: -46, r: 5 }, { x: 14, y: 40, r: -6 },
          { x: 46, y: -10, r: 12 }, { x: -44, y: 6, r: -7 }, { x: 6, y: -30, r: 9 },
          { x: -24, y: 44, r: -11 }, { x: 28, y: 8, r: 6 }, { x: -6, y: 34, r: -5 },
          { x: 20, y: -18, r: 7 },
        ]
        frags.forEach((f, i) => {
          const c = chaos[i % chaos.length]
          gsap.set(f, {
            left: '50%', top: '50%', xPercent: -50, yPercent: -50,
            x: `${c.x}vw`, y: `${c.y}vh`, rotation: c.r, opacity: 0.85,
          })
        })
        const s2 = gsap.timeline({
          scrollTrigger: {
            trigger: '.jn-s2',
            start: 'top top',
            end: mobile ? '+=300%' : '+=380%',
            scrub: 0.5,
            pin: true,
            onEnter: () => setNo(3),
            onLeaveBack: () => setNo(2),
          },
        })
        s2.to('.jn-door-left', { xPercent: -101, ease: 'power2.inOut', duration: 0.9 }, 0.12)
          .to('.jn-door-right', { xPercent: 101, ease: 'power2.inOut', duration: 0.9 }, 0.12)
          .fromTo(
            '.jn-s2-reveal',
            { scale: 0.94, opacity: 0 },
            { scale: 1, opacity: 1, ease: 'power1.out', duration: 0.7 },
            0.35,
          )
        s2.to('.jn-s2-reveal', { y: -70, opacity: 0, ease: 'power1.in', duration: 0.45 }, 1.6)
          .to('.jn-scatter-label', { opacity: 0, duration: 0.2 }, 1.7)
        const composed = [
          { x: '-31vw', y: '-11vh' }, { x: '-2vw', y: '-11vh' }, { x: '27vw', y: '-11vh' },
          { x: '-24vw', y: '10vh' }, { x: '7vw', y: '10vh' }, { x: '33vw', y: '10vh' },
          { x: '-16.5vw', y: '-11vh' }, { x: '12vw', y: '-11vh' }, { x: '-38vw', y: '10vh' },
          { x: '-8.5vw', y: '10vh' }, { x: '20.5vw', y: '10vh' }, { x: '38vw', y: '-11vh' },
          { x: '-40vw', y: '-11vh' },
        ]
        frags.forEach((f, i) => {
          s2.to(
            f,
            { x: composed[i].x, y: composed[i].y, rotation: 0, opacity: 1, ease: 'power2.inOut', duration: 1 },
            1.85 + i * 0.025,
          )
        })
        s2.to('.jn-composed-label', { opacity: 1, duration: 0.3 }, 2.7)

        /* ── SCENE 3: TOOL STORM ── */
        const s3 = gsap.timeline({
          scrollTrigger: {
            trigger: '.jn-s3',
            start: 'top top',
            end: mobile ? '+=200%' : '+=240%',
            scrub: 0.5,
            pin: true,
            onEnter: () => setNo(4),
            onLeaveBack: () => setNo(3),
            onUpdate: (st) => {
              const el = root.querySelector('.jn-tool-count b')
              if (el) el.textContent = String(Math.min(TOOLS.length, Math.floor(st.progress * 2.2 * TOOLS.length)))
            },
          },
        })
        ghosts.forEach((g) => {
          const d = parseFloat(g.dataset.g || '0.6')
          s3.fromTo(
            g,
            { scale: 0.6, opacity: 0, y: 90 * d },
            { scale: 1 + d * 1.6, opacity: 1, y: -140 * d, ease: 'power1.in', duration: 0.5 + d * 0.2 },
            rng() * 0.5,
          )
        })
        s3.to('.jn-storm', { opacity: 0.25, duration: 0.2 }, 0.72)
          .to('.jn-blackout', { opacity: 1, duration: 0.12 }, 0.78)
          .to('.jn-tool-count', { opacity: 0, duration: 0.1 }, 0.78)
          .fromTo('.jn-truth-wrap', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.35 }, 0.9)
          .to('.jn-strike i', { right: '-2%', ease: 'power2.inOut', duration: 0.35 }, 1.12)

        /* ── SCENE 4: payoff + frame dissolve ── */
        gsap.fromTo(
          '.jn-s4-wrap',
          { opacity: 0, y: 80 },
          {
            opacity: 1, y: 0, ease: 'power2.out',
            scrollTrigger: {
              trigger: '.jn-s4', start: 'top 70%', end: 'top 30%', scrub: 0.5,
              onEnter: () => setNo(5), onLeaveBack: () => setNo(4),
            },
          },
        )
        gsap.to('.jn-deck-frame', {
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.jn-s4', start: 'center center', end: 'bottom 60%', scrub: 0.5 },
        })
      }, root)

      /* ── wireframe wormhole (canvas 2D) behind scenes 0–1 ── */
      let vortexProgress = 0
      let rafId = 0
      const cv = canvasRef.current
      const vortexTriggers: Array<{ kill: () => void }> = []
      if (cv) {
        const c2d = cv.getContext('2d')!
        const DPR = Math.min(window.devicePixelRatio || 1, 1.5)
        let W = 0, H = 0, CX = 0, CY = 0
        let active = true
        const size = () => {
          W = cv.clientWidth; H = cv.clientHeight
          cv.width = W * DPR; cv.height = H * DPR
          c2d.setTransform(DPR, 0, 0, DPR, 0, 0)
          CX = W / 2; CY = H / 2
        }
        size()
        window.addEventListener('resize', size)

        const RINGS = mobile ? 24 : 34
        const SIDE_N = mobile ? 9 : 14
        const PERIM = SIDE_N * 4
        const Z_NEAR = 0.32, Z_FAR = 4.2, HALF = 1.55, TWIST = 0.22
        const tpl: Array<[number, number]> = []
        for (let s = 0; s < 4; s++) {
          for (let k = 0; k < SIDE_N; k++) {
            const f = (k / SIDE_N) * 2 - 1
            if (s === 0) tpl.push([f, -1])
            if (s === 1) tpl.push([1, f])
            if (s === 2) tpl.push([-f, 1])
            if (s === 3) tpl.push([-1, -f])
          }
        }
        const hash = (n: number) => { const x = Math.sin(n * 127.1) * 43758.5453; return x - Math.floor(x) }

        let shownP = 0, lastP = 0, vel = 0, t = 0
        const ringPoints = (z: number, travel: number) => {
          const focal = Math.min(W, H) * 0.5
          const rot = t * 0.11 + z * TWIST + travel * 0.4
          const bx = Math.sin(z * 1.1 + t * 0.18) * 0.22 * z
          const by = Math.cos(z * 0.9 + t * 0.14) * 0.16 * z
          const cos = Math.cos(rot), sin = Math.sin(rot)
          const pts: Array<[number, number]> = []
          for (const [ux, uy] of tpl) {
            const wx = (ux * cos - uy * sin) * HALF + bx
            const wy = (ux * sin + uy * cos) * HALF + by
            pts.push([CX + (wx / z) * focal, CY + (wy / z) * focal])
          }
          return pts
        }
        const fog = (z: number) => {
          const nearFade = Math.min(1, (z - Z_NEAR) / 0.28)
          const farFade = Math.min(1, (Z_FAR - z) / (Z_FAR * 0.55))
          return Math.max(0, nearFade * farFade)
        }
        const frame = () => {
          if (active && W > 0) {
            t += 0.016
            shownP += (vortexProgress - shownP) * 0.09
            vel += ((vortexProgress - lastP) * 60 - vel) * 0.1
            lastP = vortexProgress
            const travel = t * 0.14 + shownP * 2.6 + Math.min(Math.abs(vel), 0.06) * 6
            c2d.clearRect(0, 0, W, H)
            const step = (Z_FAR - Z_NEAR) / RINGS
            const rings: number[] = []
            for (let i = 0; i < RINGS; i++) {
              rings.push(Z_FAR - ((i + (travel / step) * 0.12) % RINGS) * step)
            }
            rings.sort((a, b) => b - a)
            const pts = rings.map((z) => ringPoints(z, travel))
            c2d.strokeStyle = 'rgba(247, 240, 228, 1)'
            for (let j = 0; j < PERIM; j++) {
              c2d.beginPath()
              for (let i = 0; i < rings.length; i++) {
                const [x, y] = pts[i][j]
                if (i === 0) c2d.moveTo(x, y)
                else c2d.lineTo(x, y)
              }
              c2d.globalAlpha = 0.1
              c2d.lineWidth = 0.6
              c2d.stroke()
            }
            for (let i = 0; i < rings.length; i++) {
              const z = rings[i], a = fog(z), p = pts[i]
              if (a <= 0.01) continue
              c2d.beginPath()
              c2d.moveTo(p[0][0], p[0][1])
              for (let j = 1; j < PERIM; j++) c2d.lineTo(p[j][0], p[j][1])
              c2d.closePath()
              c2d.globalAlpha = a * 0.16
              c2d.lineWidth = 0.7 + (1 / z) * 0.5
              c2d.stroke()
              for (let j = 0; j < PERIM; j++) {
                const seed = j * 53 + Math.floor(z * 13) * 41
                const tw = 0.45 + 0.55 * hash(j * 31 + Math.floor(z * 7) * 97 + Math.floor(t * 2))
                const szRand = 0.35 + hash(seed) * 1.5
                const d = (0.5 + (1 / z) * 1.6) * szRand * (0.7 + tw * 0.5)
                const accent = hash(j * 7 + i) < 0.04
                const col = accent ? '232, 68, 32' : '247, 240, 228'
                if (szRand > 1.45) {
                  c2d.globalAlpha = a * 0.16 * tw
                  c2d.fillStyle = `rgba(${col}, 1)`
                  c2d.fillRect(p[j][0] - d * 1.6, p[j][1] - d * 1.6, d * 3.2, d * 3.2)
                }
                c2d.globalAlpha = a * (0.22 + tw * 0.62)
                c2d.fillStyle = `rgba(${col}, 0.95)`
                c2d.fillRect(p[j][0] - d / 2, p[j][1] - d / 2, d, d)
              }
            }
            c2d.globalAlpha = 1
          }
          rafId = requestAnimationFrame(frame)
        }
        rafId = requestAnimationFrame(frame)

        let inS0 = true, inS1 = false
        const setActive = () => {
          active = inS0 || inS1
          /* leaving the journey: wipe the frozen frame so the world
             canvas (not a stale mesh) shows behind later sections */
          if (!active) c2d.clearRect(0, 0, W, H)
        }
        vortexTriggers.push(
          ScrollTrigger.create({
            trigger: '.jn-s0', start: 'top bottom', end: 'bottom top',
            onToggle: (st) => { inS0 = st.isActive; setActive() },
          }),
          ScrollTrigger.create({
            trigger: '.jn-s1', start: 'top bottom', end: 'bottom top',
            onToggle: (st) => { inS1 = st.isActive; setActive() },
          }),
        )

        cleanup = () => {
          ctx.revert()
          vortexTriggers.forEach((tr) => tr.kill())
          cancelAnimationFrame(rafId)
          window.removeEventListener('resize', size)
        }
      } else {
        cleanup = () => ctx.revert()
      }
    })()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  const skip = () => {
    const el = rootRef.current
    if (!el) return
    window.scrollTo({ top: el.offsetTop + el.offsetHeight, behavior: 'smooth' })
  }

  return (
    <div className="jn-journey" ref={rootRef}>
      <canvas className="jn-vortex" ref={canvasRef} aria-hidden="true" />
      <div className="jn-deck-frame" aria-hidden="true">
        {/* Must match the scroll handler's format above (`Slide 0n / 05`).
            The Aug 2026 em-dash sweep rewrote the template literal but not this
            static fallback, so the first paint read "Slide 01, 05" until the
            first scroll event corrected it. */}
        <span className="jn-slide-no">Slide 01 / 05</span>
      </div>

      {/* SCENE 0 — TITLE SLIDE, work as the object
          ------------------------------------------------------------------
          The h1 is still the LCP element and still pure text: no opacity
          animation, ever. The deck sits BESIDE it rather than behind it, so
          the two never compete — the failure mode when a slide is used as a
          backdrop is that the slide's own typography fights the headline.
          At an angle, with depth and shadow, a slide reads as an artifact
          instead of as competing text.

          LCP is protected by three things, measured (2.5s -> 1.0s):
            1. the h1 is sized LARGER than the front card, so text stays the
               biggest painted element and images cannot gate the metric;
            2. only the front card is on the critical path — the two behind
               are dimmed to 40%/74% and load lazily at low priority;
            3. the front card is requested at the size it renders, not 2x.
          Do not add a fourth card or enlarge the stack without re-measuring.

          Chevron is deliberate: scenes 1-4 walk through this same deck, so
          the hero previews the journey rather than decorating it. */}
      <section className="jn-scene jn-s0" aria-label="Introduction">
        <div className="jn-s0-grid">
          <div className="jn-s0-copy">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="jn-mark"
              src="/images/logo-liegeois-white.svg"
              alt="Liégeois Designs"
              width={228}
              height={73}
            />
            <p className="jn-eyebrow">presents</p>
            <h1>
              Presentations
              <br />
              that <em>move</em>
              <br />
              the room.
            </h1>
          </div>

          <div className="jn-s0-stage" aria-hidden="true">
            <div className="jn-s0-slide jn-s0-c1">
              <Image
                src={`${CDN_BASE}/chevron-05`}
                alt=""
                fill
                sizes="(max-width: 900px) 72vw, 41vw"
                quality={60}
                loading="lazy"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="jn-s0-slide jn-s0-c2">
              <Image
                src={`${CDN_BASE}/chevron-07`}
                alt=""
                fill
                sizes="(max-width: 900px) 72vw, 41vw"
                quality={60}
                loading="lazy"
                style={{ objectFit: 'cover' }}
              />
            </div>
            {/* Front card is eager but deliberately NOT priority.
                priority emits a high-priority preload, which put this image
                in direct contention with PP Migra — and the h1 cannot reach
                its final paint until that font lands. Measured: with priority
                LCP was 4.6s, without it 3.3s. The h1 is the LCP element here,
                so the card must never outrank the font. */}
            <div className="jn-s0-slide jn-s0-c3">
              <Image
                src={`${CDN_BASE}/chevron-00-cover`}
                alt="Chevron New Energies: strategic narrative deck"
                fill
                sizes="(max-width: 900px) 72vw, 41vw"
                quality={70}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <span className="jn-s0-tag">Chevron New Energies, strategic narrative</span>
          </div>
        </div>

        <div className="jn-cue">
          <span className="jn-eyebrow">Scroll to present</span>
          <span className="jn-cue-line" />
        </div>
        <button className="jn-skip" onClick={skip} type="button">
          Skip intro ↓
        </button>
      </section>

      {/* SCENE 1 — THE SEQUENCE */}
      <section className="jn-s1" aria-label="The sequence">
        <div className="jn-pinner">
          <div className="jn-tunnel">
            {BUILDS.map((b, i) => (
              <div className="jn-seq-slide" key={b.file}>
                {/* Rendered only once assetsReady flips — see the LCP GATE
                    note above. GSAP animates .jn-seq-slide, never the image
                    inside it, so mounting late is safe; the container is
                    absolutely positioned with a locked aspect-ratio and its
                    own background, so nothing shifts. */}
                {assetsReady && (
                  <Image
                    src={`${CDN_BASE}/${b.file}`}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 92vw, 58vw"
                    quality={70}
                    loading={i < 2 ? 'eager' : 'lazy'}
                    style={{ objectFit: 'cover' }}
                  />
                )}
                <span className="jn-tag">{b.tag}</span>
              </div>
            ))}
          </div>
          <div className="jn-seq-caption">
            <p className="jn-eyebrow">Scene 01, The Sequence</p>
            <p className="jn-cap" data-jn-cap="0">One slide is not a scene.</p>
            <p className="jn-cap" data-jn-cap="1">A scene is slides in sequence, timed to the story.</p>
            <p className="jn-cap" data-jn-cap="2">Build after build, until the message lands.</p>
          </div>
        </div>
      </section>

      {/* SCENE 2 — THE DOORS → CHAOS, STREAMLINED */}
      <section className="jn-s2" aria-label="The doors">
        <div className="jn-pinner">
          <div className="jn-behind">
            <div className="jn-scatter-label jn-eyebrow">everything you hand us</div>
            {FRAGS.map((f, i) => (
              <div
                key={i}
                className={`jn-frag${f.kind === 'txt' ? ' jn-frag-txt' : ''}${f.kind === 'chart' ? ' jn-frag-chart' : ''}`}
                style={{ width: f.w }}
              >
                {f.kind === 'img' && assetsReady && (
                  <Image
                    src={f.src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 20vw, 19vw"
                    quality={65}
                    loading="lazy"
                    style={{ objectFit: 'cover', opacity: 0.92 }}
                  />
                )}
                {f.kind === 'txt' &&
                  f.lines.map((l, k) => (
                    <span key={k}>
                      {l}
                      {k < f.lines.length - 1 && <br />}
                    </span>
                  ))}
                {f.kind === 'chart' && f.chart === 'line' && (
                  <svg viewBox="0 0 100 56">
                    <polyline points="4,48 22,38 38,42 56,22 74,28 96,8" fill="none" stroke="#E84420" strokeWidth="1.6" />
                    <line x1="4" y1="52" x2="96" y2="52" stroke="rgba(247,240,228,0.25)" strokeWidth="0.5" />
                  </svg>
                )}
                {f.kind === 'chart' && f.chart === 'bars' && (
                  <svg viewBox="0 0 100 56">
                    <rect x="8" y="34" width="10" height="18" fill="rgba(247,240,228,0.3)" />
                    <rect x="26" y="24" width="10" height="28" fill="rgba(247,240,228,0.4)" />
                    <rect x="44" y="30" width="10" height="22" fill="rgba(247,240,228,0.3)" />
                    <rect x="62" y="12" width="10" height="40" fill="#E84420" />
                    <rect x="80" y="20" width="10" height="32" fill="rgba(247,240,228,0.35)" />
                  </svg>
                )}
              </div>
            ))}
            <div className="jn-s2-reveal">
              <div className="jn-s2-wrap">
                <p className="jn-eyebrow">Scene 02, The Doors</p>
                <h2>
                  One story,
                  <br />
                  <em>arriving</em> in parts.
                </h2>
                <p className="jn-s2-body">
                  We cut your deck the way an editor cuts a film. Every element enters
                  exactly when the story needs it, so the progression feels natural,
                  obvious, inevitable. The audience never sees slides changing.
                  They see one idea unfolding.
                </p>
              </div>
            </div>
            <div className="jn-composed-label">
              <p className="jn-eyebrow">and what the room sees</p>
              <p className="jn-composed-big">Chaos, streamlined.</p>
            </div>
          </div>
          <div className="jn-door jn-door-left">
            <div className="jn-door-skin">
              {assetsReady && (
                <Image
                  src={`${CDN_BASE}/door-teddy`}
                  alt=""
                  fill
                  sizes="51vw"
                  quality={70}
                  loading="lazy"
                  style={{ objectFit: 'cover' }}
                />
              )}
              <span className="jn-door-shade" />
            </div>
            <span className="jn-knock">where every deck starts</span>
          </div>
          <div className="jn-door jn-door-right">
            <div className="jn-door-skin">
              {assetsReady && (
                <Image
                  src={`${CDN_BASE}/door-bear`}
                  alt=""
                  fill
                  sizes="51vw"
                  quality={70}
                  loading="lazy"
                  style={{ objectFit: 'cover' }}
                />
              )}
              <span className="jn-door-shade" />
            </div>
            <span className="jn-knock">what we turn it into</span>
          </div>
        </div>
      </section>

      {/* SCENE 3 — THE WHISPER / TOOL STORM */}
      <section className="jn-s3" aria-label="The tools">
        <div className="jn-pinner">
          <div className="jn-tool-count">
            <b>0</b>tools that promise decks
          </div>
          <div className="jn-storm" />
          <div className="jn-blackout" />
          <div className="jn-truth">
            <div className="jn-truth-wrap">
              <p className="jn-eyebrow">Scene 03, The Whisper</p>
              <h2>
                <span className="jn-strike">
                  The tool<i />
                </span>{' '}
                was never
                <br />
                the point. <em>The story is.</em>
              </h2>
              <p className="jn-truth-sub">Fluent in all of them. Loyal to none.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 4 — WHO DID THOSE? */}
      <section className="jn-s4" aria-label="The moment">
        <div className="jn-s4-wrap">
          <p className="jn-q">
            &quot;They&apos;re so well done.
            <br />
            Who did those?&quot;
          </p>
          <p className="jn-attr">overheard at Apple, after the presentation</p>
          <p className="jn-pitch">
            That&apos;s the moment we design for. Not the deck, the debrief.
            When the room is still talking about your slides the next day,
            when your speech and your visuals felt like one continuous thought,
            that wasn&apos;t luck. It was aligned on purpose, scene by scene,
            long before you walked in.
          </p>
          <Link className="jn-cta" href="/contact">
            Let&apos;s talk
          </Link>
        </div>
      </section>
    </div>
  )
}
