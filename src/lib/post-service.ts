import type { BlogPost } from '@/content/types'
import { servicePageBySlug } from '@/content/services-pages'

/**
 * Maps a blog post to the service page it should send readers to.
 *
 * WHY
 * 29 published posts carried real topical authority and linked nowhere
 * commercial. A reader who finishes "Your deck has a story problem" is, at
 * that exact moment, the most qualified visitor on the site, and the page
 * offered them nothing to do.
 *
 * HOW, in priority order:
 *   1. an explicit override, for posts whose subject is unambiguous
 *   2. the "Pitch Decks" tag, which is the only tag that names a format
 *   3. the theme, which groups posts by intent
 *   4. nothing — some posts are personal essays and should NOT be sold from.
 *      Returning null is a valid, deliberate answer; a forced CTA at the end
 *      of a piece about burnout would be worse than no link at all.
 */

const OVERRIDE: Record<string, string> = {
  'the-real-roi-of-presentation-design-for-startups': 'pitch-deck-design',
  'your-deck-has-a-story-problem': 'strategic-narrative',
  /* Not pitch-deck-design, which is where the presentation-design-tips theme
     would otherwise send it. The essay's whole argument is that the narrative
     is finished before any slide exists, so Strategic Narrative is the service
     it actually earns. */
  'undeniable-is-a-method': 'strategic-narrative',
  'connect-to-strategic-direction': 'strategic-narrative',
  'business-tension-in-presentations': 'strategic-narrative',
  'lead-with-the-outcome': 'executive-presentations',
  'express-impact-in-kpis': 'executive-presentations',
  'presentation-altitude': 'executive-presentations',
  'slides-as-speaker-support': 'training-keynote-design',
  'think-like-a-filmmaker': 'training-keynote-design',
  'features-advantages-benefits': 'sales-agency-decks',
  'the-art-of-presentation-as-persuasion': 'pitch-deck-design',
  'learning-to-speak-in-images': 'pitch-deck-design',
  'know-your-audience-before-designing': 'strategic-narrative',
  'rule-of-three-in-presentations': 'training-keynote-design',
  'less-is-more-in-presentations': 'executive-presentations',
  'embracing-storytelling-as-leadership': 'strategic-narrative',
  'breaking-projects-into-scenes-not-steps': 'strategic-narrative',
}

/** Personal essays. Deliberately unsold. */
const NO_SELL = new Set([
  'adhd-as-a-creative-asset',
  'lessons-for-fellow-travelers',
  'breaking-free-from-the-script',
  'ai-in-design',
])

const BY_THEME: Record<string, string> = {
  'presentation-design-tips': 'pitch-deck-design',
  'becoming-a-visual-storyteller': 'strategic-narrative',
}

export type PostService = { slug: string; name: string; tagline: string } | null

export function serviceForPost(post: BlogPost): PostService {
  const direct = OVERRIDE[post.slug]
  const byTag = post.tags?.includes('Pitch Decks') ? 'pitch-deck-design' : undefined
  const theme = post.theme ?? ''
  const byTheme = NO_SELL.has(theme) ? undefined : BY_THEME[theme]

  const slug = direct ?? byTag ?? byTheme
  if (!slug) return null

  const svc = servicePageBySlug[slug]
  if (!svc) return null
  return { slug: svc.slug, name: svc.name, tagline: svc.tagline }
}
