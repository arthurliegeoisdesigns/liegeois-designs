'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { TestimonialsWidget } from '@/components/ui/TestimonialsWidget'

export default function Testimonials() {
  const reduced = useReducedMotion()

  return (
    <section
      className="section section-dark section-surface section-glow-top"
      style={{ overflow: 'hidden', position: 'relative' }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header — scrubbed line reveal (ScrollReveals) */}
        <div style={{ marginBottom: 'clamp(40px, 5vw, 72px)', maxWidth: '560px' }}>
          <h2
            data-reveal
            className="type-h1"
            style={{ color: 'var(--color-text-primary)', margin: 0 }}
          >
            The kind of words you can&apos;t write yourself.
          </h2>
        </div>

        {/* Pill-avatar testimonials widget */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          viewport={{ once: true, margin: '-80px' }}
          className="glass-card"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {/* Top rule */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: '5%',
              right: '5%',
              height: '0.5px',
              background: 'rgba(255,255,255,0.08)',
            }}
          />
          <TestimonialsWidget />
        </motion.div>
      </div>
    </section>
  )
}
