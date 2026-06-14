'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { clients } from '@/content/clients'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Logos() {
  const reduced = useReducedMotion()

  return (
    <section
      className="section section-cream"
      style={{ borderBottom: '0.5px solid rgba(15,13,10,0.08)' }}
    >
      <div className="container">
        <motion.p
          className="eyebrow"
          style={{ color: 'var(--color-text-secondary)', textAlign: 'center', marginBottom: '24px' }}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          THE COMPANY WE KEEP
        </motion.p>

        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
          variants={reduced ? undefined : {
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
        >
          {clients.map((client) => (
            <motion.span
              key={client.id}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.10em',
                color: 'rgba(15,13,10,0.28)',
              }}
              variants={reduced ? undefined : itemVariants}
            >
              {client.name.toUpperCase()}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
