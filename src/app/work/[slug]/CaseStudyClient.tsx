'use client'

import dynamic from 'next/dynamic'
import type { CaseStudy } from '@/content/types'

// ssr:false breaks the Turbopack dual-React null-hook crash that occurs
// when framer-motion client components are statically prerendered in Next.js 16.
const CaseStudyHero    = dynamic(() => import('./CaseStudyHero'),    { ssr: false })
const CaseStudyGallery = dynamic(() => import('./CaseStudyGallery'), { ssr: false })
const CaseStudyNav     = dynamic(() => import('./CaseStudyNav'),     { ssr: false })

interface Props {
  cs: CaseStudy
  index: number
  total: number
  prev: CaseStudy | null
  next: CaseStudy | null
}

export default function CaseStudyClient({ cs, index, total, prev, next }: Props) {
  return (
    <>
      <CaseStudyHero cs={cs} index={index} total={total} />
      {cs.images.length > 1 && (
        <CaseStudyGallery images={cs.images.slice(1)} client={cs.client} />
      )}
      <CaseStudyNav prev={prev} next={next} />
    </>
  )
}
