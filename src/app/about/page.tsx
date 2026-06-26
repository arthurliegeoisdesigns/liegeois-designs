import type { Metadata } from 'next'
import AboutClientWrapper from './AboutClientWrapper'

// AboutClientWrapper is a 'use client' component that hosts the ssr:false
// dynamic import — keeping it out of this server component avoids the
// Next.js 16 / Turbopack dual-React null-hook crash.

export const metadata: Metadata = {
  title: 'About Arthur Liégeois',
  description:
    'Founder. Strategist. Designer. Five countries, fifteen years, and one discipline: turning complex ideas into stories people actually feel.',
  alternates: { canonical: 'https://www.liegeoisdesigns.com/about' },
  openGraph: {
    title: 'About Arthur Liégeois | Liégeois Designs',
    description:
      'Founder. Strategist. Designer. Five countries, fifteen years, and one discipline.',
    url: 'https://www.liegeoisdesigns.com/about',
    siteName: 'Liégeois Designs',
    type: 'website',
  },
}

export default function Page() {
  return <AboutClientWrapper />
}
