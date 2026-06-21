'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CaseStudy } from '@/content/types'

const ease = [0.16, 1, 0.3, 1] as const

function NavCard({
  cs,
  direction,
}: {
  cs: CaseStudy
  direction: 'prev' | 'next'
}) {
  const [hovered, setHovered] = useState(false)
  const isPrev = direction === 'prev'

  return (
    <Link
      href={`/work/${cs.slug}`}
      style={{
        display: 'block',
        padding: 'clamp(28px, 4vw, 48px) var(--section-pad-x)',
        background: 'var(--color-dark)',
        textDecoration: 'none',
        textAlign: isPrev ? 'left' : 'right',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 250ms ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background thumbnail */}
      <AnimatePresence>
        {hovered && cs.images[0] && (
          <motion.div
            key="thumb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
            }}
          >
            <Image
              src={cs.images[0]}
              alt=""
              fill
              aria-hidden="true"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="50vw"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(10,9,9,0.78)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 400,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-on-dark-faint)',
            margin: '0 0 10px',
          }}
        >
          {isPrev ? '← Previous' : 'Next →'}
        </p>
        <motion.p
          className="type-h3"
          style={{ color: 'var(--color-on-dark)', margin: '0 0 4px' }}
          animate={{ x: hovered ? (isPrev ? -4 : 4) : 0 }}
          transition={{ duration: 0.3, ease }}
        >
          {cs.client}
        </motion.p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: 'var(--color-on-dark-muted)',
            margin: 0,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 250ms ease',
          }}
        >
          {cs.project}
        </p>
      </div>
    </Link>
  )
}

export default function CaseStudyNav({
  prev,
  next,
}: {
  prev: CaseStudy | null
  next: CaseStudy | null
}) {
  if (!prev && !next) return null

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease }}
      style={{
        display: 'grid',
        gridTemplateColumns: prev ? (next ? '1fr 1fr' : '1fr') : '1fr',
        gap: '1px',
        background: 'var(--color-on-dark-border)',
      }}
    >
      {prev && <NavCard cs={prev} direction="prev" />}
      {next && <NavCard cs={next} direction="next" />}
    </motion.nav>
  )
}
