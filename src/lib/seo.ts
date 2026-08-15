/**
 * SEO helpers for generated metadata.
 *
 * Audit 15 Aug 2026 across all 84 sitemap URLs found 66 titles over 60
 * characters and 67 descriptions outside the 110–165 window, almost all of
 * them case studies. The pattern was `${client}: ${project}` plus the
 * `%s | Liégeois Designs` template, and project titles run to 100+ characters
 * ("Designing and Delivering a Training Deck to Explain the IoT to Female
 * Entrepreneurs"). Google truncates around 60 characters, so the brand and
 * often the client itself were being cut off in the SERP.
 */

const BRAND = ' | Liégeois Designs'
const TITLE_MAX = 60
const DESC_MAX = 158
const DESC_MIN = 110

/** Trim legal and filler suffixes that eat title budget without adding meaning. */
function tidyClient(client: string): string {
  return client
    .replace(/,?\s+(LLC|Inc\.?|Ltd\.?|Corp\.?|Franchisor)\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

/**
 * Build a title that survives truncation. Prefers `Client: Format` (short,
 * descriptive, keyword-bearing) over the project title, and keeps the brand
 * suffix only when it fits inside the limit.
 */
export function caseStudyTitle(client: string, format: string): string {
  const core = `${tidyClient(client)}: ${format}`
  return core.length + BRAND.length <= TITLE_MAX ? core + BRAND : core
}

/** Clamp to a word boundary just under Google's cutoff, without a dangling comma. */
export function clampDescription(text: string, max = DESC_MAX): string {
  const t = text.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  const cut = t.slice(0, max)
  const at = Math.max(cut.lastIndexOf(' '), cut.lastIndexOf(', '))
  return cut.slice(0, at > DESC_MIN ? at : max).replace(/[,;:\s]+$/, '') + '.'
}
