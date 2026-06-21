'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { TestimonialsWidget } from '@/components/ui/TestimonialsWidget'
import { ScrambleEyebrow } from '@/components/ui/ScrambleEyebrow'

export default function Testimonials() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const orbX = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])

  return (
    <section
      ref={sectionRef}
      className="section section-dark section-surface section-glow-top"
      style={{ overflow: 'hidden', position: 'relative' }}

    >
      {/* Subtle ambient texture */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            width: '600px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.015) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            x: orbX,
            transform: 'translateX(-50%)',
          }}
        />
      )}

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <motion.div
          style={{ marginBottom: 'clamp(40px, 5vw, 72px)', maxWidth: '520px' }}
          initial={reduced ? false : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <ScrambleEyebrow>Client Love</ScrambleEyebrow>
          <h2 className="type-h1" style={{ color: 'var(--color-text-primary)', margin: 0 }}>
            The kind of words you can&apos;t write yourself.
          </h2>
        </motion.div>

        {/* New pill-avatar testimonials widget */}
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
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
