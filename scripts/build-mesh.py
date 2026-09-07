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

# ── the mesh ─────────────────────────────────────────────────────────────────
# These are GAA's own colours, sampled from the reference on a 6x5 grid, but
# RE-COMPOSED. That distinction matters and is the one liberty taken here.
#
# The reference is a poster: a single mark in the middle, light across the top,
# dark pooling low. A web page has text everywhere, and its content column is
# centred. Copying the layout pixel for pixel would put 10px eyebrows and body
# copy on the brightest band in the frame, where Cloud Grey measures 3.74:1 and
# Mist Blue 1.97:1. Unusable.
#
# So the palette, the softness and the asymmetry are the reference's. The
# arrangement is composed for the medium: key light down the LEFT flank, a
# cooler fill rising on the RIGHT, and a deep navy trough through the middle
# three columns where the content actually sits. Same room, camera moved.
#
# THE CEILING, and the constraint that drives this whole grid.
# The field is position:fixed and full-viewport, so it does not scroll past
# anything: every bright region will eventually have body text over it. That
# means the brightest point the CONTENT COLUMN crosses is a hard ceiling, and
# it is #213043 (luminance 0.028). Above that, 10px accent eyebrows drop under
# 4.5:1. Measured, not guessed.
#
# Eight columns rather than six, so the edge light can fall off fast enough to
# be bright at the frame edge and under the ceiling by 19% width. Columns 0 and
# 7 are the outer margins and may go as bright as they like. Columns 1 to 6 are
# under the column and must not exceed the ceiling after darkening.
#
# Left flank reads neutral slate, right flank reads blue and rises toward the
# bottom right. Deliberately unequal: a balanced field reads as wallpaper.
# ── the field, as a profile rather than a table of hex ──────────────────────
# Hand-authoring a grid kept producing the same bug: the bright flank bled
# inward past the edge of the content column. A profile makes the falloff an
# explicit, tunable number instead of something to eyeball.
#
# THE CONSTRAINT. The field is position:fixed and full-viewport, so it never
# scrolls past anything: every bright region eventually has body text over it.
# The brightest point the TEXT COLUMN crosses is therefore a hard ceiling, and
# it measures #213043 (luminance 0.028). Above that, 10px accent eyebrows drop
# below 4.5:1. The column runs roughly 17% to 83% of viewport width, so the
# light has to be spent in the outer sixth on each side.
#
# Left flank reads neutral slate, right flank reads blue and rises toward the
# bottom. Deliberately unequal weights: a balanced field reads as wallpaper.
TROUGH   = (0x06, 0x10, 0x19)   # the deep navy the middle settles into
LEFT     = (0x34, 0x47, 0x60)   # slate, the key
RIGHT    = (0x2A, 0x53, 0x81)   # blue, the fill
EDGE     = 0.65                 # light reaches well inward, not a stripe at the frame
FALLOFF  = 2.60                 # gentle: keeps ~1.9x gradation through the middle

# LEFT and RIGHT were swept, not chosen by eye. Two failure modes bracket this:
# a steep falloff clears the ceiling but leaves a dead-flat middle with two
# bright stripes at the frame edges, which is not velvet; a bright flank gives
# a rich gradient but puts 10px accent eyebrows at 3.5:1 in the lower right.
# Holding the gentle curve and DIMMING the flank colours instead keeps the
# gradation and clears the ceiling: worst point under the column measures
# 0.0264 against a 0.0284 limit, while the frame edge still reaches 0.072,
# roughly 16x the trough.
COLS, ROWS = 14, 7


def field(t, v):
    """t = 0..1 across, v = 0..1 down. Returns an RGB triple."""
    # each flank fades to nothing by EDGE, raised to FALLOFF so it drops fast
    l = max(0.0, 1.0 - t / EDGE) ** FALLOFF
    r = max(0.0, 1.0 - (1.0 - t) / EDGE) ** FALLOFF

    # vertical shaping. The key is strongest high, the fill strongest low, so
    # the two never balance at any height.
    l *= 0.55 + 0.45 * (1.0 - v)
    r *= 0.42 + 0.58 * v

    out = []
    for i in range(3):
        c = TROUGH[i] + (LEFT[i] - TROUGH[i]) * l
        c = c + (RIGHT[i] - c) * r
        out.append(c)
    return tuple(out)


GAMMA      = 1.00   # identity: the profile already carries shipped values
SCALE      = 1.00
SAT_BOOST  = 1.10   # a nudge so the deep navies do not go grey
HUE_PULL   = 0.30   # partial: enough to unify, not so much it flattens
HUE_TARGET = 214 / 360
FLOOR      = "#040A14"
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
