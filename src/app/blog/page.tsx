import type { Metadata } from 'next'
import BlogIndexClient from './BlogIndexClient'

export const metadata: Metadata = {
  title: 'Presentation Design Blog & Insights',
  description:
    'Ideas on visual storytelling, pitch strategy, and the craft behind presentations that move rooms.',
  alternates: { canonical: 'https://www.liegeoisdesigns.com/blog' },
  openGraph: {
    title: 'Presentation Design Blog & Insights | Liégeois Designs',
    description:
      'Ideas on visual storytelling, pitch strategy, and the craft behind presentations.',
    url: 'https://www.liegeoisdesigns.com/blog',
    siteName: 'Liégeois Designs',
    type: 'website',
  },
}

export default function BlogPage() {
  return <BlogIndexClient />
}
