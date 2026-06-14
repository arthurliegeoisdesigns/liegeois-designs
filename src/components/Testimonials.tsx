'use client'

import { motion, useReducedMotion } from 'framer-motion'

const testimonials = [
  {
    name: 'Anya Pechko',
    role: 'Founder, Project Be',
    initials: 'AP',
    color: '#D63108',
    quote:
      'Arthur is a rare creative mind with the discipline of a strategist. His ability to weave narrative with visuals is unmatched. The decks he built didn\'t just support my presentations — they elevated them.',
  },
  {
    name: 'Tracy Redfern',
    role: 'Global Culture & People Ops, Bloomberg',
    initials: 'TR',
    color: '#0F0D0A',
    quote:
      'Arthur makes magic with your content, bringing it to life through storytelling. He is professional, timely, thoughtful and delivers a product you will be happy to showcase.',
  },
  {
    name: 'Harley Saftler',
    role: 'Global Director of Excellence, Ogilvy',
    initials: 'HS',
    color: '#7A7068',
    quote:
      'He worked quickly and delivered fire design under extremely high-pressured timelines. Fun, collaborative and always asks the right questions. A killer designer.',
  },
  {
    name: 'Kristen Hartley',
    role: 'Director, Global Content Marketing, Marriott',
    initials: 'KH',
    color: '#0F0D0A',
    quote:
      'His creativity and efficiency make the process feel effortless. His ability to understand intricate subject matter and create insightful data visualizations is unbelievable.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Testimonials() {
  const reduced = useReducedMotion()

  return (
    <section className="section section-surface">
      <div className="container">
        <motion.h2
          className="type-h1"
          style={{ color: 'var(--color-text-primary)', margin: '0 0 40px', maxWidth: '520px' }}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          The kind of words you can&apos;t write yourself.
        </motion.h2>

        <motion.div
          className="grid-2"
          variants={reduced ? undefined : {
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              className="testimonial-card"
              variants={reduced ? undefined : cardVariants}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="type-quote"
                style={{ color: 'var(--color-text-primary)', margin: '0 0 20px' }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  className="testimonial-avatar"
                  style={{ background: t.color }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'var(--color-text-primary)',
                      margin: 0,
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="type-caption"
                    style={{ color: 'var(--color-text-secondary)', margin: 0 }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
