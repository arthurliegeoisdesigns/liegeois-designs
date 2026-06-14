'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import SectionCut from './SectionCut'
import { featuredCaseStudies } from '@/content/case-studies'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Portfolio() {
  const reduced = useReducedMotion()

  return (
    <section id="work" className="section section-cream">
      <div className="container">
        {/* Header */}
        <motion.div
          style={{ marginBottom: '48px', maxWidth: '600px' }}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <h2 className="type-h1" style={{ color: 'var(--color-text-primary)', margin: '0 0 16px' }}>
            Work that changed the room.
          </h2>
          <p className="type-body" style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
            Each project built to shift something — in the room, in the market,
            in how an audience sees a brand.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid-3"
          variants={reduced ? undefined : {
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredCaseStudies.map((cs) => (
            <motion.article
              key={cs.slug}
              className="portfolio-card"
              variants={reduced ? undefined : cardVariants}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="portfolio-card-image">
                <Image
                  src={cs.images[0]}
                  alt={`${cs.client} — ${cs.project}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="portfolio-card-body">
                <p
                  className="type-label"
                  style={{ color: 'var(--color-text-secondary)', marginBottom: '6px' }}
                >
                  {cs.format} · {cs.year}
                </p>
                <h3 className="type-h3" style={{ color: 'var(--color-text-primary)', margin: '0 0 6px' }}>
                  {cs.client}
                </h3>
                <p className="type-caption" style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                  {cs.tagline}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <SectionCut from="cream" to="dark" />
    </section>
  )
}
