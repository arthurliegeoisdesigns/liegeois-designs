import Link from 'next/link'
import { links, SITE, PERSON_SAME_AS, ORG_ID, PERSON_ID } from '@/lib/config'
import { publishedPosts } from '@/content/blog-posts'
import ClientMarquee from '@/components/v2/ClientMarquee'
import ProofSlider from '@/components/v2/ProofSlider'
import WorkFlip from '@/components/v2/WorkFlip'

/**
 * Homepage (rebuilt 15 Aug 2026, replacing the journey).
 *
 * WHAT THIS REPLACED
 * A 36-screen page: a five-scene pinned journey (wormhole canvas, 10-build
 * sequence, scattered-to-aligned doors, a 33-tool competitor inventory) plus
 * eleven client components and seven ambient effect layers. Roughly 15 screens
 * of scroll before any non-hero content, which meant the credibility band
 * measured 17.9 screens down and nobody ever reached it.
 *
 * Arthur's critique: dark, over-produced, motion doing work the content should
 * do. It also argued against its own thesis, since a studio selling streamlined
 * narrative should not ship a scroll epic.
 *
 * Now ~6 screens, six sections, and everything that moves has a job.
 *
 * UPDATED 6-7 Sep 2026. Two things above are no longer true and are corrected
 * rather than deleted, because the old text is what someone would rely on:
 *   "light"  — the site is dark throughout under THE ROOM.
 *   "HeroDeck" — removed. Direction B made ProofSlider the hero, so the deck
 *                that used to open the page is gone (git: 4f6649a).
 *
 * Server component. THREE client islands: ClientMarquee (scroll velocity),
 * ProofSlider (drag), WorkFlip (hover). Every word a crawler needs is
 * server-rendered, and none of them is dynamic({ssr:false}).
 */

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Arthur Liégeois',
  jobTitle: 'Presentation Designer & Strategic Storyteller',
  url: SITE,
  image: `${SITE}/images/arthur-liegeois.jpg`,
  // Person, not organisation. The company LinkedIn and the YouTube channel
  // identify the STUDIO and live on the Organization in layout.tsx. Pointing
  // both entities at both sets tells an engine they are the same thing.
  sameAs: PERSON_SAME_AS,
  knowsAbout: [
    'Pitch Deck Design', 'Executive Presentations', 'Investor Decks',
    'Visual Storytelling', 'Strategic Narrative', 'Presentation Design', 'Sales Decks',
  ],
  /**
   * EMPLOYERS, not clients. Both ChatGPT and Gemini currently list Apple and
   * Oracle among the portfolio, which is a credibility risk the moment a
   * recruiter or prospect probes it. worksFor is the unambiguous signal, and
   * an array is valid: Arthur runs the studio and holds the Apple role
   * concurrently.
   *
   * Apple is NAMED and nothing more. No jobTitle, no description, no work.
   * Arthur confirmed on 7 Sep that naming is cleared; describing the work is
   * not, and that line does not move without him.
   *
   * Client work stays where it belongs, in the case study schema.
   */
  worksFor: [
    { '@id': ORG_ID },
    { '@type': 'Organization', name: 'Apple Inc.', url: 'https://www.apple.com' },
  ],
}

/* businessSchema was a SECOND ProfessionalService for the same studio,
   declared here as well as in layout.tsx and disagreeing with it on
   areaServed. Removed 7 Sep; its unique fields (hasOfferCatalog, priceRange)
   moved into the layout node, which now carries a stable @id. One
   organisation, declared once. */

const SEATS = [
  { seat: 'The one pitching', org: 'Oracle', years: '2001 – 2006',
    body: '$10M+ a year. Quota Club four years running.' },
  { seat: 'Being pitched to', org: 'Smartbox', years: '2006 – 2010',
    body: 'COO of 35 people, on the receiving end of everyone else’s slides.' },
  { seat: 'In front of the room', org: 'Apple', years: '2011 – 2015',
    body: 'Strategic presentations to C-suite audiences.' },
  { seat: 'The one raising', org: 'Norigami', years: '2016 – 2020',
    body: 'Raised $110,000 on a deck I made myself.' },
]

/* NOXX Therapeutics, added 7 Sep 2026 and cleared by Arthur. It replaces the
   Philips 07 pair, which replaced the MCS x Johnson & Johnson pair when that
   turned out to be confidential. Philips keeps both of its pairs on its own
   case study; nothing is lost by moving it off the hero.

   Why NOXX earns the hero over Philips:
   - The AFTER is dark. On the old bone site a white slide sat fine; on this
     palette a dark cinematic frame belongs and a white one punches a hole.
   - The BEFORE is genuinely bad rather than merely busy. Centred Arial on
     white with a literal "$???" placeholder is the slide every founder
     recognises from their own deck.
   - "Seed C round" speaks directly to the audience the page is written for.
   - The number arrives at the moment it should: $??? becomes $82 billion.
     That is the studio's whole argument about timing, in one drag.

   Both frames are 1920x1080. The first BEFORE upload was 960x540, which would
   have softened at full width; Arthur re-exported it the same day. The slider
   depends on the two being pixel-identical in size and framing, because the
   reveal is a clip-path over stacked images rather than a crossfade — a
   mismatch reads as the slide jumping rather than changing. Verified: both
   1920x1080, aspect 1.7778. */
const BA = 'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto,w_1600'

export default function Home() {
  const posts = publishedPosts.slice(0, 3)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <main className="v2">
        {/* ── THE HERO IS THE PROOF. Direction B, chosen 6 Sep 2026.
            Previously the page opened with a headline and a stack of slide
            mockups, and the before/after sat two screens down as section three.
            Arthur picked proof before poetry: the most persuasive thing on the
            site should not be below the fold, and a drag interaction people
            never scroll to is a drag interaction nobody uses.

            The old hero copy is not lost. The eyebrow keeps the positioning
            line, which is also the page's strongest keyword signal, and the
            credibility bridge moves into the right column so it still lands
            above the fold. What went is the card stack, which was doing the
            job the slider now does, better. It is in git if it is ever wanted:
            src/components/v2/HeroDeck.tsx at 4f6649a. ── */}
        <header className="v2-phero">
          <div className="v2-w">
            <div className="v2-phead">
              <div>
                <p className="v2-eyebrow">Presentation design for founders and executives</p>
                {/* LCP NOTE, INHERITED AND STILL TRUE: no opacity or mask
                    animation on this element, ever. Clipped text is never
                    painted, so Chrome will not score it. The slider is now
                    almost certainly the LCP element instead, which is why it
                    is passed priority. */}
                <h1 className="v2-h1">Nothing was added.</h1>
              </div>
              <div className="v2-phero-side">
                <p className="v2-lede">
                  The argument was already in the deck, buried under everything
                  competing with it. Drag it yourself.
                </p>
                {/* Arthur's own drafted wording, 7 Sep. Trimmed to the first two
                    sentences: his draft closed with "Most designers get handed a
                    pile of slides. I rebuild the story first, then design it.",
                    which is the same argument the h1 and the slider directly
                    above are already making. Those two sentences moved to the
                    about page, where they have room to land instead of
                    competing. Apple is named; the work is not shown. */}
                <p className="v2-bridge">
                  I write executive keynotes inside Apple&rsquo;s engineering
                  organization. Before that I sold for Oracle, ran a company, and
                  raised $110,000 on a deck I built myself.
                </p>
                <div className="v2-acts">
                  <a className="v2-cta" href={links.calendly}>Book a call</a>
                  <Link className="v2-ghost" href="/work">See the work</Link>
                </div>
              </div>
            </div>
            <ProofSlider
              priority
              before={`${BA}/v1788797349/noxx-before-01.jpeg.001_y40fth.jpg`}
              after={`${BA}/v1788796912/noxx-after-01_bawda3.jpg`}
              project="NOXX Therapeutics"
              slide="NX-022-ISAC, Seed C"
            />
          </div>
        </header>

        <ClientMarquee />

        {/* ── who you get ── */}
        <section className="v2-who" id="who">
          <div className="v2-w">
            <p className="v2-eyebrow">Who you actually get</p>
            <h2 className="v2-h2">One person. That&rsquo;s the point.</h2>
            <p className="v2-solo">
              No account manager, no junior on your slides, no handoff between the
              person who understood the problem and the person who solved it. Twenty
              years of sitting in rooms where presentations decided things, on every
              call and every slide.
            </p>
            <div className="v2-seats">
              {SEATS.map((s) => (
                <div key={s.org} className="v2-seat">
                  <i>{s.seat}</i>
                  <b>{s.org}</b>
                  <u>{s.years}</u>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── work ── */}
        <section className="v2-work">
          <div className="v2-w">
            <p className="v2-eyebrow">Selected work</p>
            <WorkFlip />
          </div>
        </section>

        {/* ── voices: the one dark section, punctuation not theme ── */}
        <section className="v2-voices">
          <div className="v2-w">
            <p className="v2-eyebrow">What they say afterwards</p>
            <blockquote className="v2-bigq">
              &ldquo;People keep asking, <em>who did those?</em> They&rsquo;re so well
              done, so well aligned together.&rdquo;
            </blockquote>
            <p className="v2-attr">Presenter, Apple</p>
            <div className="v2-qgrid">
              <div>
                <p>&ldquo;Arthur is a rare creative mind with the discipline of a
                  strategist. He transformed our chaos into clarity, and our deck into
                  a conversation-starter.&rdquo;</p>
                <u>Anya Pechko, Founder, Project Be</u>
              </div>
              <div>
                <p>&ldquo;Arthur sees things from a high level, then translates that
                  vision into slides that actually land. Working with him feels like
                  having a strategist and designer in one.&rdquo;</p>
                <u>Denise Moses, EVP &amp; Cofounder, Toddstreet</u>
              </div>
              <div>
                <p>&ldquo;I can&rsquo;t believe it&rsquo;s possible to make this topic
                  visually exciting!&rdquo;</p>
                <u>Presenter, Apple</u>
              </div>
            </div>
          </div>
        </section>

        {/* ── journal ── */}
        <section className="v2-journal">
          <div className="v2-w">
            <p className="v2-eyebrow">Journal</p>
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="v2-jrow">
                <h3>{p.title}</h3>
                <span>{p.readTime}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── end ── */}
        <section className="v2-end" id="end">
          <div className="v2-w">
            <h2 className="v2-endh">Ready when <em>you</em> are.</h2>
            <p>
              A 30-minute call. The project, the stakes, and whether there&rsquo;s a
              fit. Engagements start at $5,000.
            </p>
            <a className="v2-cta" href={links.calendly}>Let&rsquo;s talk</a>
          </div>
        </section>
      </main>
    </>
  )
}
