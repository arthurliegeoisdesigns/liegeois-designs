'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { clients } from '@/content/clients'
import { ScrambleEyebrow } from '@/components/ui/ScrambleEyebrow'

// Duplicate track for seamless infinite scroll
const track = [...clients, ...clients]

export default function Logos() {
  const reduced = useReducedMotion()

  return (
    <section
      className="section section-surface section-glow-top"
      style={{ borderBottom: '0.5px solid var(--color-border)', paddingTop: '72px', paddingBottom: '72px', position: 'relative' }}
    >
      {/* Eyebrow — inside container */}
      <div className="container">
        <ScrambleEyebrow style={{ color: 'var(--color-text-secondary)', textAlign: 'center', marginBottom: '40px' }}>
          THE COMPANY WE KEEP
        </ScrambleEyebrow>
      </div>

      {/* Marquee — full-width, outside container for edge-to-edge fade masks */}
      <motion.div
        className="logos-marquee"
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        viewport={{ once: true, margin: '-60px' }}
      >
        <div className="logos-track">
          {track.map((client, i) => (
            <div key={`${client.id}-${i}`} className="logos-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={client.logo}
                alt={client.name}
                className="logos-img"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
