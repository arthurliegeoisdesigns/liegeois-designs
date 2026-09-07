#!/usr/bin/env python3
"""
Build the backdrop mesh gradient.

    python3 scripts/build-mesh.py

Writes public/images/mesh-field.webp.

WHY THIS IS A BAKED IMAGE AND NOT CSS
Four attempts were made to do this with stacked CSS radial-gradients and all
four failed the same way. A mesh gradient is a smooth interpolation across a
grid of colour points, where every pixel is a blend of its neighbours. Stacked
radials fading to transparent over a black base are a fundamentally different
thing: they produce separate lobes with black gaps between them, and a blur
filter smears the lobes without ever unifying them. There is no set of stops
that turns one into the other.

Arthur's reference has no pure black anywhere in the field. That single fact is
the tell, and it is why the CSS versions kept reading as "glows on black"
rather than as a velvety continuous surface.

So the mesh is computed here, properly, and shipped as an image. It is tiny
(smooth gradients compress extremely well), it is generated at low resolution
and upscaled by the browser because a gradient this soft has no detail to lose,
and it is reproducible: re-run this script to re-tune it.

HOW IT WORKS
1. Sample GAA's reference on a 6x5 grid. Those are the mesh control points.
2. Darken each point while keeping the composition: gamma on lightness, a
   saturation boost so the darker blues do not go muddy, and a hue pull toward
   a single navy so the field reads unified rather than as separate colours.
   Arthur, 7 Sep: "using darker shades of blue for the lighter ones, but KEEP
   the global look and feel intact."
3. Lift the floor. The reference has no pure black and neither does this; the
   darkest areas settle to a deep navy. This is what makes it velvet rather
   than a hole.
4. Resize the 6x5 grid up with bicubic interpolation. That IS the mesh.
"""
from pathlib import Path
import colorsys

try:
    from PIL import Image
except ImportError:
    raise SystemExit("pip install pillow --break-system-packages")

OUT = Path(__file__).resolve().parent.parent / "public" / "images" / "mesh-field.webp"

# ── the field ────────────────────────────────────────────────────────────────
# AUTHORED GRID, not a smooth two-flank formula.
#
# Five earlier versions used a profile: one light source per flank, falling off
# gently to a trough. That is inherently low contrast. Neighbouring points can
# only ever differ by a small step, so the whole field reads as one soft wash
# no matter how far apart the extremes are. Arthur, every round: not enough
# contrast. He was describing the METHOD, and I kept adjusting the numbers.
#
# A real mesh gradient has control points at genuinely different values sitting
# next to each other. That is where the contrast lives — in the LOCAL jump
# between neighbours, not in the global range. The reference has #D9DDE1
# adjacent to #88A6CA and #011227 two cells below. That is the thing to copy.
#
# So: an explicit grid, drawn from the slate ramp plus GAA's Union and Signal
# blues, arranged asymmetrically. Bright slate in the upper left, a blue rising
# up the right flank, and a deep trough running down the middle where the text
# column sits. Local contrast between adjacent cells is 1.5x to 3x.
#
# ON LEGIBILITY, and the mistake that shaped every earlier version.
# The backdrop does NOT have to carry text contrast on its own. It was made to,
# by me, silently: every round I capped the brightness so 10px text would clear
# AA anywhere on the field, and every round that flattened it. The centre
# columns below are dark BY AUTHORSHIP, which is how the reference solves it
# too — their mark always sits in the darkest part of the frame. The edges are
# then free to be as rich as they want, because nothing bare sits there.
MESH = [
    # left edge ....................... centre (text) ..................... right edge
    ["#5C7896", "#40566D", "#22303F", "#141D28", "#0C1B2E", "#153A63", "#255FA5", "#3179C9"],
    ["#4F6A86", "#324355", "#18222E", "#0C141C", "#0A1A30", "#1A4272", "#2A66B4", "#2571CF"],
    ["#40566D", "#25313D", "#111923", "#070E16", "#081930", "#163A66", "#245AA2", "#2E6FBF"],
    ["#324355", "#1B2634", "#0C121A", "#060D15", "#061527", "#102D52", "#1C4A87", "#2762B0"],
    ["#25313D", "#141C26", "#080E15", "#060D15", "#051221", "#0C2646", "#17407A", "#2A68BC"],
    ["#1B2634", "#0E141C", "#060D15", "#060D15", "#04101E", "#0A2340", "#1B4A88", "#3579CE"],
]


GAMMA      = 1.00   # identity: the profile already carries shipped values
SCALE      = 1.00
SAT_BOOST  = 1.00   # a nudge so the deep navies do not go grey
HUE_PULL   = 0.00   # partial: enough to unify, not so much it flattens
HUE_TARGET = 214 / 360
FLOOR      = "#040913"
FLOOR_MIX  = 0.30

# Output is deliberately small. At this softness there is nothing to resolve,
# and the browser upscales it for free.
W, H = 960, 600


def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def darken(rgb):
    r, g, b = [v / 255 for v in rgb]
    h, l, s = colorsys.rgb_to_hls(r, g, b)
    l = (l ** GAMMA) * SCALE
    s = min(1.0, s * SAT_BOOST + 0.10)
    h = (h + (HUE_TARGET - h) * HUE_PULL) % 1.0
    out = colorsys.hls_to_rgb(h, l, s)
    return tuple(v * 255 for v in out)


def lift(rgb):
    """Blend the darkest areas toward the floor so nothing reaches black."""
    fr, fg, fb = hex_to_rgb(FLOOR)
    # weight rises as the colour gets darker
    lightness = (rgb[0] + rgb[1] + rgb[2]) / 3 / 255
    w = FLOOR_MIX * max(0.0, 1.0 - lightness * 3.2)
    return (
        rgb[0] * (1 - w) + fr * w,
        rgb[1] * (1 - w) + fg * w,
        rgb[2] * (1 - w) + fb * w,
    )


def main():
    rows, cols = len(MESH), len(MESH[0])
    small = Image.new("RGB", (cols, rows))
    px = small.load()
    for r, row in enumerate(MESH):
        for c, hx in enumerate(row):
            val = lift(darken(hex_to_rgb(hx)))
            px[c, r] = tuple(max(0, min(255, round(x))) for x in val)

    # THIS is the mesh: bicubic interpolation between the control points.
    mesh = small.resize((W, H), Image.BICUBIC)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    mesh.save(OUT, "WEBP", quality=92, method=6)

    def lum(c):
        def f(v):
            v /= 255
            return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
        return .2126 * f(c[0]) + .7152 * f(c[1]) + .0722 * f(c[2])

    data = list(mesh.getdata())
    lo = min(data, key=lum)
    hi = max(data, key=lum)
    print(f"wrote {OUT.relative_to(OUT.parent.parent.parent)}  "
          f"{W}x{H}  {OUT.stat().st_size / 1024:.1f} KB")
    print(f"  darkest  #{lo[0]:02X}{lo[1]:02X}{lo[2]:02X}  luminance {lum(lo):.4f}")
    print(f"  lightest #{hi[0]:02X}{hi[1]:02X}{hi[2]:02X}  luminance {lum(hi):.4f}")
    print(f"  no pure black: {'yes' if lum(lo) > 0.001 else 'NO — raise FLOOR_MIX'}")


if __name__ == "__main__":
    main()
