export const links = {
  calendly: 'https://calendly.com/arthur-liegeois/meet-with-arthur-liegeois',
  linkedin: 'https://www.linkedin.com/in/aliegeois/',
  youtube:  'https://www.youtube.com/@LiegeoisDesigns',
}

export const SITE = 'https://www.liegeoisdesigns.com'

/**
 * Stable node identifiers for the structured data graph.
 *
 * Without these, every page minted a fresh anonymous node, so a crawler saw
 * many similar organisations and many similar people rather than one of each.
 * With them, `{ '@id': ORG_ID }` anywhere on the site is a reference to the
 * single organisation declared in layout.tsx, not a new copy of it.
 *
 * This matters more than usual here: Gemini currently answers "Liégeois
 * Designs" with Judith Liegeois Designs, an unrelated interior design firm in
 * Naples, Florida. Every ambiguity removed is one fewer reason for that.
 */
export const ORG_ID = `${SITE}/#organization`
export const PERSON_ID = `${SITE}/#arthur`

/**
 * IDENTITY GRAPH — one source of truth for structured data.
 *
 * WHY THIS EXISTS
 * sameAs was declared separately in layout.tsx, page.tsx and about/page.tsx,
 * with one, two and two entries respectively. Three hand-maintained copies of
 * the same fact drift, and they had. Entity resolution is exactly the thing
 * that suffers: an engine trying to decide whether these three pages describe
 * the same studio gets three different answers.
 *
 * PERSON AND ORGANISATION ARE NOT THE SAME ENTITY
 * The original task asked for one identical array everywhere. That would be
 * wrong, and worth saying why: sameAs means "a reference page that
 * unambiguously indicates THIS item's identity". Arthur's personal LinkedIn
 * identifies Arthur. The company page and the YouTube channel identify the
 * studio. Pointing both entities at both sets tells an engine the person and
 * the company are the same thing, which is the opposite of the disambiguation
 * this is meant to achieve — and disambiguation is the live problem here,
 * given Gemini currently answers "Liégeois Designs" with Judith Liegeois
 * Designs, an unrelated interior design firm in Naples, Florida.
 *
 * NOT INCLUDED, DELIBERATELY
 * the-pitchcollective.com was on the list. The URL available is the site's
 * HOMEPAGE, not a profile page for Arthur, so it does not identify him and
 * does not belong in sameAs. If they publish a profile page at a stable URL,
 * that one qualifies and should be added to PERSON_SAME_AS.
 */
export const PERSON_SAME_AS = [
  'https://www.linkedin.com/in/aliegeois/',
  // Behance and Dribbble go here once live. See Todoist 6hQ785VxMCmXm2Ph.
]

export const ORG_SAME_AS = [
  // ChatGPT cites this page when asked what Liégeois Designs is. It is one of
  // only three sources it names, so it is load-bearing rather than decorative.
  'https://www.linkedin.com/company/liegeois-designs',
  'https://www.youtube.com/@LiegeoisDesigns',
]

/**
 * The five services, and the only five. The brand system is explicit that
 * there is no brand identity offering and no standalone creative direction
 * offering. Both were still being advertised in layout.tsx serviceType, which
 * told buyers and AI engines that Arthur sells work he does not take.
 */
export const SERVICES = [
  'Presentation Design',
  'Pitch Deck Design',
  'Executive Presentations',
  'Conference Keynotes',
  'Strategic Narrative',
] as const

/**
 * Organisation logo for the knowledge panel.
 *
 * The previous value pointed at /images/logos/liegeois-designs-logo.png, which
 * does not exist and never has in this repo. Google had been fetching a 404
 * for the logo on every crawl. Google requires at least 112x112; this is
 * 144x144 and is the largest square PNG actually present.
 */
export const ORG_LOGO = `${SITE}/images/logo-liegeois-144.png`
