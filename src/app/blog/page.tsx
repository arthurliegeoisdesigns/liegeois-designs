import type { Metadata } from 'next'
import BlogIndexClient from './BlogIndexClient'

export const metadata: Metadata = {
  title: 'Blog — Liégeois Designs',
  description:
    'Ideas on visual storytelling, pitch strategy, and the craft behind presentations that move rooms.',
  alternates: { canonical: 'https://liegeoisdesigns.com/blog' },
  openGraph: {
    title: 'Blog — Liégeois Designs',
    description:
      'Ideas on visual storytelling, pitch strategy, and the craft behind presentations.',
    url: 'https://liegeoisdesigns.com/blog',
    siteName: 'Liégeois Designs',
    type: 'website',
  },
}

export default function BlogPage() {
  return <BlogIndexClient />
}
