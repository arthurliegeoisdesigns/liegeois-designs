'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { links } from '@/lib/config'

export default function CTA() {
  const reduced = useReducedMotion()

  return (
    <section id="contact" className="section section-dark">
      <div
        className="container"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
      >
        <motion.div
          style={{ maxWidth: '500px' }}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <span className="eyebrow">START A PROJECT</span>

          <h2 className="type-h1" style={{ color: 'var(--color-on-dark)', margin: '0 0 16px' }}>
            Ready to tell a better story?
          </h2>

          <p className="type-body-lg" style={{ color: 'var(--color-on-dark-muted)', margin: '0 0 40px' }}>
            The best projects start with a conversation. Let&apos;s have one.
          </p>

          <div
            style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}
          >
            <a
              href={links.calendly}
              className="btn-primary btn-primary-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Call
            </a>
            <a
              href={links.linkedin}
              className="btn-text"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow on LinkedIn ↗
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
