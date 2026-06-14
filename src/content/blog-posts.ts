// ─────────────────────────────────────────────────────────────────────────────
// Blog Posts Collection — Liegeois Designs
//
// Metadata for all blog articles. The actual post content lives as MDX files
// in src/content/blog/[slug].mdx (to be added as posts are written).
//
// draft: true  → visible in dev, hidden in production
// draft: false → published
// ─────────────────────────────────────────────────────────────────────────────

import type { BlogPost } from './types'

export const blogPosts: BlogPost[] = [
  {
    slug: 'neuro-divergent-visual-storyteller',
    title: 'How Being Neuro-Divergent Makes Me a Better Visual Storyteller',
    excerpt:
      'ADHD is not a liability in this field — it\'s a pattern-recognition engine. Here\'s what I\'ve learned from seeing the world differently.',
    readTime: '8 min read',
    publishedAt: '2025-03-15',
    tags: ['Personal', 'Neurodiversity', 'Craft'],
    draft: true,
  },
  {
    slug: 'myth-of-playing-it-safe',
    title: 'The Myth of Playing It Safe (And Why It Costs More Than Risk)',
    excerpt:
      'The safest-looking deck in the room is usually the most expensive one — because nobody remembers it. On why tested boldness earns more than quiet compliance.',
    readTime: '7 min read',
    publishedAt: '2025-04-02',
    tags: ['Strategy', 'Design', 'Persuasion'],
    draft: true,
  },
  {
    slug: 'living-someone-elses-story',
    title: "When You Realize You're Living Someone Else's Story",
    excerpt:
      'The metrics we chase are often borrowed. The moment you notice is the moment the real work begins.',
    readTime: '6 min read',
    publishedAt: '2025-05-20',
    tags: ['Personal', 'Leadership', 'Reflection'],
    draft: true,
  },
  {
    slug: 'why-most-pitch-decks-fail',
    title: 'Why Most Pitch Decks Fail Before Anyone Reads Slide Two',
    excerpt:
      'The first slide is not a title page — it\'s a promise. Most decks break that promise immediately. Here\'s what to do instead.',
    readTime: '9 min read',
    publishedAt: '2025-06-10',
    tags: ['Pitch Decks', 'Strategy', 'Storytelling'],
    draft: true,
  },
  {
    slug: 'the-one-thing-great-decks-have-in-common',
    title: 'The One Thing Every Great Deck Has in Common',
    excerpt:
      'It\'s not design. It\'s not data. It\'s not even the story. It\'s the thing that holds all three together — and most people skip it.',
    readTime: '5 min read',
    publishedAt: '2025-07-01',
    tags: ['Storytelling', 'Strategy', 'Craft'],
    draft: true,
  },
]

/** Published posts only, sorted newest first */
export const publishedPosts = blogPosts
  .filter((p) => !p.draft)
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

/** Latest N posts (for homepage blog section) */
export function getLatestPosts(count = 3): BlogPost[] {
  // In development, show drafts so the section is never empty
  const posts =
    process.env.NODE_ENV === 'development' ? blogPosts : publishedPosts
  return posts.slice(0, count)
}
