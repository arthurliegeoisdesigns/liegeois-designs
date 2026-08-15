'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * HowThisWorks — the qualifier (Aug 2026).
 *
 * This is the only section on the site that tells someone not to hire Arthur,
 * and that is the point. Clients arrive wanting a deck made pretty; he
 * challenges the narrative in the first call and most of them like it. One
 * decided he was not a fit. This section moves that discovery to the homepage,
 * where it costs nobody three weeks.
 *
 * The SPIN Selling line is the load-bearing one: it converts "he pushed back on
 * my deck" from a personality risk into a named, certified method (Huthwaite).
 * No competing presentation agency can claim it.
 *
 * Lives inside .light-sheet on the homepage, so it inherits the bone theme.
 */

const ease = [0.16, 1, 0.3, 1] as const

export default function HowThisWorks() {
  const reduced = useReducedMotion()

  return (
    <section className="section htw">
      <div className="container">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="htw-eyebrow">How this works</p>
          <h2 className="type-h2 htw-h2">
            You’ll come for the design.
            <br />
            We start with the story.
          </h2>
        </motion.div>

        <div className="htw-body">
          <motion.p
            className="type-body htw-p"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          >
            Most clients arrive with a deck that needs to look better. We usually
            get three slides in before I ask why slide four exists.
          </motion.p>

          <motion.p
            className="type-body htw-p"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, ease, delay: 0.16 }}
          >
            That is not a detour. It is the work. I trained in SPIN Selling at
            Huthwaite, a formal method for asking the questions that surface what
            a decision-maker actually needs to hear. I run it on your narrative
            before I open a design file.
          </motion.p>

          {/* The filter. Accent rule marks it as the turn, not a footnote. */}
          <motion.p
            className="type-body htw-p htw-filter"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, ease, delay: 0.24 }}
          >
            Some people don’t want that. If what you need is a set of hands
            on an existing deck, I am the wrong call, and I would rather say so
            now than three weeks in.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
