/**
 * THE ROOM — the one backdrop.
 *
 * Settled 6 September 2026 across six rounds of mood boards. The spec lives in
 * ART-DIRECTION.md under "LOCKED: the visual system". This file is the
 * implementation; if the two ever disagree, the document wins.
 *
 * WHY IT LOOKS LIKE THIS
 *
 * 1. Angled linear gradients, never radial. A radial gradient always has a
 *    centre, so it always reads as a ball floating in space no matter how soft
 *    you make it. Arthur rejected four rounds of that: "I don't like the orb
 *    backdrop." Light in a real room arrives FROM a direction — a projector, a
 *    window, a doorway — so every light source here is off-frame.
 *
 * 2. ONE field for the whole document, not one per section. A field that
 *    restarts at each section boundary reads as decoration. A continuous one
 *    reads as a room the content moves through. This is why it lives in
 *    layout.tsx and is position:fixed.
 *
 * 3. The base is LIFTED off pure void: #12101A at the top falling to #0A0908.
 *    This is the change that made it work at all. An earlier round used the
 *    same value as the content with opacities around .20 behind an 80px blur,
 *    and produced nothing visible: a backdrop at content value reads as
 *    absence, not atmosphere.
 *
 * SERVER RENDERED. The markup below ships in the HTML. Only the parallax is a
 * client island, and it only ever writes transform. This matters: the lesson
 * from the ssr:false work in August is that anything dynamic() with ssr:false
 * is invisible to crawlers, and it cost four separate components before it was
 * caught properly.
 *
 * CONTRAST CONSEQUENCE. Measured against #241E2E, the brightest plausible
 * point of the field, NOT against pure void:
 *   body #F7F4EF   14.72:1   pass
 *   secondary      8.11:1    pass
 *   labels         5.72:1    pass
 *   accent E84420  4.06:1    LARGE TEXT ONLY
 * Never put accent-coloured body copy over the lifted areas. Use
 * --color-accent-text (#FF6442, 5.50:1) for anything at body size.
 */
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      {/* FAR — the field itself. Now the only thing in the stack. */}
      <div className="bd bd-far" data-depth="0.08" />

      {/* VIGNETTE — does not move. A moving vignette reads as a spotlight
          following the reader.

          NEUTRALISED 7 Sep, see globals.css. It was removing 44% of the light
          at the corners, which landed squarely on the two corner lifts Arthur
          had asked for. */}
      <div className="bd bd-vig" />
    </div>
  )
}
