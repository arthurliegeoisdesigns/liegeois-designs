'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Credentials — the credibility band (Aug 2026).
 *
 * WHY THIS EXISTS
 * Search Console (3 months to 15 Aug 2026) showed zero impressions for any
 * query containing "presentation", "pitch", "deck" or "slide". The site had a
 * relevance problem, not a ranking problem, and the deeper issue was that the
 * strategic claim ("Structure first, design second") carried no proof.
 *
 * Arthur's clients arrive wanting a deck made pretty and get converted to
 * strategy in the first call. This section does that conversion earlier, on the
 * page, by showing WHY the challenge is credible: he has occupied all three
 * seats in the room. Competing agencies quote their clients' raise totals
 * ($3B, $500M). The $110,000 here is his own money, raised on his own deck,
 * which is the one claim none of them can make.
 *
 * Every figure traces to his resume. Nothing here is inferred or rounded up.
 * See docs/ and KEYWORD-MAP.md in the workspace root.
 */

const ease = [0.16, 1, 0.3, 1] as const

const seats = [
  {
    seat: 'The one pitching',
    org: 'Oracle',
    years: '2002 – 2006',
    body:
      'Global key account manager in Paris, carrying more than $10 million a year. Quota Club four years running.',
  },
  {
    seat: 'The one raising',
    org: 'Norigami',
    years: '2016 – 2020',
    body:
      'Founded a food and beverage brand in London. Raised $110,000 on a deck I made myself. Selfridges stocked us.',
  },
  {
    seat: 'The one being pitched to',
    org: 'Smartbox Group',
    years: '2006 – 2010',
    body:
      'COO of a 35-person business in Lisbon, on the receiving end of everyone else’s slides.',
  },
]

export default function Credentials() {
  const reduced = useReducedMotion()

  return (
    <section className="section section-dark cred">
      <div className="container">
        <div className="cred-grid">
          {/* ── argument ── */}
          <motion.div
            className="cred-copy"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="cred-eyebrow">Before I was the designer</p>
            <h2 className="type-h2 cred-h2">I learned the stakes first.</h2>
            <p className="type-body cred-lead">
              Most presentation designers learn the craft, then learn the stakes.
              I did it in the other order, for twenty years.
            </p>
          </motion.div>

          {/* ── ledger ── */}
          <div className="cred-ledger">
            {seats.map((s, i) => (
              <motion.div
                key={s.org}
                className="cred-row"
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease, delay: 0.08 + i * 0.09 }}
              >
                <p className="cred-seat">{s.seat}</p>
                <p className="cred-org">
                  {s.org}
                  <span className="cred-years">{s.years}</span>
                </p>
                <p className="cred-body">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── the close ── */}
        <motion.p
          className="cred-close"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
        >
          Today I write Keynotes for Apple Engineering executives. I know what
          lands in a room because I have been the one pitching, the one raising,
          and the one being pitched to.
        </motion.p>
      </div>
    </section>
  )
}
