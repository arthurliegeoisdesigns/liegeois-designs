// ─────────────────────────────────────────────────────────────────────────────
// Blog Themes Collection — Liegeois Designs
// ─────────────────────────────────────────────────────────────────────────────

export type BlogTheme = {
  slug: string
  label: string
  order: number
}

/* 'adhd-as-a-creative-asset' removed 7 Sep 2026, at Arthur's request.
   Its label rendered as a FILTER CHIP on the blog index, so leaving the theme
   in place while deleting its posts would have left an empty chip reading
   "ADHD as a Creative Asset" — a louder disclosure than the three posts it
   pointed at. Orders renumbered to stay contiguous. */
export const blogThemes: BlogTheme[] = [
  { slug: 'breaking-free-from-the-script',    label: 'Breaking Free from the Script',  order: 1 },
  { slug: 'becoming-a-visual-storyteller',     label: 'Becoming a Visual Storyteller',  order: 2 },
  { slug: 'lessons-for-fellow-travelers',      label: 'Lessons for Fellow Travelers',   order: 3 },
  { slug: 'presentation-design-tips',          label: 'Presentation Design Tips',       order: 4 },
  { slug: 'ai-in-design',                      label: 'AI in Design',                   order: 5 },
]

export function getThemeBySlug(slug: string): BlogTheme | undefined {
  return blogThemes.find((t) => t.slug === slug)
}
