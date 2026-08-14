import type { Metadata } from 'next'
import BlogIndexClient from './BlogIndexClient'

export const metadata: Metadata = {
  title: 'Presentation Design Blog: Visual Storytelling & Pitch Strategy',
  description:
    'Ideas on visual storytelling, pitch strategy, and the craft behind presentations that move rooms.',
  alternates: { canonical: 'https://www.liegeoisdesigns.com/blog' },
  openGraph: {
    title: 'Presentation Design Blog: Visual Storytelling & Pitch Strategy | Liégeois Designs',
    description:
      'Ideas on visual storytelling, pitch strategy, and the craft behind presentations.',
    url: 'https://www.liegeoisdesigns.com/blog',
    siteName: 'Liégeois Designs',
    type: 'website',
    images: [{ url: 'https://www.liegeoisdesigns.com/opengraph-image', width: 1200, height: 630 }],
  },
}

export default function BlogPage() {
  return <BlogIndexClient />
}
