'use client'

import dynamic from 'next/dynamic'

// ssr:false here (client component) avoids the Next.js 16 / Turbopack
// dual-React null-hook crash during static prerendering.
const AboutPage = dynamic(() => import('./AboutPage'), { ssr: false })

export default function AboutClientWrapper() {
  return <AboutPage />
}
