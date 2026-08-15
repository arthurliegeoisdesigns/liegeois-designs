'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

/**
 * WorkFlip — work cards that flip through real builds on hover.
 *
 * A thumbnail proves nothing; four consecutive slides from the same deck prove
 * the whole thing holds together, which is the actual claim. Progress bar makes
 * the behaviour legible rather than looking like a glitch. Static on touch and
 * under reduced motion, where the first slide simply stands.
 */

const CDN = 'https://res.cloudinary.com/dryyhpqew/image/upload/liegeois-designs'

const WORK = [
  { slug: 'chevron-new-energies', title: 'Chevron New Energies', kind: 'Strategic narrative',
    imgs: ['journey/chevron-00-cover', 'journey/chevron-03', 'journey/chevron-05', 'journey/chevron-08'] },
  { slug: 'philips-healthcare', title: 'Philips Healthcare', kind: 'Executive presentation',
    imgs: ['webflow/portfolio-slides-philips-experience-intro-0001-052b0f', 'webflow/marriott-the-luxury-group-slide-1-c397f7'] },
  { slug: 'rapp-spectrum-enterprise', title: 'Spectrum Enterprise × RAPP', kind: 'Sales deck',
    imgs: ['webflow/portfolio-slides-rapp-spectrum-0001-4046a6', 'webflow/portfolio-slides-rapp-evolus-pitch-deck-0007-19640a'] },
]

function Card({ w }: { w: (typeof WORK)[number] }) {
  const [i, setI] = useState(0)
  const timer = useRef<number | undefined>(undefined)

  const start = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return
    timer.current = window.setInterval(() => setI((n) => (n + 1) % w.imgs.length), 520)
  }
  const stop = () => { window.clearInterval(timer.current); setI(0) }

  return (
    <Link href={`/work/${w.slug}`} className="v2-wcard" onPointerEnter={start} onPointerLeave={stop}>
      <div className="v2-wshot">
        {w.imgs.map((src, n) => (
          <Image
            key={src}
            src={`${CDN}/${src}`}
            alt={n === 0 ? `${w.title}: ${w.kind}` : ''}
            fill
            sizes="(max-width: 760px) 92vw, 400px"
            quality={62}
            loading={n === 0 ? undefined : 'lazy'}
            className={n === i ? 'is-on' : ''}
            style={{ objectFit: 'cover' }}
          />
        ))}
        <div className="v2-wbar">
          {w.imgs.map((s, n) => <b key={s} className={n === i ? 'is-on' : ''} />)}
        </div>
      </div>
      <h3>{w.title}</h3>
      <span>{w.kind}</span>
      <em>{w.imgs.length} slides &rarr;</em>
    </Link>
  )
}

export default function WorkFlip() {
  return (
    <div className="v2-wgrid">
      {WORK.map((w) => <Card key={w.slug} w={w} />)}
    </div>
  )
}
