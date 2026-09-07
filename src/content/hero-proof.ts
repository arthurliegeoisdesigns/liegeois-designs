/**
 * The before/after pairs eligible for the homepage hero, and the rotation.
 *
 * WHY THIS FILE EXISTS
 * The hero pair had been a pair of hardcoded URLs in page.tsx, and it changed
 * three times in one day: MCS x Johnson & Johnson came out when it turned out
 * to be confidential, Philips took over, then NOXX. Each swap meant editing the
 * JSX. Anything that changes that often wants to be data.
 *
 * ROTATION: DAILY, BY CLIENT, CHOSEN ON THE SERVER
 *
 * Daily rather than per-visit, and server-side rather than in the browser,
 * because the hero slider is the LCP element. If the browser picked, the server
 * could not know which image to preload, so either all pairs load (roughly
 * triple the bytes on the critical path) or the chosen one arrives late and LCP
 * regresses past 4s. Choosing before the HTML is sent keeps the eager,
 * fetchPriority=high preload from 6 Sep working exactly as it did.
 *
 * BY CLIENT, not by pair. Philips has two pairs and NOXX has one. Flat random
 * across pairs would show Philips two visits in three, which would quietly
 * undo the decision that the newest work should lead. So the rotation picks a
 * CLIENT first, then a pair within that client.
 *
 * DETERMINISTIC per day, not Math.random(). Three reasons: the HTML must be
 * identical for every request within a day or the CDN cache is useless; a
 * crawler and a visitor must see the same page; and a deterministic function
 * can be tested, which Math.random() cannot.
 */

export type ProofPair = {
  before: string
  after: string
  /** Cloudinary version segment, which differs per upload. */
  slide: string
}

export type ProofClient = {
  client: string
  pairs: ProofPair[]
}

/** Cloudinary base. f_auto,q_auto so the browser gets AVIF or WebP if it can. */
const CL = 'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto,w_1600'

/**
 * ELIGIBILITY IS A JUDGEMENT, NOT A DUMP.
 * A pair earns the homepage only if the BEFORE is legible at slider size and
 * the transformation reads without a caption. Both frames of a pair must be
 * identical in dimensions and framing: the reveal is a clip-path over stacked
 * images, not a crossfade, so a mismatch reads as the slide jumping rather
 * than changing.
 *
 * NOT HERE, deliberately:
 *   MCS x Johnson & Johnson — three pairs, withdrawn 7 Sep as confidential.
 *     Do not restore without a contract check. See git 051d52d.
 */
export const HERO_PROOF: ProofClient[] = [
  {
    client: 'NOXX Therapeutics',
    pairs: [
      {
        before: `${CL}/v1788797349/noxx-before-01.jpeg.001_y40fth.jpg`,
        after: `${CL}/v1788796912/noxx-after-01_bawda3.jpg`,
        slide: 'NX-022-ISAC, Seed C',
      },
    ],
  },
  {
    client: 'Philips Healthcare',
    pairs: [
      {
        before: `${CL}/v1788697490/philips-07-before_lkszxd.jpg`,
        after: `${CL}/v1788697491/philips-07-after_efbciw.jpg`,
        slide: 'Our key ESG commitments',
      },
      {
        before: `${CL}/v1788697475/philips-02-before_obbdot.jpg`,
        after: `${CL}/v1788697475/philips-02-after_bu38j3.jpg`,
        slide: 'The Quadruple Aim',
      },
    ],
  },
]

/** Chosen so HERO_PROOF[0] leads on 7 Sep 2026, the day the rotation shipped. */
const ROTATION_PHASE = 1

/** Days since the Unix epoch, in UTC. The rotation key. */
export function dayIndex(now: Date = new Date()): number {
  return Math.floor(now.getTime() / 86_400_000)
}

/**
 * Pick the pair for a given day.
 *
 * Client first, then pair within that client. The two indices use different
 * divisors so they do not advance in lockstep: with a single counter, Philips
 * would always show the same one of its two pairs on the days it came up.
 */
export function proofForDay(day: number = dayIndex()): ProofPair & { client: string } {
  const clients = HERO_PROOF.filter((c) => c.pairs.length > 0)
  if (clients.length === 0) throw new Error('HERO_PROOF has no eligible pairs')

  // Phase so the FIRST entry leads on the day this shipped. Without it the
  // cycle happened to start on Philips, and the newest work would not have
  // appeared until the following day. Only affects which day is which.
  day += ROTATION_PHASE

  const c = clients[day % clients.length]
  // integer-divide by the client count so this advances once per full cycle
  const p = c.pairs[Math.floor(day / clients.length) % c.pairs.length]
  return { ...p, client: c.client }
}
