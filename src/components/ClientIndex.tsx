'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion'
import { clients } from '@/content/clients'
import { workLiteBySlug } from '@/content/home-work'

/**
 * ClientIndex — replaces the logo marquee (audit rec 22).
 * A typographic index of the client roster set in Migra: hovering a name
 * floats a live slide preview from that client's case study alongside the
 * cursor; names with case studies link through. No loops, no logos —
 * the roster becomes an experience instead of wallpaper.
 */

const FEATURED_IDS = [
  'chevron', 'google', 'apple', 'ibm', 'bloomberg', 'philips',
  'jandj', 'iaa', 'marriott', 'ogilvy', 'rapp', 'mastercard',
]

/** client id → case study slug (only where a study exists) */
const STUDY_BY_CLIENT: Record<string, string> = {
  chevron: 'chevron-new-energies',
  marriott: 'marriott-luxury-group',
  philips: 'philips-healthcare',
  jandj: 'mcs-healthcare-jandj',
  iaa: 'international-advertising-association',
  rapp: 'rapp-opmg',
}

type Entry = {
  id: string
  name: string
  slug?: string
  image?: string
  project?: string
}

const entries: Entry[] = FEATURED_IDS.map((id) => {
  const client = clients.find((c) => c.id === id)
  const slug = STUDY_BY_CLIENT[id]
  const study = slug ? workLiteBySlug[slug] : undefined
  return {
    id,
    name: client?.name ?? id,
    slug: study?.slug,
    image: study?.image,
    project: study?.project,
  }
})

export default function ClientIndex() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState<Entry | null>(null)

  // Preview follows the cursor on a lazy spring
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.6 })
  const py = useSpring(my, { stiffness: 120, damping: 20, mass: 0.6 })

  function onMove(e: React.MouseEvent) {
    mx.set(e.clientX + 28)
    my.set(e.clientY - 120)
  }

  return (
    <section
      className="section section-surface section-dark section-glow-top"
      style={{ position: 'relative' }}
      onMouseMove={reduced ? undefined : onMove}
    >
      <div className="container">
        <p
          className="eyebrow"
          style={{ color: 'var(--color-text-secondary)', marginBottom: 'clamp(32px, 4vw, 56px)' }}
        >
          THE COMPANY WE KEEP
        </p>

        <div className="client-index" role="list">
          {entries.map((entry, i) => {
            const inner = (
              <>
                <span className="client-index-name">{entry.name}</span>
                {i < entries.length - 1 && (
                  <span className="client-index-sep" aria-hidden="true">
                    /
                  </span>
                )}
              </>
            )
            const shared = {
              role: 'listitem' as const,
              onMouseEnter: () => setActive(entry),
              onMouseLeave: () => setActive(null),
            }
            return entry.slug ? (
              <Link
                key={entry.id}
                href={`/work/${entry.slug}`}
                className="client-index-item is-linked"
                aria-label={`${entry.name} — view case study`}
                data-cursor="View"
                {...shared}
              >
                {inner}
              </Link>
            ) : (
              <span key={entry.id} className="client-index-item" {...shared}>
                {inner}
              </span>
            )
          })}
        </div>
      </div>

      {/* Floating slide preview */}
      {!reduced && (
        <AnimatePresence>
          {active?.image && (
            <motion.div
              key={active.id}
              aria-hidden="true"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                x: px,
                y: py,
                width: 'min(340px, 30vw)',
                aspectRatio: '16 / 10',
                zIndex: 50,
                pointerEvents: 'none',
                overflow: 'hidden',
                border: '0.5px solid rgba(255,253,248,0.18)',
                rotate: -2.5,
              }}
              initial={{ opacity: 0, scale: 0.85, clipPath: 'inset(50% 0% 50% 0%)' }}
              animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.image}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {active.project && (
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: '8px 12px',
                    background: 'linear-gradient(to top, rgba(7,6,5,0.85), transparent)',
                    color: 'var(--color-on-dark)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {active.project}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  )
}
