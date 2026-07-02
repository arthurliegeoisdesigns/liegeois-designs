'use client'

import { usePathname } from 'next/navigation'

/**
 * WorldCanvas — the single continuous background the home page lives on.
 * A warm near-black field with barely-there light glows (one warm-white,
 * one accent) drifting on an 80-second cycle; the site-wide grain overlay
 * sits on top. Sections have no backgrounds of their own — content flies
 * over this world. Styles in globals.css (.world-canvas).
 *
 * IMPORTANT: must render OUTSIDE .page-transition-wrapper — its route
 * animation retains a transform, which turns it into the containing block
 * for position:fixed descendants and pins the canvas to the page instead
 * of the viewport. It therefore lives in layout.tsx, gated to "/" here.
 */
export default function WorldCanvas() {
  const pathname = usePathname()
  if (pathname !== '/') return null
  return <div aria-hidden="true" className="world-canvas" />
}
