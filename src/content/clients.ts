// ─────────────────────────────────────────────────────────────────────────────
// Clients Collection — Liegeois Designs
//
// Logos for the "The company we keep" section on the homepage.
// Add SVG logo files to /public/images/logos/ and reference them here.
//
// Logo file convention: /images/logos/[id]-dark.svg  (for use on dark bg)
//                       /images/logos/[id]-light.svg (for use on light bg)
//
// Until real SVGs are added, logo paths point to placeholder locations.
// ─────────────────────────────────────────────────────────────────────────────

import type { Client } from './types'

export const clients: Client[] = [
  {
    id: 'chevron',
    name: 'Chevron',
    logo: '/images/logos/chevron-light.svg',
    logoOnDark: '/images/logos/chevron-dark.svg',
    url: 'https://www.chevron.com',
  },
  {
    id: 'marriott',
    name: 'Marriott International',
    logo: '/images/logos/marriott-light.svg',
    logoOnDark: '/images/logos/marriott-dark.svg',
    url: 'https://www.marriott.com',
  },
  {
    id: 'capital-one',
    name: 'Capital One',
    logo: '/images/logos/capital-one-light.svg',
    logoOnDark: '/images/logos/capital-one-dark.svg',
    url: 'https://www.capitalone.com',
  },
  {
    id: 'rapp',
    name: 'RAPP',
    logo: '/images/logos/rapp-light.svg',
    logoOnDark: '/images/logos/rapp-dark.svg',
    url: 'https://www.rapp.com',
  },
  {
    id: 'philips',
    name: 'Philips',
    logo: '/images/logos/philips-light.svg',
    logoOnDark: '/images/logos/philips-dark.svg',
    url: 'https://www.philips.com',
  },
  {
    id: 'jandj',
    name: 'Johnson & Johnson',
    logo: '/images/logos/jandj-light.svg',
    logoOnDark: '/images/logos/jandj-dark.svg',
    url: 'https://www.jnj.com',
  },
  {
    id: 'intercept',
    name: 'Intercept Pharmaceuticals',
    logo: '/images/logos/intercept-light.svg',
    logoOnDark: '/images/logos/intercept-dark.svg',
    url: 'https://www.interceptpharma.com',
  },
  {
    id: 'spectrum-enterprise',
    name: 'Spectrum Enterprise',
    logo: '/images/logos/spectrum-light.svg',
    logoOnDark: '/images/logos/spectrum-dark.svg',
    url: 'https://enterprise.spectrum.com',
  },
]
