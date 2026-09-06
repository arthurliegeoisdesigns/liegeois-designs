import Link from 'next/link'
import { links } from '@/lib/config'
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
 * Now ~6 screens, light, six sections, and everything that moves has a job.
 *
 * Server component. Four client islands only: HeroDeck (cursor tilt),
 * ClientMarquee (scroll velocity), ProofSlider (drag), WorkFlip (hover).
 * Every word a crawler needs is server-rendered.
 */

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Arthur Liégeois',
  jobTitle: 'Presentation Designer & Strategic Storyteller',
  url: 'https://www.liegeoisdesigns.com',
  image: 'https://www.liegeoisdesigns.com/images/arthur-liegeois.jpg',
  sameAs: ['https://www.linkedin.com/in/aliegeois/', 'https://www.youtube.com/@LiegeoisDesigns'],
  knowsAbout: [
    'Pitch Deck Design', 'Executive Presentations', 'Investor Decks',
    'Visual Storytelling', 'Strategic Narrative', 'Presentation Design', 'Sales Decks',
  ],
  worksFor: { '@type': 'Organization', name: 'Liégeois Designs', url: 'https://www.liegeoisdesigns.com' },
}

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Liégeois Designs',
  description:
    'Pitch deck design, executive presentations, and strategic narrative for founders and executives across North America.',
  url: 'https://www.liegeoisdesigns.com',
  founder: { '@type': 'Person', name: 'Arthur Liégeois' },
  areaServed: ['United States', 'Canada'],
  priceRange: '$$$$',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Presentation Design Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pitch & Investor Decks', description: 'Narrative-driven pitch decks for founders raising capital.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Executive Presentations', description: 'Board decks, all-hands, and keynote presentations for C-suite.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sales & Agency Decks', description: 'Proposals and capabilities decks that close deals without a follow-up.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Strategic Narrative', description: 'Deep-dive engagement fixing story architecture before visual execution.' } },
    ],
  },
  sameAs: ['https://www.linkedin.com/in/aliegeois/', 'https://www.youtube.com/@LiegeoisDesigns'],
}

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

const BA = 'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto,w_1600/v1782822011'

export default function Home() {
  const posts = publishedPosts.slice(0, 3)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />

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
                <p className="v2-bridge">
                  I&rsquo;ve raised my own round, and I build the decks Fortune&nbsp;500s
                  take into board rooms. Your investors are institutions. I speak
                  both languages.
                </p>
                <div className="v2-acts">
                  <a className="v2-cta" href={links.calendly}>Book a call</a>
                  <Link className="v2-ghost" href="/work">See the work</Link>
                </div>
              </div>
            </div>
            <ProofSlider
              priority
              before={`${BA}/MCS-J-J-9-before_buqd9f.jpg`}
              after={`${BA}/MCS-J-J-9-after_k5ft6j.jpg`}
              project="MCS Healthcare × Johnson &amp; Johnson"
              slide="Slide 9 of 14"
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
