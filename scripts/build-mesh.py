#!/usr/bin/env python3
"""
Build the backdrop mesh gradient.

    python3 scripts/build-mesh.py

Writes public/images/mesh-field.webp.

═══════════════════════════════════════════════════════════════════════════
REWRITTEN 7 Sep 2026, SECOND TIME TODAY. Read this before touching anything.
═══════════════════════════════════════════════════════════════════════════

The first rewrite resampled one reference poster and remapped its colours.
Arthur's verdict: "the least interesting in the list". He was right, and the
measurements say why. Against the two references he actually wanted:

                       ref 5815   ref 5821   the resampled version
    median luminance      0.075      0.086    bright half sat at 0.50
    peak luminance        1.000      1.000    0.549
    centre / edge          7.3x         --    about 1x
    warm share, top          0%         6%    0%
    warm share, bottom      66%        32%    0%
    grain sigma              3.9        7.2    0

THE STRUCTURAL MISTAKE
Those posters are DARK ON AVERAGE WITH SMALL NEAR-WHITE PEAKS. The resampled
version lifted an entire half of the frame to 0.5, which spends the dynamic
range on a plateau instead of concentrating it into light. A plateau reads as
paint. A dark field with a hot core reads as illumination. That is the whole
difference, and no amount of hue tuning fixes it.

THE FOUR RULES, taken from the references rather than invented

1. LIGHT IS ADDITIVE, AND SUMMED IN LINEAR SPACE.
   Real lights add. Two beams crossing make a brighter, whiter spot, which is
   exactly the near-white peak in both references. Blending colours in gamma
   space instead (what every previous version did) averages them, which is
   what paint does, and averages can never exceed their brightest input. This
   single change is why the field now reaches white where beams cross while
   the surround stays black.

2. THE VIGNETTE IS THE COMPOSITION, NOT A FINISHING TOUCH.
   Reference 5815 measures 7.3x brighter at centre than at its edges. The dark
   surround is what makes the lit part read as a beam entering a dark room.

3. COOL ABOVE, WARM BELOW.
   Both references put 0-6% warm pixels in the top half and 32-66% in the
   bottom. That vertical temperature split is what Arthur means by volume: the
   eye reads warm as nearer and cool as further, so the field acquires depth
   that a single-hue field cannot have. Warm is used as TOUCHES, low and
   dim, never as a field.

   This reverses the "cool only" decision taken earlier the same day. That
   decision was made to protect #E84420 from competition. The protection still
   applies, and is handled instead by WARM_CEILING below: the warm lights are
   kept dark and low-chroma, so they read as amber shadow rather than as an
   accent colour. Nothing in the field competes with a saturated orange at
   full luminance.

4. GRAIN IS PART OF THE IMAGE.
   Both references carry visible grain (sigma 3.9 and 7.2). It is not the
   .grain overlay in globals.css, which is a fixed viewport layer for the whole
   document. Grain baked into the field itself is what keeps the smooth areas
   from banding, and banding is the thing that makes a large soft gradient look
   cheap on an 8-bit display.

WHY A BAKED IMAGE AND NOT CSS
Four attempts were made with stacked CSS radial-gradients and all four failed
identically. Radials fading to transparent over a black base produce separate
lobes with black gaps; a blur smears them without unifying them. Additive
linear-light compositing is not expressible in CSS at all. The file is 10 KB.

LEGIBILITY, WHICH IS WHERE THIS KEEPS GOING WRONG
Text needs field luminance at or below 0.158 to clear 4.5:1 in #F7F4EF. The
answer is NOT to dim the field; that was tried six times and is what Arthur
kept rejecting. The answer is that the dark surround covers most of the frame
and the hot core is small and deliberately placed where CARDS sit, not where
bare copy sits. The core is what gives the frosted panels something to refract.
A card over a flat dark field has nothing to frost, which was the original
complaint. Verified at the bottom of this file; the build prints the numbers.
"""
from pathlib import Path
import numpy as np

try:
    from PIL import Image, ImageFilter
except ImportError:
    raise SystemExit("pip install pillow --break-system-packages")

OUT = Path(__file__).resolve().parent.parent / "public" / "images" / "mesh-field.webp"

W, H = 960, 600           # browser upscales; nothing here has detail to lose
SEED = 20260907           # grain is deterministic, so rebuilds are identical


# ── the lighting rig ─────────────────────────────────────────────────────────
# REVISED 7 Sep, third pass, against two references Arthur generated elsewhere.
#
# WHAT THOSE CHANGED
# Every version before this used radial lights, and every one of them read as
# lamps in a dark room. Arthur's references are not lamps. They are DIAGONAL
# RAKING BANDS: light crossing a surface at a shallow angle, so the iso-
# luminance lines run lower-left to upper-right and the whole field reads as
# one continuous sheet rather than as a set of sources. A structure tensor on
# the reference puts the bands at roughly 8 degrees off horizontal.
#
# That is a different primitive, not a different tuning, which is why no amount
# of moving ellipses around ever got close.
#
# They are also far gentler than the poster references. Measured:
#     bright version   median 0.134   p95 0.237   max 0.353   (2.6x range)
#     dark version     median 0.017   p95 0.044   max 0.093
# Both keep the top corners dark and the bottom brighter. There is no hot core
# at all. Arthur has asked for the two corner lifts below on top of that.
#
# TWO KINDS OF LIGHT
#
#   kind="band"   an infinite stripe. Gaussian in the PERPENDICULAR distance
#                 from a line, so it has no ends and no centre, which is what
#                 stops it reading as a source. This is the primitive that
#                 makes the field a sheet.
#       ang       degrees from horizontal, positive = rising to the right
#       pos       where the line sits, 0-1 across the perpendicular axis
#       width     Gaussian sigma of the stripe, in frame widths
#
#   kind="spot"   an ellipse, as before. Now used ONLY for the corner lifts,
#                 where a soft local bloom is exactly what is wanted.
#       x, y, rx, ry, soft
#
# Both take rgb (the light's colour at full power) and power (peak contribution
# in linear light). They SUM.
LIGHTS = [
    # ── the sheet ────────────────────────────────────────────────────────────
    # DEEP BLUE. The widest band and the body of the field. Sampled from the
    # reference's most saturated pixels.
    dict(kind="band", ang=20.0, pos=0.50, width=0.170, rgb=(34, 100, 214), power=0.50),

    # PALE STREAK. A narrower, lighter band riding just above the blue. This is
    # the highlight that gives the sheet its fold; without it the blue is flat.
    dict(kind="band", ang=20.0, pos=0.33, width=0.065, rgb=(158, 192, 240), power=0.26),

    # VERMILION. The warm band, crossing at a slightly different angle so the
    # two are not parallel. Non-parallel bands are what make the field look
    # woven rather than striped.
    dict(kind="band", ang=13.0, pos=0.85, width=0.125, rgb=(236, 92, 44), power=0.44),

    # WARM UNDERTONE. Very wide, very dim, low in the frame. Keeps the bottom
    # from going cold between the vermilion and the blue.
    dict(kind="band", ang=16.0, pos=0.03, width=0.130, rgb=(232, 90, 46), power=0.36),

    # ── the corner lifts, per Arthur 7 Sep ───────────────────────────────────
    # "more light coming from the left top corner and bottom right corner, but
    # subtle and fully blended in".
    #
    # SUBTLE is the whole brief, so these are the two lowest-powered lights in
    # the rig and both are larger than the frame. A corner lift that reads as a
    # glow has failed; it should only be noticeable if you cover it up.
    #
    # They are also the two lights the LEGIBILITY numbers are most sensitive
    # to, because the top-left is where the hero copy sits. If the build starts
    # reporting the hero zone below 4.5:1, this is the first place to look.
    dict(kind="spot", x=-0.04, y=-0.06, rx=0.78, ry=0.92, rgb=(152, 180, 228), power=0.115, soft=1.30),
    dict(kind="spot", x=1.05, y=1.06, rx=0.80, ry=0.94, rgb=(238, 142, 96), power=0.105, soft=1.30),

    # DEEP AMBIENT. Nothing is ever pure black. Every reference shares this and
    # it is what makes the dark read as velvet rather than as a hole.
    dict(kind="spot", x=0.46, y=0.50, rx=1.70, ry=1.70, rgb=(34, 40, 78), power=0.020, soft=1.05),
]

# Warm lights are capped so they read as amber shadow, never as an accent.
# #E84420 at full luminance must remain the brightest orange on the site; if a
# warm light here exceeded it, the accent would stop being an accent. Applied
# to any light whose hue is warmer than 70deg or cooler than 330deg.
WARM_CEILING = 0.34

# DIFFUSION. The pass that turns a rig into a field.
#
# The first attempt at this rig produced two visible eggs, a cyan one and a
# warm one, which is the same "separate lobes with gaps between them" failure
# that killed all four CSS attempts. Discrete light sources always look
# discrete until something integrates them.
#
# A large Gaussian on the LINEAR buffer is that something. In linear light it
# is physically a diffuser in front of the whole rig, so the result is what a
# softbox does rather than what a blur filter does to a picture. Expressed as
# a fraction of frame width.
# Two scales, not one. A single blur wide enough to unify the rig also spreads
# every light across the whole frame, and the field goes from six eggs to one
# even wash: unified, and dead. Both failures were reached in that order.
#
# Optics do not work that way. A real diffuser leaves a defined core and throws
# a much wider, much fainter halo, and it is the coexistence of those two
# scales that lets the references hold near-black and near-white in one frame.
#
# DIFFUSE keeps the core honest. BLOOM_SIGMA is the halo, added at BLOOM_GAIN
# rather than averaged in, so it fills the gaps between lights without pulling
# the lit areas down toward the mean.
DIFFUSE      = 0.055
BLOOM_SIGMA  = 0.230
BLOOM_GAIN   = 0.30

# SHADOW CRUSH. The exposure curve, and the last piece of the puzzle.
#
# With the rig unified, the field was still an even wash: everything between
# 0.10 and 0.45, no true dark and no true light. Both references instead hold
# large near-black regions AND a hot core in the same frame. That separation is
# not a property of where the lights are; it is a property of the TONE CURVE.
#
# A power curve in linear light crushes the low end while leaving the top
# almost untouched. At 1.9: an area at 0.50 falls to 0.28, one at 0.20 falls to
# 0.046, one at 0.05 falls to 0.0033. The lit core survives, the half-lit
# surround collapses into shadow, and the field acquires the depth Arthur has
# been asking for since this morning.
#
# This is also what finally makes the frosted cards work. A card needs strong
# variation BEHIND it to refract, and an even wash has none by definition.
#
# Higher crushes harder. Below about 1.4 the wash comes back.
SHADOW_CRUSH = 1.62

# Vignette. Reference 5815 measures 7.3x centre-to-edge, and that ratio is what
# makes the lit region read as a beam rather than as a bright wall.
VIG_CENTRE   = (0.46, 0.56)
VIG_INNER    = 0.30    # untouched out to here
VIG_STRENGTH = 0.50    # how far the corners fall
VIG_CURVE    = 1.55

# TOP HOLD-DOWN. A separate darkening across the top of the frame.
#
# Not part of the vignette, because the vignette is radial and this needs to be
# a band. Both references keep their top strip near-black and let the beam
# enter at mid-height, and the page needs exactly that for a different reason:
# the nav and the hero headline live up there, and they are the two things on
# the site that most need to be legible without a panel behind them.
#
# It is set generously (0.62) for a reason specific to this site rather than to
# the references: the homepage hero puts its copy in the upper LEFT, which is
# also where a wash entering from the left naturally lands. An earlier version
# of this rig put the beam straight through the headline and measured 1.20:1.
# Arthur has ruled out putting the hero on glass, so the beam moves instead: it
# still enters from the left, but low, and the top of the frame is held down.
#
# Fraction of frame height affected, and how hard.
TOP_HOLD      = 0.44
TOP_HOLD_AMT  = 0.74

# Grain. References measure sigma 3.9 and 7.2 on an 8-bit channel.
GRAIN_SIGMA  = 4.4
GRAIN_BLUR   = 0.6     # slight blur: pixel-perfect noise reads as sensor dirt

# Exposure trim, applied in linear light before the transfer back to sRGB.
# The one dial to reach for if the whole field wants to be brighter or darker
# WITHOUT changing the composition. Prefer this to editing every power above.
EXPOSURE = 1.28


def srgb_to_linear(c):
    c = c / 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def linear_to_srgb(c):
    c = max(0.0, min(1.0, c))
    c = 12.92 * c if c <= 0.0031308 else 1.055 * (c ** (1 / 2.4)) - 0.055
    return c * 255.0


# The darkest the field is ever allowed to get, in LINEAR light, added after
# the vignette. Every reference shares this and it is the single detail that
# separates velvet from a hole: none of them contains pure black. Grain is
# applied after this and swings +/- a few levels, so the floor also has to be
# high enough that noise cannot push a pixel to zero.
FLOOR = tuple(srgb_to_linear(v) for v in (16, 13, 29))


def gaussian(a, sigma):
    """Separable Gaussian blur on a float HxWxC array.

    Written out rather than reached for from PIL because PIL's GaussianBlur
    refuses float ("F") images, and the whole point of this pass is that it
    happens in LINEAR light at full float precision. Doing it on 8-bit sRGB
    instead would quantise the very smooth areas the blur exists to create,
    and would blend in gamma space, which is the paint-mixing behaviour this
    script is built to avoid.

    Edges are handled by clamping rather than zero-padding: zero-padding would
    darken the frame border, and this field is meant to bleed off every edge.
    """
    if sigma <= 0:
        return a
    r = max(1, int(sigma * 3))
    x = np.arange(-r, r + 1, dtype=np.float64)
    k = np.exp(-(x ** 2) / (2 * sigma ** 2))
    k /= k.sum()

    out = a
    for axis in (0, 1):
        pad = [(0, 0)] * out.ndim
        pad[axis] = (r, r)
        padded = np.pad(out, pad, mode="edge")
        # Accumulated in place rather than stacked: at these radii a stacked
        # version allocates well over a gigabyte and the process is killed.
        res = np.zeros_like(out)
        for i, w in enumerate(k):
            if w == 0.0:
                continue
            res += w * np.take(padded, np.arange(i, i + out.shape[axis]), axis=axis)
        out = res
    return out


def is_warm(rgb):
    r, g, b = rgb
    mx, mn = max(rgb), min(rgb)
    if mx == mn:
        return False
    if mx == r:
        h = (60 * ((g - b) / (mx - mn))) % 360
    elif mx == g:
        h = 60 * ((b - r) / (mx - mn)) + 120
    else:
        h = 60 * ((r - g) / (mx - mn)) + 240
    return h < 70 or h > 330


def main():
    # Assertions, because a previous version of this file silently discarded
    # every tuned parameter (a duplicated function definition shadowed the
    # first) and produced identical output for several rounds of "I see no
    # difference" — which was accurate; there was none.
    assert LIGHTS, "no lights in the rig"
    assert any(is_warm(l["rgb"]) for l in LIGHTS), "rule 3: no warm light present"
    assert any(not is_warm(l["rgb"]) for l in LIGHTS), "rule 3: no cool light present"

    # Pre-convert light colours to linear, and apply the warm cap.
    rig = []
    for l in LIGHTS:
        power = l["power"]
        if is_warm(l["rgb"]):
            power = min(power, WARM_CEILING)
        rig.append({**l, "power": power,
                    "lin": np.array([srgb_to_linear(v) for v in l["rgb"]])})

    # ── composite, additively, in linear light ───────────────────────────────
    # Built at half size: the field carries no detail above this frequency, and
    # the diffusion pass below would destroy it if it did.
    cw, ch = W // 2, H // 2
    fx = np.linspace(0.0, 1.0, cw)[None, :]
    fy = np.linspace(0.0, 1.0, ch)[:, None]

    acc = np.zeros((ch, cw, 3), dtype=np.float64)
    # Aspect-corrected vertical axis, so a stated band angle is the angle you
    # actually see rather than one skewed by the 960x600 frame.
    ay = fy * (H / W)

    for l in rig:
        if l["kind"] == "band":
            th = np.radians(l["ang"])
            # Signed perpendicular distance from the band's line. No centre and
            # no ends: this is what stops a band reading as a source.
            #
            # NORMALISED across the frame's actual perpendicular extent, which
            # depends on the angle. Without this, pos does not mean what it
            # says: the first version of this had the blue band peaking off
            # frame at 0.53 strength while the vermilion sat at full power
            # across the whole lower right, and the field came out maroon.
            u = fx * np.sin(th) - ay * np.cos(th)
            span = abs(np.sin(th)) + abs(np.cos(th)) * (H / W)
            u = (u + abs(np.cos(th)) * (H / W)) / span   # 0 at one edge, 1 at the other
            f = np.exp(-((u - l["pos"]) / l["width"]) ** 2)
        else:
            d2 = ((fx - l["x"]) / l["rx"]) ** 2 + ((fy - l["y"]) / l["ry"]) ** 2
            f = np.clip(1.0 - d2, 0.0, None) ** l["soft"]
        acc = acc + (f * l["power"])[..., None] * l["lin"][None, None, :]

    # ── diffusion ────────────────────────────────────────────────────────────
    # See DIFFUSE above. This is what makes it one field instead of six lights.
    core = gaussian(acc, DIFFUSE * cw)
    halo = gaussian(acc, BLOOM_SIGMA * cw)
    acc = core + BLOOM_GAIN * halo

    # ── vignette, in linear light ────────────────────────────────────────────
    vcx, vcy = VIG_CENTRE
    d = np.sqrt(((fx - vcx) / 0.78) ** 2 + ((fy - vcy) / 0.72) ** 2)
    t = np.clip((d - VIG_INNER) / (1.0 - VIG_INNER), 0.0, 1.0)
    k = 1.0 - VIG_STRENGTH * (t ** VIG_CURVE)
    acc = acc * k[..., None]

    # ── exposure curve ───────────────────────────────────────────────────────
    # See SHADOW_CRUSH. Applied per channel in linear light, so it is an
    # exposure decision rather than a colour one; doing it on sRGB would shift
    # hue in the shadows and turn the deep indigo grey.
    acc = np.clip(acc, 0.0, None) ** SHADOW_CRUSH

    # ── top hold-down ────────────────────────────────────────────────────────
    # See TOP_HOLD. Applied after the crush so it darkens what survived it,
    # rather than being amplified by it.
    ty = np.clip(fy / TOP_HOLD, 0.0, 1.0)
    acc = acc * (1.0 - TOP_HOLD_AMT * (1.0 - ty) ** 2)[..., None]

    acc = acc + np.array(FLOOR)[None, None, :]

    # ── linear -> sRGB ───────────────────────────────────────────────────────
    a = np.clip(acc, 0.0, 1.0)
    srgb = np.where(a <= 0.0031308, 12.92 * a, 1.055 * np.power(a, 1 / 2.4) - 0.055)
    small = Image.fromarray(np.round(srgb * 255).astype(np.uint8), mode="RGB")

    mesh = small.resize((W, H), Image.BICUBIC)

    # ── grain ────────────────────────────────────────────────────────────────
    # Applied last, at full resolution, so the upscale does not smear it. It is
    # doing two jobs: the texture Arthur asked for, and dither. A gradient this
    # soft WILL band on an 8-bit display without it, and banding is what makes
    # a large soft field look cheap.
    rng = np.random.default_rng(SEED)
    n = rng.normal(0.0, GRAIN_SIGMA, (H, W)).astype(np.float32)
    if GRAIN_BLUR:
        n = gaussian(n[..., None], GRAIN_BLUR)[..., 0]
    arr = np.asarray(mesh, dtype=np.float32) + n[..., None]
    mesh = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), mode="RGB")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    mesh.save(OUT, "WEBP", quality=94, method=6)
    report(mesh)


def report(mesh):
    def lum(c):
        f = lambda v: (v / 255) / 12.92 if v <= 10.31 else (((v / 255) + 0.055) / 1.055) ** 2.4
        return .2126 * f(c[0]) + .7152 * f(c[1]) + .0722 * f(c[2])

    data = list(mesh.convert("RGB").get_flattened_data()) \
        if hasattr(mesh, "get_flattened_data") else list(mesh.convert("RGB").getdata())
    L = sorted(lum(p) for p in data)
    n = len(L)
    med, p95, mx = L[n // 2], L[int(n * .95)], L[-1]
    mn = L[0]

    # share of the field a bare paragraph could sit on
    ok_primary = sum(1 for v in L if v <= 0.158) / n
    ok_secondary = sum(1 for v in L if v <= 0.069) / n

    print(f"wrote {OUT.relative_to(OUT.parent.parent.parent)}  {W}x{H}  "
          f"{OUT.stat().st_size / 1024:.1f} KB")
    print(f"  luminance   min {mn:.4f}   median {med:.3f}   p95 {p95:.3f}   max {mx:.3f}")
    print(f"  references  ......         0.075-0.086      0.48-0.52      1.000")
    print(f"  legible for #F7F4EF body text over {ok_primary:.0%} of the field")
    print(f"  legible for #BDB7AE body text over {ok_secondary:.0%} of the field")
    print()
    print(f"  dark median (< 0.12):     {'yes' if med < 0.12 else 'NO — field is a plateau, not a beam'}")
    # Replaced the old "hot core > 0.45" check on 7 Sep. That threshold came
    # from the poster references, which peak at 1.000. Arthur's chosen
    # references peak at 0.093 and 0.353, so a hot core is no longer the goal
    # and the check was failing on a target we had deliberately moved away
    # from. What still matters is whether a frosted card has anything behind it
    # to refract, so measure THAT: the luminance ratio across a card-sized
    # window, at the three places cards actually sit.
    w, h = mesh.size
    import numpy as _np
    A = _np.asarray(mesh.convert("RGB"), dtype=float) / 255
    A = _np.where(A <= 0.04045, A / 12.92, ((A + 0.055) / 1.055) ** 2.4)
    Y = .2126 * A[..., 0] + .7152 * A[..., 1] + .0722 * A[..., 2]
    ratios = []
    for cy, cx in ((.24, .60), (.58, .16), (.46, .40)):
        win = Y[int(cy * h):int((cy + .26) * h), int(cx * w):int((cx + .28) * w)]
        ratios.append(win.max() / max(win.min(), 1e-4))
    print(f"  frost variation across a card: "
          f"{'  '.join(f'{r:.1f}x' for r in ratios)}")
    print(f"  cards have something to refract (>2x):  "
          f"{'yes' if min(ratios) > 2.0 else 'NO — the field is flat where the panels sit'}")
    print(f"  no pure black:            {'yes' if mn > 0.0015 else 'NO — raise the ambient light'}")


if __name__ == "__main__":
    main()
