'use client'

import dynamic from 'next/dynamic'
import type { CaseStudy } from '@/content/types'

// ssr:false prevents the Turbopack dual-React null-hook crash that occurs when
// framer-motion hooks (useScroll, useReducedMotion, etc.) are called during
// static prerendering of Next.js 16 / Turbopack. Must live in a client component.
const CaseStudyClient = dynamic(() => import('./CaseStudyClient'), { ssr: false })

interface Props {
  cs: CaseStudy
  index: number
  total: number
  prev: CaseStudy | null
  next: CaseStudy | null
}

export default function CaseStudyClientWrapper(props: Props) {
  return <CaseStudyClient {...props} />
}
