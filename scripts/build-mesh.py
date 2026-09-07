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
# THE CONSTRAINT, and the mistake that shaped four earlier versions.
# The backdrop is position:fixed and full-viewport, so it never scrolls past
# anything: every bright region eventually has text over it. The brightest
# point the TEXT COLUMN crosses is therefore a hard ceiling.
#
# That ceiling is set by the most demanding thing sitting BARE on the field,
# and until 7 Sep that was 10px accent-orange eyebrows, which cap the surface
# at 0.034 luminance. Soft Slate clears at 0.126. The orange labels alone were
# costing nearly four times the available range, so every attempt to make the
# field rich failed contrast, and every attempt to pass contrast came out flat.
# Flat is also why the frosted cards read as opaque: frost needs texture behind
# it to refract.
#
# Resting labels moved to Soft Slate, orange kept for signals. The ceiling is
# now 0.126, and this field is tuned to 0.10 under the column, leaving headroom.
#
# COMPOSITION is the reference's, re-arranged for the medium. Their piece is a
# poster with one mark in the middle; copying its layout puts body copy on the
# brightest band. So: key light down the LEFT flank reading slate, a cooler
# blue fill rising on the RIGHT, deep navy trough through the middle. The
# flanks are deliberately unequal — a balanced field reads as wallpaper.
TROUGH   = (0x05, 0x0D, 0x17)   # the deep navy the middle settles into
LEFT     = (0x5E, 0x79, 0x9C)   # slate, the key
RIGHT    = (0x28, 0x60, 0xAC)   # blue, the fill
EDGE     = 0.66                 # light reaches inward, not a stripe at the frame
FALLOFF  = 2.30                 # gentle, so the middle keeps real gradation


def field(t, v):
    """t = 0..1 across, v = 0..1 down. Returns an RGB triple."""
    l = max(0.0, 1.0 - t / EDGE) ** FALLOFF
    r = max(0.0, 1.0 - (1.0 - t) / EDGE) ** FALLOFF
    # key strongest high, fill strongest low, so they never balance
    l *= 0.50 + 0.50 * (1.0 - v)
    r *= 0.35 + 0.65 * v
    out = []
    for i in range(3):
        c = TROUGH[i] + (LEFT[i] - TROUGH[i]) * l
        c = c + (RIGHT[i] - c) * r
        out.append(c)
    return tuple(out)


COLS, ROWS = 16, 9

GAMMA      = 1.00   # identity: the profile already carries shipped values
SCALE      = 1.00
SAT_BOOST  = 1.10   # a nudge so the deep navies do not go grey
HUE_PULL   = 0.30   # partial: enough to unify, not so much it flattens
HUE_TARGET = 214 / 360
FLOOR      = "#040913"
FLOOR_MIX  = 0.55

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
    small = Image.new("RGB", (COLS, ROWS))
    px = small.load()
    for r in range(ROWS):
        for c in range(COLS):
            t = c / (COLS - 1)
            v = r / (ROWS - 1)
            val = lift(darken(field(t, v)))
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
