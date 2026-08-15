import type { Metadata } from 'next'
import Link from 'next/link'
import { links } from '@/lib/config'
import { publishedPosts } from '@/content/blog-posts'
import HeroDeck from '@/components/v2/HeroDeck'
import ClientMarquee from '@/components/v2/ClientMarquee'
import ProofSlider from '@/components/v2/ProofSlider'
import WorkFlip from '@/components/v2/WorkFlip'

/**
 * /v2 — the homepage rebuild, live for comparison before it replaces /.
 *
 * WHY THIS EXISTS
 * The current homepage is 36 screens: a five-scene pinned journey with a
 * wormhole canvas, a 33-tool inventory, and roughly 15 screens of scroll before
 * any non-hero content. Arthur's critique was that it is dark, over-produced
 * and that the motion does work the content should be doing. It also argues
 * against its own thesis: a studio selling streamlined narrative should not
 * ship a scroll epic.
 *
 * This is ~6 screens, light, and everything that moves has a job.
 *
 * ARCHITECTURE
 * Server component. Only four islands are client-side: the hero (cursor tilt),
 * the marquee (scroll velocity), the proof slider (drag), and the work grid
 * (hover flip). Everything else, including all the copy a crawler needs, is
 * server-rendered. The old homepage shipped eleven client components plus
 * seven ambient effect layers.
 *
 * NOINDEX while it is a preview. Remove the robots block when it becomes /.
 */

export const metadata: Metadata = {
  title: 'Homepage v2 preview',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.liegeoisdesigns.com/' },
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

export default function V2() {
  const posts = publishedPosts.slice(0, 3)

  return (
    <main className="v2">
      <HeroDeck />
      <ClientMarquee />

      {/* ── the proof. Nothing else on the page interacts. ── */}
      <section className="v2-proof" id="proof">
        <div className="v2-w">
          <div className="v2-phead">
            <div>
              <p className="v2-eyebrow">The difference</p>
              <h2 className="v2-h2">Same content. Different decision.</h2>
            </div>
            <p className="v2-lede">
              Nothing was added. The argument was already in there, buried under
              everything competing with it. Drag it yourself.
            </p>
          </div>
          <ProofSlider
            before={`${BA}/MCS-J-J-9-before_buqd9f.jpg`}
            after={`${BA}/MCS-J-J-9-after_k5ft6j.jpg`}
            project="MCS Healthcare × Johnson &amp; Johnson"
            slide="Slide 9 of 14"
          />
        </div>
      </section>

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

      {/* ── voices: the one dark section, used as punctuation not as a theme ── */}
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
              <p>&ldquo;Arthur is a rare creative mind with the discipline of a strategist.
                He transformed our chaos into clarity, and our deck into a
                conversation-starter.&rdquo;</p>
              <u>Anya Pechko, Founder, Project Be</u>
            </div>
            <div>
              <p>&ldquo;Arthur sees things from a high level, then translates that vision
                into slides that actually land. Working with him feels like having a
                strategist and designer in one.&rdquo;</p>
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
  )
}
