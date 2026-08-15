import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { industries } from '@/content/industries'
import { caseStudies } from '@/content/case-studies'

/**
 * /industries — the sector index.
 *
 * Signpost, not an experience: same principle as /services. Counts and client
 * lists are derived from case-studies.ts at build time so they cannot drift.
 */

const BASE = 'https://www.liegeoisdesigns.com'

export const metadata: Metadata = {
  title: 'Industries: Presentation Design by Sector',
  description:
    'Presentation design across healthcare, technology, agencies, startups and consumer brands. Work for Philips, IBM, Google and Marriott.',
  alternates: { canonical: `${BASE}/industries` },
  openGraph: {
    title: 'Industries: Presentation Design by Sector | Liégeois Designs',
    description:
      'Presentation design across healthcare, technology, agencies, startups and consumer brands.',
    url: `${BASE}/industries`,
    images: [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}

export default function IndustriesIndex() {
  const rows = industries.map((i) => {
    const work = caseStudies.filter((c) => c.industry === i.industry)
    return { ...i, count: work.length, cover: work[0]?.images[0], clients: [...new Set(work.map((w) => w.client))] }
  })

  return (
    <main className="ind">
      <section className="ind-head">
        <div className="ind-w">
          <p className="ind-eyebrow">Industries</p>
          <h1 className="ind-h1">Different rooms. Same discipline.</h1>
          <p className="ind-lead">
            A pharma field team, an agency new business pitch and a founder&rsquo;s
            fundraise are not the same brief. What travels between them is the method:
            find the argument first, then design it.
          </p>
        </div>
      </section>

      <section className="ind-work">
        <div className="ind-w">
          <div className="ind-grid">
            {rows.map((r) => (
              <Link key={r.slug} href={`/industries/${r.slug}`} className="ind-card">
                {r.cover && (
                  <div className="ind-shot">
                    <Image
                      src={r.cover}
                      alt={`${r.name} presentation design`}
                      fill
                      sizes="(max-width: 760px) 92vw, 360px"
                      quality={62}
                      loading="lazy"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                <h2 className="ind-card-client">{r.name}</h2>
                <span className="ind-card-meta">
                  {r.count} {r.count === 1 ? 'engagement' : 'engagements'} · {r.clients.slice(0, 3).join(', ')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ind-end">
        <div className="ind-w">
          <h2 className="ind-endh">Not listed?</h2>
          <p>
            The method does not change with the sector. If your room has to decide
            something, the conversation is the same one.
          </p>
          <Link href="/contact" className="v2-cta">Let&rsquo;s talk</Link>
        </div>
      </section>
    </main>
  )
}
