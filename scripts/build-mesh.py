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
# THIS IS GAA'S COMPOSITION, REMAPPED ONTO THE SLATE RAMP.
#
# Six earlier versions invented a composition and tried to make it feel like
# theirs. Every one failed and Arthur kept saying the same thing. So this one
# does not invent anything: their reference was sampled on a 10x7 grid, and
# each cell's CIELAB L* is remapped onto this site's ramp. Same picture, same
# light, same diagonal flow, their colours replaced by ours.
#
# WHAT THAT FIXES
# Their field is FULL BLEED. Light and colour run edge to edge, and the dark
# part is a REGION, low and left, not a stripe down the middle. My last version
# authored a near-black centre column so text would be legible, which is
# exactly what Arthur objected to: "you added slightly brighter shades on the
# top left corner and the right side", and it also killed the frosting, because
# a card sitting on uniform near-black has nothing behind it to refract.
#
# The cards need contrast BEHIND them. That is the whole argument for the
# backdrop being rich in the middle, and it is why the dark-centre approach was
# self-defeating.
#
# THE MAPPING
#   L*: their 5.3-90.0 range compressed into 4-56, so it reads as the same
#       photograph taken in a darker room. Relative contrast is preserved
#       exactly, which is the part that makes it look like theirs.
#   hue: the slate ramp's own chroma at each L*, plus an extra blue push
#       proportional to how blue THEY were in that cell, so their blue right
#       flank survives as our Union/Signal blue.
#
# The logo cell is masked: two samples in row 3 read 85 L* because the mark
# sits there in the source, and they would have punched a bright hole.
GAA_L = [
    [90.0, 87.2, 84.6, 83.5, 83.9, 86.1, 86.3, 79.5, 72.1, 72.4],
    [82.8, 76.7, 71.8, 68.9, 68.0, 70.2, 72.8, 67.1, 56.4, 53.7],
    [70.0, 60.1, 52.3, 46.7, 43.8, 45.7, 52.8, 56.8, 52.2, 46.4],
    [52.5, 40.2, 30.9, 24.4, 22.0, 26.0, 33.4, 46.8, 53.4, 48.7],   # 22.0/26.0 patched
    [34.7, 22.5, 14.7, 10.5, 10.6, 15.0, 23.8, 37.5, 49.5, 49.0],
    [19.8, 10.4,  6.5,  5.8,  7.1, 12.7, 21.7, 33.1, 42.1, 44.2],
    [10.5,  5.7,  5.3,  5.7,  8.6, 15.1, 23.8, 32.5, 38.3, 40.4],
]
# How blue each cell is in the source, 0 = neutral slate, 1 = their Signal Blue.
GAA_BLUE = [
    [0.05, 0.05, 0.06, 0.08, 0.18, 0.30, 0.34, 0.46, 0.62, 0.66],
    [0.06, 0.08, 0.10, 0.14, 0.24, 0.34, 0.40, 0.56, 0.76, 0.82],
    [0.10, 0.14, 0.22, 0.34, 0.42, 0.48, 0.60, 0.72, 0.84, 0.88],
    [0.16, 0.24, 0.34, 0.44, 0.48, 0.52, 0.64, 0.78, 0.88, 0.92],
    [0.20, 0.30, 0.40, 0.46, 0.50, 0.58, 0.70, 0.82, 0.90, 0.94],
    [0.22, 0.32, 0.42, 0.48, 0.54, 0.62, 0.74, 0.86, 0.92, 0.96],
    [0.24, 0.34, 0.44, 0.50, 0.58, 0.66, 0.78, 0.88, 0.94, 0.98],
]

L_OUT_LOW, L_OUT_HIGH = 4.0, 56.0   # the darker room their picture is shot in
BLUE_PUSH = 26.0                    # how hard the blue flank leans, in Lab b*

GAMMA      = 1.00   # identity: the profile already carries shipped values
SCALE      = 1.00
SAT_BOOST  = 1.00   # a nudge so the deep navies do not go grey
HUE_PULL   = 0.00   # partial: enough to unify, not so much it flattens
HUE_TARGET = 214 / 360
FLOOR      = "#040913"
FLOOR_MIX  = 0.22

# Output is deliberately small. At this softness there is nothing to resolve,
# and the browser upscales it for free.
W, H = 960, 600


def _lin_to_srgb(c):
    c = 12.92 * c if c <= 0.0031308 else 1.055 * (c ** (1 / 2.4)) - 0.055
    return max(0.0, min(255.0, c * 255))


def lab_to_rgb(lab):
    """CIELAB -> sRGB. The ramp is defined in Lab so the steps stay
    perceptually even; see scripts/build-palette.py."""
    L, a, bb = lab
    fy = (L + 16) / 116
    fx, fz = fy + a / 500, fy - bb / 200
    g = lambda t: t ** 3 if t ** 3 > 0.008856 else (t - 16 / 116) / 7.787
    x, y, z = g(fx) * 0.95047, g(fy), g(fz) * 1.08883
    r = 3.2406 * x - 1.5372 * y - 0.4986 * z
    gg = -0.9689 * x + 1.8758 * y + 0.0415 * z
    b = 0.0557 * x - 0.2040 * y + 1.0570 * z
    return tuple(_lin_to_srgb(v) for v in (r, gg, b))


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
    # FLIPPED VERTICALLY. Their poster has light across the top because a
    # poster has one mark in the middle. A page has its headline at the top, so
    # the composition is mirrored: the dark region lands under the hero copy,
    # and the glow sits low and right, behind the slider. Same picture, same
    # light, upside down.
    L_GRID = GAA_L[::-1]
    B_GRID = GAA_BLUE[::-1]
    rows, cols = len(L_GRID), len(L_GRID[0])
    flat = [v for row in L_GRID for v in row]
    lo_in, hi_in = min(flat), max(flat)

    small = Image.new("RGB", (cols, rows))
    px = small.load()
    for r in range(rows):
        for c in range(cols):
            t = (L_GRID[r][c] - lo_in) / (hi_in - lo_in)
            L = L_OUT_LOW + (L_OUT_HIGH - L_OUT_LOW) * t
            # the ramp's own chroma at this lightness: a gentle bell, so the
            # deepest step does not go purple and the lightest does not go cyan
            k = max(0.25, 1.0 - abs(t - 0.45) / 0.55) * 1.35
            a, b = -1.5 * k, -14.0 * k
            # their blue flank, carried across as ours
            b -= BLUE_PUSH * B_GRID[r][c] * (0.35 + 0.65 * t)
            a -= 3.0 * B_GRID[r][c]
            px[c, r] = tuple(max(0, min(255, round(v))) for v in lift(lab_to_rgb((L, a, b))))

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
