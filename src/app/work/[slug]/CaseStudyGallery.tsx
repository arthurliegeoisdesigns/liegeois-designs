'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

export default function CaseStudyGallery({
  images,
  client,
}: {
  images: string[]
  client: string
}) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const close = useCallback(() => setLightbox(null), [])
  const prev = useCallback(() => setLightbox((i) => (i !== null ? Math.max(0, i - 1) : 0)), [])
  const next = useCallback(
    () => setLightbox((i) => (i !== null ? Math.min(images.length - 1, i + 1) : 0)),
    [images.length]
  )

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, prev, next, close])

  if (images.length === 0) return null

  const [featured, ...rest] = images

  return (
    <>
      {/* ── Featured slide — full width ── */}
      <motion.button
        onClick={() => setLightbox(0)}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease }}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          border: 'none',
          padding: 0,
          cursor: 'zoom-in',
          overflow: 'hidden',
          display: 'block',
          marginBottom: rest.length > 0 ? '3px' : 0,
        }}
        whileHover="hover"
      >
        <Image
          src={featured}
          alt={`${client} — slide 2`}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 960px) 100vw, 960px"
        />
        <motion.div
          variants={{ hover: { opacity: 1 } }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10,9,9,0.28)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.80)',
            }}
          >
            View full size ↗
          </span>
        </motion.div>
      </motion.button>

      {/* ── Remaining slides — 2-col grid ── */}
      {rest.length > 0 && (
        <div className="gallery-grid">
          {rest.map((src, i) => (
            <motion.button
              key={src + i}
              onClick={() => setLightbox(i + 1)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, ease, delay: (i % 4) * 0.07 }}
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                border: 'none',
                padding: 0,
                cursor: 'zoom-in',
                overflow: 'hidden',
                display: 'block',
                background: 'var(--color-charcoal)',
              }}
              whileHover={{ scale: 1.015, transition: { duration: 0.35, ease } }}
            >
              <Image
                src={src}
                alt={`${client} — slide ${i + 3}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 50vw, 480px"
              />
            </motion.button>
          ))}
        </div>
      )}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(8, 8, 9, 0.96)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
          >
            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.28, ease }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '1200px',
                aspectRatio: '16/9',
                overflow: 'hidden',
              }}
            >
              <Image
                src={images[lightbox]}
                alt={`${client} — slide ${lightbox + 2}`}
                fill
                style={{ objectFit: 'contain' }}
                sizes="100vw"
              />
            </motion.div>

            {/* Close */}
            <button
              onClick={close}
              style={{
                position: 'fixed',
                top: '24px',
                right: '24px',
                background: 'none',
                border: '0.5px solid rgba(255,255,255,0.20)',
                color: 'rgba(255,255,255,0.60)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                padding: '8px 16px',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              Close ×
            </button>

            {/* Prev */}
            {lightbox > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                aria-label="Previous slide"
                style={{
                  position: 'fixed',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.08)',
                  border: '0.5px solid rgba(255,255,255,0.18)',
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: '1.1rem',
                  width: '44px',
                  height: '44px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ←
              </button>
            )}

            {/* Next */}
            {lightbox < images.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                aria-label="Next slide"
                style={{
                  position: 'fixed',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.08)',
                  border: '0.5px solid rgba(255,255,255,0.18)',
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: '1.1rem',
                  width: '44px',
                  height: '44px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                →
              </button>
            )}

            {/* Counter */}
            <div
              style={{
                position: 'fixed',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                color: 'rgba(255,255,255,0.40)',
                letterSpacing: '0.10em',
              }}
            >
              {lightbox + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
