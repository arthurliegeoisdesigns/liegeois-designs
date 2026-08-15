'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { links } from '@/lib/config'

/**
 * HeroDeck — homepage v2 hero.
 *
 * LCP NOTE, DO NOT UNDO
 * The mockup revealed the h1 word by word from behind an overflow:hidden mask.
 * That cannot ship: clipped text is never painted, so Chrome will not score it,
 * and this h1 is the LCP element. It paints immediately here and the CARDS do
 * the animating instead. Same felt effect, no LCP cost.
 *
 * Cards deal in back-to-front, then settle into three idle floats on
 * deliberately mismatched periods (8s / 9s / 11s) so they never sync. Faces
 * angle INWARD (negative rotateY) toward the headline; angled away they read
 * as turning their back on the copy.
 */

const CARDS = [
  { cls: 'v2-c1', src: 'https://res.cloudinary.com/dryyhpqew/image/upload/liegeois-designs/webflow/marriott-the-luxury-group-slide-1-c397f7', alt: '' },
  { cls: 'v2-c2', src: 'https://res.cloudinary.com/dryyhpqew/image/upload/liegeois-designs/webflow/portfolio-slides-university-startups-pitch-deck-0001-8eedd5', alt: '' },
  { cls: 'v2-c3', src: 'https://res.cloudinary.com/dryyhpqew/image/upload/liegeois-designs/webflow/portfolio-slides-echo-society-pitch-deck-0001-51d816', alt: 'Echo Society investor deck cover, designed by Liégeois Designs' },
]

export default function HeroDeck() {
  const stage = useRef<HTMLDivElement>(null)
  const tilt = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<'idle' | 'ready' | 'settled'>('idle')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('settled')
      return
    }
    const a = requestAnimationFrame(() => setPhase('ready'))
    const t = window.setTimeout(() => setPhase('settled'), 1750)
    return () => { cancelAnimationFrame(a); window.clearTimeout(t) }
  }, [])

  useEffect(() => {
    const el = stage.current, t = tilt.current
    if (!el || !t) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      t.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 7}deg)`
    }
    const leave = () => { t.style.transform = '' }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
  }, [])

  return (
    <header className={`v2-hero ${phase !== 'idle' ? 'is-ready' : ''} ${phase === 'settled' ? 'is-settled' : ''}`}>
      <div className="v2-hero-copy">
        <p className="v2-eyebrow">Presentation design for founders and executives</p>
        {/* No opacity or mask animation on this element, ever. See note above. */}
        <h1 className="v2-h1">
          Your story, told<br />so the room <em>moves</em>.
        </h1>
        <p className="v2-bridge">
          I&rsquo;ve raised my own round, and I build the decks Fortune&nbsp;500s take
          into board rooms. Your investors are institutions. I speak both languages.
        </p>
        <div className="v2-acts">
          <a className="v2-cta" href={links.calendly}>Book a call</a>
          <Link className="v2-ghost" href="/work">See the work</Link>
        </div>
      </div>

      <div className="v2-stage" ref={stage} aria-hidden="true">
        <div className="v2-tilt" ref={tilt}>
          {CARDS.map((c, i) => (
            <div key={c.cls} className={`v2-card ${c.cls}`}>
              <Image
                src={c.src}
                alt={c.alt}
                fill
                sizes="(max-width: 940px) 74vw, 42vw"
                quality={i === 2 ? 72 : 58}
                loading={i === 2 ? undefined : 'lazy'}
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
