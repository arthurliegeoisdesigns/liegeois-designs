'use client'

import Link from 'next/link'
import MagneticWrapper from '@/components/ui/MagneticWrapper'
import ObfuscatedEmail from '@/components/ui/ObfuscatedEmail'

/**
 * CTA v2 — the close (Phase 3, audit rec 25).
 * Viewport-filling Migra type, magnetic, italic-accent hover; the email
 * underneath. The whisper became the closer.
 */
export default function CTA() {
  return (
    <section
      id="contact"
      className="section-dark cta-giant"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <p className="eyebrow" style={{ color: 'var(--color-on-dark-faint)', textAlign: 'center', margin: 0 }}>
        READY TO TELL A BETTER STORY?
      </p>

      <MagneticWrapper strength={22}>
        <Link href="/contact" className="cta-giant-link" data-cursor-hover>
          <span className="cta-giant-line">
            Let&apos;s <em>talk</em>
            <span className="cta-giant-dot" aria-hidden="true">
              .
            </span>
          </span>
        </Link>
      </MagneticWrapper>

      <div className="cta-giant-sub">
        <span>The best projects start with a conversation.</span>
        <span className="cta-giant-email">
          <ObfuscatedEmail />
        </span>
      </div>
    </section>
  )
}
