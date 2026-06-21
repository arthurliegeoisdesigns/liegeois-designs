'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { caseStudies } from '@/content/case-studies'
import { ScrambleEyebrow } from '@/components/ui/ScrambleEyebrow'

/* ── Bento cell definitions ─────────────────────────────────
   12-col grid, 3 row heights — 6 items:
   Row 1+2 (tall): A spans cols 1-7, rows 1-2
   Row 1:          B spans cols 8-13
   Row 2:          C spans cols 8-13 (Echo gets full right width)
   Row 3:          D cols 1-5, E cols 5-9, F cols 9-13
   ─────────────────────────────────────────────────────────── */
const CELLS = [
  {
    src: 'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdc74bd6bad20709672_683f46b683ae96a1c334fcb4_6830bafcc24aad0888102a9b_Fivestone%252520-%252520Chevron%2525201_1.jpeg',
    client: 'Chevron New Energies',
    format: 'Executive Presentation',
    slug: 'chevron-new-energies',
    gridColumn: '1 / 8',
    gridRow: '1 / 3',
  },
  {
    src: 'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68cae362b6f7edca9f846307_Marriott_The_Luxury_Group_Slide_1.avif',
    client: 'Marriott Luxury Group',
    format: 'Executive Presentation',
    slug: 'marriott-luxury-group',
    gridColumn: '8 / 13',
    gridRow: '1 / 2',
  },
  {
    src: 'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55bdca84275b62afc2282_6851c05f787e5e92c62ed1eb_221114_Echo_Society_Show_009.001.jpeg',
    client: 'Echo Society',
    format: 'Pitch & Investor Deck',
    slug: 'echo-society',
    gridColumn: '8 / 13',
    gridRow: '2 / 3',
  },
  {
    src: 'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be076a5b0a46c2f83e8_683f46b95f3aad03b0cb2e3a_681ba9dcdcb982e09a6e1696_Portfolio_Slides_Philips-Experience-Intro_0001.jpeg',
    client: 'Philips Healthcare',
    format: 'Executive Presentation',
    slug: 'philips-healthcare',
    gridColumn: '1 / 5',
    gridRow: '3 / 4',
  },
  {
    src: 'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be1473ae2fd117e5f13_683f46bad2c7f4eec55f8758_6830b0d200991d0e8d6cdabc_Portfolio_Slides_RAPP-Spectrum_0001.webp',
    client: 'Spectrum × RAPP',
    format: 'Sales & Agency Deck',
    slug: 'rapp-spectrum-enterprise',
    gridColumn: '5 / 9',
    gridRow: '3 / 4',
  },
  {
    src: 'https://cdn.prod.website-files.com/68b0ab1a8e3edfd3ce5e46b9/68b55be15b2139addb3912b6_683f46ba0845e65a13ecb3a3_6830b476a23481588a2f808f_Portfolio_Slides_RAPP-Evolus-Pitch-Deck_0007.jpeg',
    client: 'Evolus × RAPP',
    format: 'Pitch & Investor Deck',
    slug: 'rapp-and-evolus',
    gridColumn: '9 / 13',
    gridRow: '3 / 4',
  },
] as const

const GAP = '5px'

export default function Portfolio() {
  const reduced = useReducedMotion()

  return (
    <section id="work" style={{ background: '#ffffff' }}>

      {/* Section header */}
      <div
        className="container"
        style={{ paddingTop: 'var(--section-pad-y)', paddingBottom: 'clamp(48px, 5vw, 72px)' }}
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <ScrambleEyebrow>Selected Work</ScrambleEyebrow>
          <h2
            className="type-h1"
            style={{ color: 'var(--color-text-primary)', margin: '0 0 14px', maxWidth: '640px' }}
          >
            Work that changed the room.
          </h2>
          <p
            className="type-body"
            style={{ color: 'var(--color-text-secondary)', maxWidth: '480px', margin: 0 }}
          >
            Each project built to shift something — in the room, in the market,
            in how an audience sees a brand.
          </p>
        </motion.div>
      </div>

      {/* Bento mosaic — full-width, edge-to-edge */}
      <div
        className="bento-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: 'clamp(200px, 23.4vw, 340px) clamp(110px, 14vw, 200px) clamp(140px, 18.75vw, 270px)',
          gap: GAP,
          paddingLeft: GAP,
          paddingRight: GAP,
          paddingBottom: GAP,
        }}
      >
        {CELLS.map((cell, i) => (
          <motion.div
            key={cell.slug}
            style={{
              gridColumn: cell.gridColumn,
              gridRow: cell.gridRow,
              position: 'relative',
              overflow: 'hidden',
            }}
            initial={reduced ? false : { opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Link
              href={`/work/${cell.slug}`}
              style={{ display: 'block', position: 'absolute', inset: 0 }}
              className="bento-cell"
            >
              <Image
                src={cell.src}
                alt={`${cell.client} — ${cell.format}`}
                fill
                priority={i < 2}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />

              {/* Hover: dark gradient + label */}
              <div className="bento-hover-overlay" aria-hidden="true" />
              <div className="bento-hover-label">
                <p className="bento-label-format">{cell.format}</p>
                <p className="bento-label-client">{cell.client}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Footer link */}
      <div
        className="container"
        style={{ paddingTop: 'clamp(32px, 4vw, 48px)', paddingBottom: 'var(--section-pad-y)' }}
      >
        <Link href="/work" className="btn-text" style={{ fontSize: '0.9375rem' }}>
          View All {caseStudies.length} Projects →
        </Link>
      </div>

    </section>
  )
}
