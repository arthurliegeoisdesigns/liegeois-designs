'use client'

import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

const blocks = [
  {
    eyebrow: 'Business Acumen',
    headline: 'Most decks fail before the first slide.',
    body: "I've been in the room — on the agency side, the startup side, and the boardroom side. I know which questions investors are waiting to hear and which answers kill the deal before the room warms up. I don't just design decks. I fix the story, challenge the model, and make sure you're ready for every question before you walk in.",
  },
  {
    eyebrow: 'Human-Made Design',
    headline: "AI generates slides in seconds. That’s the problem.",
    body: "Generic inputs produce generic outputs. I use AI where it belongs — generating imagery, accelerating research. The design itself is human, intentional, and built around your story, your delivery style, and the room you’re walking into. Animation builds trigger at exactly the right moment. That’s not something a prompt can do.",
  },
]

export default function WhyArthur() {
  const reduced = useReducedMotion()

  return (
    <section
      className="section"
    >
      <div className="container">

        {/* Eyebrow */}
        <motion.p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.625rem',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            margin: '0 0 clamp(40px, 5vw, 64px)',
          }}
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease }}
        >
          What sets this apart
        </motion.p>

        {/* Two-column editorial blocks */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: '0',
          borderTop: '0.5px solid var(--color-border-mid)',
        }}>
          {blocks.map((block, i) => (
            <motion.div
              key={block.eyebrow}
              style={{
                padding: 'clamp(36px, 4.5vw, 60px) clamp(0px, 0vw, 0px)',
                paddingRight: i === 0 ? 'clamp(32px, 5vw, 72px)' : '0',
                paddingLeft: i === 1 ? 'clamp(32px, 5vw, 72px)' : '0',
                borderLeft: i === 1 ? '0.5px solid var(--color-border)' : 'none',
              }}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
            >
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.5625rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                margin: '0 0 20px',
              }}>
                {block.eyebrow}
              </p>

              <h2
                className="type-h2"
                style={{
                  color: 'var(--color-text-primary)',
                  margin: '0 0 20px',
                  maxWidth: '420px',
                }}
              >
                {block.headline}
              </h2>

              <p
                className="type-body"
                style={{
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                  maxWidth: '440px',
                  lineHeight: 1.7,
                }}
              >
                {block.body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
