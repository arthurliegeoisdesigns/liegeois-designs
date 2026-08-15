/**
 * ServiceProof — the author band on service pages (Aug 2026).
 *
 * The service pages are the SEO backbone: the plan is to acquire on
 * presentation-design intent and convert on narrative. But conversion needs
 * someone credible doing the arguing, and until now these pages made the
 * strategic case with nobody standing behind it.
 *
 * Deliberately NOT identical per page. Someone landing on /pitch-deck-design
 * from "pitch deck design services" needs a different proof than someone on
 * /executive-presentations, so each page leads with the credential that
 * answers its own buyer's doubt. The three stat columns stay constant so it
 * reads as one studio rather than four different pitches.
 *
 * Server component: pure content, no interactivity, so it costs no JS and
 * lands in the server HTML where crawlers read it.
 *
 * Every figure traces to Arthur's resume. See COPY-POSITIONING.md.
 */

type Stat = { label: string; detail: string }

const ORACLE: Stat = { label: 'Oracle Quota Club', detail: 'Four years running, carrying $10M+' }
const RAISED: Stat = { label: 'Raised $110,000', detail: 'For my own company, on my own deck' }
const SPIN: Stat = { label: 'SPIN Selling', detail: 'Huthwaite certified' }
const APPLE: Stat = { label: 'Apple, Paris', detail: 'Strategic presentations to C-suite' }
const COO: Stat = { label: 'COO, 35 people', detail: 'Four years being presented to' }

const BY_SLUG: Record<string, { lead: string; stats: Stat[] }> = {
  'pitch-deck-design': {
    lead:
      'I have raised money on a deck I built myself. Every agency you are comparing me to quotes what their clients raised. The $110,000 below is mine, and I remember exactly which slide the room stopped on.',
    stats: [RAISED, ORACLE, SPIN],
  },
  'executive-presentations': {
    lead:
      'I spent four years delivering strategic presentations to C-suite audiences at Apple, and four more as a COO on the receiving end of everyone else’s. I know what a board hears and what it quietly discards.',
    stats: [APPLE, COO, ORACLE],
  },
  'sales-agency-decks': {
    lead:
      'Before I designed a single slide I spent twenty years carrying a number. I have written the proposal, walked it into the room, and watched it win or die on the third slide.',
    stats: [ORACLE, SPIN, RAISED],
  },
  'training-keynote-design': {
    lead:
      'I have stood on the other side of this: four years delivering strategic presentations to C-suite audiences at Apple, across nine Paris stores. I know what a room looks like at minute forty, and I build decks that survive it.',
    stats: [APPLE, SPIN, ORACLE],
  },
  'strategic-narrative': {
    lead:
      'I trained in SPIN Selling at Huthwaite, a formal method for asking the questions that surface what a decision-maker actually needs to hear. I run it on your narrative before I open a design file.',
    stats: [SPIN, ORACLE, RAISED],
  },
}

export default function ServiceProof({ slug }: { slug: string }) {
  const proof = BY_SLUG[slug]
  if (!proof) return null

  return (
    <section className="svc-proof" aria-label="Why me">
      <div className="svc-proof-inner">
        <p className="svc-proof-eyebrow">Who is behind this</p>
        <p className="svc-proof-lead">{proof.lead}</p>
        <dl className="svc-proof-stats">
          {proof.stats.map((s) => (
            <div key={s.label} className="svc-proof-stat">
              <dt className="svc-proof-stat-label">{s.label}</dt>
              <dd className="svc-proof-stat-detail">{s.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
