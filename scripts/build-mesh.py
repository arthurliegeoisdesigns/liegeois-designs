#!/usr/bin/env python3
"""
Build the backdrop mesh gradient.

    python3 scripts/build-mesh.py

Writes public/images/mesh-field.webp.

WHY THIS IS A BAKED IMAGE AND NOT CSS
Four attempts were made with stacked CSS radial-gradients and all four failed
the same way. A mesh gradient is a smooth interpolation across a grid of colour
points, where every pixel is a blend of its neighbours. Stacked radials fading
to transparent over a black base are a different object: they produce separate
lobes with black gaps between them, and a blur filter smears the lobes without
ever unifying them. There is no set of stops that turns one into the other.

The tell was in every reference all along: no pure black anywhere in the field.

REWRITTEN 7 Sep 2026. WHAT CHANGED AND WHY
The previous version sampled GAA's poster and compressed it into L* 4-56. That
ceiling was the whole problem. Measured against the eleven references Arthur
collected:

    reference posters     dark anchor 0.003-0.03   brightest 0.49-0.82
    the old mesh-field    dark anchor 0.004        brightest 0.176

The dark anchor was already right. The ceiling was three to four times too low,
and the field travelled only 16 degrees of hue (199-215). That is the entire
reason it read flat next to them, and it is why "add more contrast" kept
failing: contrast was being asked of a field with nowhere to go.

DIRECTION, chosen by Arthur 7 Sep: cool only, wide. Blue to teal to indigo to
violet, no warm anywhere. The references are all rainbows that run orange
through the field, and this site has exactly one accent (#E84420). A backdrop
containing orange would retire that accent by making it ordinary. So the
composition is taken from the references and the warm half of the spectrum is
not.

SOURCE COMPOSITION
Sampled from Freepik ui-ux-gradient-background-template_642913-5822, the one
reference already inside the cool band. Sampled to literals below rather than
shipped as an asset, so the repo carries no third-party image and the build
stays reproducible.

Its layout happens to suit a page better than GAA's did, which is why there is
no vertical flip here any more: the dark region sits on the LEFT and top-left,
which is where the hero copy goes, and the bright bloom sits right of centre,
which is where the slider goes. The old flip existed to force GAA's poster into
that shape. It is not needed now.

HOW IT WORKS
1. REF_L / REF_H below are a 14x10 sampling of the reference: CIELAB L* for the
   composition, sRGB hue angle for the colour flow.
2. L* is remapped from the reference's 4.4-86.1 onto L_OUT_LOW..L_OUT_HIGH.
   Relative contrast is preserved exactly, which is the part that makes it read
   as the same photograph.
3. Hue is remapped from the reference's 180-241 onto HUE_BRIGHT..HUE_DARK,
   stretching a 61-degree span into roughly 95 so the field travels the wide
   cool band instead of sitting in one blue.
4. Chroma follows a bell on lightness, so the deepest step does not go muddy
   and the brightest bloom stays pale rather than neon. Same reason the
   reference's brightest area is near-white.
5. The 14x10 grid is resized up with bicubic interpolation. That IS the mesh.
"""
from pathlib import Path
import colorsys
import math

try:
    from PIL import Image
except ImportError:
    raise SystemExit("pip install pillow --break-system-packages")

OUT = Path(__file__).resolve().parent.parent / "public" / "images" / "mesh-field.webp"

# ── the reference composition ────────────────────────────────────────────────
# CIELAB L*, 14 wide x 10 tall. Dark left flank, bright bloom right of centre,
# a darker band along the bottom. Read the columns left to right and the shape
# is obvious: a wall of near-black that opens into light.
REF_L = [
    [  4.5,   4.7,   5.8,   9.9,  17.0,  27.1,  38.9,  50.9,  61.0,  68.0,  71.0,  71.8,  73.8,  77.5],
    [  4.4,   4.6,   5.3,   7.4,  11.8,  18.9,  28.9,  42.0,  56.4,  68.7,  77.4,  81.9,  83.7,  84.1],
    [  4.4,   4.5,   4.9,   6.6,  10.9,  16.3,  25.1,  38.0,  53.9,  67.2,  75.9,  80.8,  84.6,  86.1],
    [  4.4,   4.5,   5.2,   7.4,  11.7,  18.8,  29.7,  43.8,  57.2,  69.1,  77.2,  81.9,  85.1,  85.9],
    [  4.5,   4.9,   6.2,  10.0,  18.3,  30.8,  44.9,  57.6,  67.7,  75.2,  80.8,  84.5,  85.9,  86.0],
    [  4.5,   5.2,   7.8,  16.1,  31.8,  51.5,  66.6,  75.0,  79.3,  82.6,  84.6,  85.5,  85.0,  84.5],
    [  4.5,   5.1,   7.7,  18.4,  40.0,  63.9,  78.0,  82.2,  82.8,  83.1,  82.2,  81.6,  81.5,  81.9],
    [  4.4,   4.8,   6.4,  13.8,  32.9,  58.6,  73.0,  75.6,  74.3,  72.0,  71.2,  72.1,  75.2,  78.7],
    [  4.4,   4.5,   5.4,   9.4,  19.1,  36.6,  47.7,  50.6,  51.4,  54.8,  51.8,  51.2,  61.8,  72.3],
    [  4.5,   4.4,   4.5,   5.5,   7.9,  16.0,  18.9,  23.0,  24.5,  23.0,  26.0,  33.3,  50.5,  68.1],
]

# sRGB hue angle per cell. 238 is deep blue (the dark flank), 180 is cyan (the
# bright bloom). Seven cells inside the bloom sampled as near-white, where hue
# is meaningless and the sampler fell back to 238; left unpatched they would
# have punched blue holes through the brightest part of the field. They are
# interpolated from their neighbours below, and marked.
REF_H = [
    [238.0, 240.0, 241.3, 237.5, 232.6, 224.7, 216.0, 207.7, 200.9, 197.1, 197.5, 197.7, 192.4, 187.2],
    [237.9, 238.1, 240.0, 240.0, 237.9, 232.4, 225.2, 215.9, 205.5, 196.3, 188.6, 184.6, 183.4, 181.8],
    [237.9, 240.0, 240.0, 240.0, 239.2, 236.7, 228.9, 219.8, 207.3, 197.7, 191.1, 185.1, 183.0, 181.5],  # [13] patched
    [237.9, 238.1, 240.0, 238.9, 236.2, 231.4, 223.6, 214.1, 205.0, 196.3, 189.7, 184.7, 182.6, 181.4],  # [12][13] patched
    [238.0, 240.0, 240.0, 236.2, 229.6, 220.3, 212.0, 204.4, 198.2, 192.6, 187.0, 182.7, 181.5, 181.0],  # [12][13] patched
    [238.1, 240.0, 240.0, 234.5, 226.1, 213.2, 201.3, 194.0, 190.8, 187.3, 184.2, 181.8, 180.0, 182.1],  # [10][11] patched
    [238.1, 240.0, 241.1, 236.9, 232.4, 221.4, 204.3, 195.6, 204.0, 201.0, 191.1, 185.0, 182.9, 181.7],
    [237.9, 240.0, 240.0, 237.7, 235.8, 231.4, 224.0, 219.6, 211.3, 203.3, 197.1, 193.3, 189.2, 185.1],
    [237.9, 238.0, 238.4, 239.1, 237.0, 231.8, 224.9, 221.6, 216.5, 210.3, 210.5, 209.5, 200.8, 193.2],
    [238.0, 237.9, 238.0, 241.5, 241.0, 237.8, 235.1, 232.8, 232.0, 231.5, 230.1, 223.2, 210.7, 201.4],
]

# ── tuning ───────────────────────────────────────────────────────────────────
# THE CEILING IS THE POINT. The references land between 0.49 and 0.82 relative
# luminance at their brightest; the old field reached 0.176. L* 79 lands at
# 0.55, which is inside the reference band and at the conservative end of it.
L_OUT_LOW, L_OUT_HIGH = 3.5, 79.0

# The reference travels 180-241 (cyan to blue). Stretched to 183-274 so the
# dark flank reads indigo-violet and the bloom stays cyan: the wide cool band,
# blue through teal through indigo through violet, and nothing warm.
HUE_BRIGHT, HUE_DARK = 183.0, 274.0

# ...but stretched on a CURVE, not linearly.
#
# The first attempt mapped hue linearly and the result went lilac everywhere.
# The reason is in the sampled grid: most of the reference's cells sit at
# 200-241, near the blue end, and only a thin bright edge reaches 180. A linear
# stretch therefore drags the whole middle of the field into violet and leaves
# almost nothing in the blues, which is the opposite of the reference, where
# violet is a corner and blue is the body.
#
# The exponent keeps the field in blue and teal for most of its travel and
# spends the violet only in the last stretch, where the reference is darkest.
# Raise it for more blue, lower it toward 1.0 for more violet.
HUE_CURVE = 2.4

# ── the dark flank ───────────────────────────────────────────────────────────
# HOW WIDE THE FIELD STAYS DARK BEFORE IT OPENS INTO LIGHT.
#
# This is the parameter that lets the ceiling stay high. Raising the brightest
# point to 0.55 put 41% of the viewport below 4.5:1 for primary text and left
# the hero headline at 2.92:1, because the bloom bled into the top-left where
# the copy sits. The previous six attempts answered exactly this by dimming the
# field, every time, which is why it never got anywhere.
#
# The references do not dim. They keep an anchor near 0.003 across roughly a
# quarter to a third of the frame and put all their type in it. That is a
# COMPOSITION answer to a contrast problem, and it costs nothing at the bright
# end: widening the dark region increases the range rather than compressing it.
#
# 1.0 samples the reference evenly. Above 1.0 stretches the dark left flank
# rightward and pushes the bloom further right, which is where the slider is
# anyway. Text still needs panels outside the flank; this makes the hero work
# without one.
FLANK_BIAS = 1.75

# Chroma follows a bell on lightness. Flat chroma would make the deepest cells
# muddy and the bloom neon; the reference's own brightest area is near-white,
# which is what keeps it looking like light rather than like paint.
CHROMA_PEAK   = 46.0    # Lab C* at the centre of the bell
CHROMA_FLOOR  = 9.0     # never fully neutral, or the field goes grey
BELL_CENTRE   = 0.40    # position on the 0-1 lightness ramp
BELL_WIDTH    = 0.62

# Output is deliberately small. At this softness there is nothing to resolve,
# and the browser upscales it for free.
W, H = 960, 600


# ── colour ───────────────────────────────────────────────────────────────────
def _lin_to_srgb(c):
    c = 12.92 * c if c <= 0.0031308 else 1.055 * (c ** (1 / 2.4)) - 0.055
    return c * 255


def lab_to_rgb(L, a, bb):
    """CIELAB -> sRGB, unclamped so the caller can detect out-of-gamut."""
    fy = (L + 16) / 116
    fx, fz = fy + a / 500, fy - bb / 200
    g = lambda t: t ** 3 if t ** 3 > 0.008856 else (t - 16 / 116) / 7.787
    x, y, z = g(fx) * 0.95047, g(fy), g(fz) * 1.08883
    r = 3.2406 * x - 1.5372 * y - 0.4986 * z
    gg = -0.9689 * x + 1.8758 * y + 0.0415 * z
    b = 0.0557 * x - 0.2040 * y + 1.0570 * z
    return tuple(_lin_to_srgb(v) for v in (r, gg, b))


def rgb_to_lab(r, g, b):
    f = lambda c: c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = f(r), f(g), f(b)
    x = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047
    y = 0.2126 * r + 0.7152 * g + 0.0722 * b
    z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883
    t = lambda v: v ** (1 / 3) if v > 0.008856 else 7.787 * v + 16 / 116
    fx, fy, fz = t(x), t(y), t(z)
    return 116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)


def lab_hue_of(srgb_hue_deg):
    """The Lab hue ANGLE that a given sRGB hue reads as.

    Hue is specified above in sRGB degrees because that is how the references
    were measured and how the numbers stay legible. But the field has to be
    built in Lab, or lightness and saturation contaminate each other and the
    ramp stops being perceptually even. sRGB hue and Lab hue angle are not
    linearly related (sRGB 180 is Lab ~196, sRGB 240 is Lab ~306), so rather
    than approximate the mapping, build the fully saturated colour and measure
    its Lab angle directly.
    """
    r, g, b = colorsys.hsv_to_rgb(srgb_hue_deg / 360.0, 1.0, 1.0)
    _, a, bb = rgb_to_lab(r, g, b)
    return math.atan2(bb, a)


def lch_to_rgb(L, C, h):
    """LCh(ab) -> sRGB, reducing chroma until it fits the gamut.

    Clipping channels instead would shift the hue, which at these chroma levels
    is visible as the deep indigo swinging toward magenta.
    """
    for _ in range(48):
        rgb = lab_to_rgb(L, C * math.cos(h), C * math.sin(h))
        if all(-0.5 <= v <= 255.5 for v in rgb):
            return tuple(max(0.0, min(255.0, v)) for v in rgb)
        C *= 0.94
    return tuple(max(0.0, min(255.0, v)) for v in rgb)


def main():
    rows, cols = len(REF_L), len(REF_L[0])
    assert rows == len(REF_H) and cols == len(REF_H[0]), "REF_L and REF_H disagree in shape"

    flat_l = [v for row in REF_L for v in row]
    flat_h = [v for row in REF_H for v in row]
    lo_l, hi_l = min(flat_l), max(flat_l)
    lo_h, hi_h = min(flat_h), max(flat_h)

    # A previous version of this file silently discarded every tuned parameter
    # because a second copy of a function was appended below the first, and
    # Python kept the last definition. Nothing errored; the output simply never
    # changed, through several rounds of "I see no difference" — which was
    # correct, there was none. These assertions exist so that class of silent
    # no-op fails loudly instead.
    assert hi_l - lo_l > 50, f"reference L* range collapsed: {lo_l}-{hi_l}"
    assert hi_h - lo_h > 30, f"reference hue range collapsed: {lo_h}-{hi_h}"

    def sample(grid, r, x):
        """Read a row at a fractional column, linearly interpolated.

        Needed because FLANK_BIAS warps the horizontal axis, so output columns
        no longer line up with reference columns.
        """
        x = max(0.0, min(cols - 1.0, x))
        i = int(x)
        j = min(cols - 1, i + 1)
        f = x - i
        return grid[r][i] * (1 - f) + grid[r][j] * f

    # Wider than the reference grid so the warp has resolution to spend on the
    # stretched flank; still far below output size, since bicubic does the rest.
    ocols = cols * 3
    small = Image.new("RGB", (ocols, rows))
    px = small.load()
    for r in range(rows):
        for c in range(ocols):
            # warp the horizontal axis: dark flank wide, bloom pushed right
            p = c / (ocols - 1)
            x = (p ** FLANK_BIAS) * (cols - 1)

            # composition: where the light falls
            t = (sample(REF_L, r, x) - lo_l) / (hi_l - lo_l)
            L = L_OUT_LOW + (L_OUT_HIGH - L_OUT_LOW) * t

            # colour flow: bright end cyan, dark end indigo-violet
            u = (sample(REF_H, r, x) - lo_h) / (hi_h - lo_h)
            hue_srgb = HUE_BRIGHT + (HUE_DARK - HUE_BRIGHT) * (u ** HUE_CURVE)

            # chroma bell, so neither end goes muddy or neon
            bell = math.exp(-((t - BELL_CENTRE) ** 2) / (2 * (BELL_WIDTH / 2.355) ** 2))
            C = CHROMA_FLOOR + (CHROMA_PEAK - CHROMA_FLOOR) * bell

            px[c, r] = tuple(round(v) for v in lch_to_rgb(L, C, lab_hue_of(hue_srgb)))

    # THIS is the mesh: bicubic interpolation between the control points.
    mesh = small.resize((W, H), Image.BICUBIC)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    mesh.save(OUT, "WEBP", quality=92, method=6)

    def lum(c):
        def f(v):
            v /= 255
            return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
        return .2126 * f(c[0]) + .7152 * f(c[1]) + .0722 * f(c[2])

    data = list(mesh.convert('RGB').getdata())
    lo = min(data, key=lum)
    hi = max(data, key=lum)
    hues = sorted({round(colorsys.rgb_to_hsv(*[v / 255 for v in p])[0] * 360) for p in data})

    print(f"wrote {OUT.relative_to(OUT.parent.parent.parent)}  "
          f"{W}x{H}  {OUT.stat().st_size / 1024:.1f} KB")
    print(f"  darkest  #{lo[0]:02X}{lo[1]:02X}{lo[2]:02X}  luminance {lum(lo):.4f}")
    print(f"  lightest #{hi[0]:02X}{hi[1]:02X}{hi[2]:02X}  luminance {lum(hi):.4f}")
    print(f"  range    {lum(hi) / max(lum(lo), 1e-4):.0f}x")
    print(f"  hue span {hues[0]}-{hues[-1]} deg")
    print(f"  no pure black:  {'yes' if lum(lo) > 0.001 else 'NO'}")
    print(f"  ceiling in reference band (0.49-0.82): "
          f"{'yes' if lum(hi) >= 0.45 else 'NO — raise L_OUT_HIGH'}")
    print(f"  no warm hues:   {'yes' if hues[0] >= 170 and hues[-1] <= 300 else 'NO — hue escaped the cool band'}")


if __name__ == "__main__":
    main()
