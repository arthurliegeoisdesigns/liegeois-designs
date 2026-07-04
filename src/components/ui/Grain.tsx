/**
 * Grain — site-wide film grain overlay (audit rec 9).
 * Pure CSS/SVG, zero JS. Replaces the blurred radial-gradient orbs.
 * The SVG feTurbulence noise tile is inlined as a data URI so there is
 * no network request; `background-repeat` tiles it across the viewport.
 */
const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`

export default function Grain() {
  return (
    <div
      aria-hidden="true"
      className="grain-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,${NOISE_SVG}")`,
      }}
    />
  )
}
