import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { caseStudies } from '@/content/case-studies'
import CaseStudyClient from './CaseStudyClient'

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) return {}
  return {
    title: `${cs.client} — Liégeois Designs`,
    description: cs.tagline,
    openGraph: {
      title: `${cs.client} — ${cs.project}`,
      description: cs.tagline,
      images: [{ url: cs.images[0], width: 1200, height: 900 }],
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) notFound()

  const currentIndex = caseStudies.findIndex((c) => c.slug === slug)
  const prev = caseStudies[currentIndex - 1] ?? null
  const next = caseStudies[currentIndex + 1] ?? null

  return (
    <main style={{ background: 'var(--color-dark)', minHeight: '100vh' }}>
      {/* Hero → Narrative → Gallery → Nav all rendered client-side in correct DOM order */}
      <CaseStudyClient
        cs={cs}
        index={currentIndex}
        total={caseStudies.length}
        prev={prev}
        next={next}
      />
    </main>
  )
}
