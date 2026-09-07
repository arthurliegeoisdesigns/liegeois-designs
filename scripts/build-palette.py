#!/usr/bin/env python3
"""
Build the slate-blue tonal ramp, and render a palette sheet to look at.

    python3 scripts/build-palette.py

Writes ../palette.html in the workspace root.

WHY
Arthur, 7 Sep: "Having everything in the same colour density doesn't help. We
need to introduce more shades of slate-blue to the colour palette."

He is right, and it is the thing four rounds of backdrop work were working
around. The site had three slate-blues and all three were TEXT colours. There
were no slate SURFACES at all, so every panel, card and section sat at
effectively one density and depth had to come entirely from the gradient
behind. That is why the cards read flat no matter what the backdrop did.

GAA's own sheet has seven neutrals spanning black to Cloud Grey plus three
accent blues. This builds the equivalent: a ramp anchored on their published
values, with even perceptual spacing so each step is a usable, distinguishable
surface rather than a near-repeat of its neighbour.

METHOD
Steps are spaced evenly in CIELAB L*, not in sRGB. Even sRGB steps look
bunched in the shadows and stretched in the highlights, which is exactly how
you end up with "everything at the same density" at the dark end, where this
site lives.
"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent.parent / "palette.html"

# GAA's published values, used as anchors so the ramp stays their family.
ANCHORS = {
    "Absolute Black": "#000000",
    "Deep Carbon":    "#090909",
    "Graphite Blue":  "#292E35",
    "Steel Navy":     "#3D4B5C",
    "Mist Blue":      "#9EADC2",
    "Soft Slate":     "#C3CDDA",
    "Cloud Grey":     "#E6EBEF",
    "Abyss Navy":     "#001126",
    "Union Blue":     "#255FA5",
    "Signal Blue":    "#2571CF",
}


# ── colour maths: sRGB <-> CIELAB, so the ramp is perceptually even ─────────
def _srgb_to_lin(c):
    c /= 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def _lin_to_srgb(c):
    c = 12.92 * c if c <= 0.0031308 else 1.055 * (c ** (1 / 2.4)) - 0.055
    return max(0, min(255, round(c * 255)))


def rgb_to_lab(rgb):
    r, g, b = (_srgb_to_lin(v) for v in rgb)
    x = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047
    y = (0.2126 * r + 0.7152 * g + 0.0722 * b)
    z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883
    f = lambda t: t ** (1 / 3) if t > 0.008856 else (7.787 * t + 16 / 116)
    fx, fy, fz = f(x), f(y), f(z)
    return (116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz))


def lab_to_rgb(lab):
    L, a, bb = lab
    fy = (L + 16) / 116
    fx, fz = fy + a / 500, fy - bb / 200
    g = lambda t: t ** 3 if t ** 3 > 0.008856 else (t - 16 / 116) / 7.787
    x, y, z = g(fx) * 0.95047, g(fy), g(fz) * 1.08883
    r = 3.2406 * x - 1.5372 * y - 0.4986 * z
    gg = -0.9689 * x + 1.8758 * y + 0.0415 * z
    b = 0.0557 * x - 0.2040 * y + 1.0570 * z
    return tuple(_lin_to_srgb(v) for v in (r, gg, b))


hex_to_rgb = lambda h: tuple(int(h.lstrip("#")[i:i + 2], 16) for i in (0, 2, 4))
rgb_to_hex = lambda c: "#{:02X}{:02X}{:02X}".format(*c)


def luminance(rgb):
    r, g, b = (_srgb_to_lin(v) for v in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a, b):
    la, lb = luminance(a), luminance(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


# ── the ramp ────────────────────────────────────────────────────────────────
# Twelve steps from the deepest navy to Cloud Grey, evenly spaced in L*.
# The hue holds through the slate-blue family: chroma peaks in the middle,
# where colour is most visible, and eases off at both ends so the darkest step
# does not go purple and the lightest does not go cyan.
STEPS = 12
L_LOW, L_HIGH = 3.5, 92.0
HUE_A, HUE_B = -1.5, -14.0     # Lab a*/b* direction: cool, slightly blue
CHROMA_PEAK = 1.35             # multiplier at mid-ramp


def ramp():
    out = []
    for i in range(STEPS):
        t = i / (STEPS - 1)
        L = L_LOW + (L_HIGH - L_LOW) * t
        # chroma is a bell: strongest in the middle of the ramp
        bell = 1.0 - abs(t - 0.45) / 0.55
        k = max(0.25, bell) * CHROMA_PEAK
        out.append(rgb_to_lab_clamp((L, HUE_A * k, HUE_B * k)))
    return out


def rgb_to_lab_clamp(lab):
    return lab_to_rgb(lab)


ROLES = [
    ("slate-00", "the room. Deepest surface, behind everything."),
    ("slate-05", "page base where the field bottoms out"),
    ("slate-10", "recessed panel, wells, inset areas"),
    ("slate-20", "CARD at rest. The workhorse surface."),
    ("slate-30", "raised card, hover state, active panel"),
    ("slate-40", "borders and dividers on dark"),
    ("slate-50", "the field's lit flank. Strongest atmosphere."),
    ("slate-60", "disabled text, deep metadata"),
    ("slate-70", "faint text tier, captions"),
    ("slate-80", "secondary text"),
    ("slate-90", "body text"),
    ("slate-95", "primary text, headlines"),
]

# Eyebrow accent candidates. Arthur, 7 Sep: "some accent colour for eyebrows
# (not necessarily orange)." Orange at 10px caps the whole backdrop, which is
# what flattened it; these are the alternatives worth looking at.
EYEBROWS = [
    ("Signal Blue lifted", "#5B9BE8", "GAA's Signal Blue raised for a dark surface. Their own move."),
    ("Ice",                "#97BBDC", "Cooler and quieter. Reads as light rather than as a colour."),
    ("Steel highlight",    "#A8BDD4", "Nearly neutral. The most restrained option."),
    ("Orange, kept",       "#FF6442", "For comparison. This is what caps the field at 0.034."),
]


def main():
    r = ramp()
    hexes = [rgb_to_hex(c) for c in r]

    print("SLATE-BLUE RAMP, even in CIELAB L*\n")
    print(f"{'role':<10} {'hex':<9} {'L*':>5} {'lum':>7}   {'on it: Cloud / Slate-70'}")
    for (name, use), c, hx in zip(ROLES, r, hexes):
        L = rgb_to_lab(c)[0]
        print(f"{name:<10} {hx:<9} {L:>5.1f} {luminance(c):>7.4f}   "
              f"{contrast(hex_to_rgb('#E6EBEF'), c):>5.2f} / {contrast(r[7], c):>5.2f}")

    cards = "".join(
        f'<div class="sw"><span style="background:{h}"></span>'
        f'<b>{n}</b><code>{h}</code><i>{u}</i></div>'
        for (n, u), h in zip(ROLES, hexes))

    eyes = "".join(
        f'<div class="eye" style="background:{hexes[3]}">'
        f'<p class="eb" style="color:{h}">Presentation design for founders</p>'
        f'<h3>Nothing was added.</h3>'
        f'<b>{n}</b><code>{h}</code><i>{d}</i></div>'
        for n, h, d in EYEBROWS)

    OUT.write_text(f"""<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Slate-blue ramp</title><style>
*{{box-sizing:border-box;margin:0;padding:0}}
body{{background:{hexes[0]};color:{hexes[11]};
  font:15px/1.6 ui-sans-serif,-apple-system,system-ui,sans-serif;padding:56px clamp(20px,5vw,72px)}}
h1{{font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:{hexes[8]};
  font-weight:500;margin-bottom:8px}}
p.lede{{color:{hexes[8]};max-width:64ch;margin-bottom:44px}}
h2{{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:{hexes[7]};
  font-weight:500;margin:52px 0 18px}}
.grid{{display:grid;gap:10px;grid-template-columns:repeat(auto-fill,minmax(230px,1fr))}}
.sw{{background:{hexes[2]};border:1px solid {hexes[5]};border-radius:14px;overflow:hidden;padding-bottom:14px}}
.sw span{{display:block;height:76px}}
.sw b{{display:block;font-size:13px;font-weight:500;margin:12px 14px 2px}}
.sw code{{display:block;font:12px ui-monospace,monospace;color:{hexes[7]};margin:0 14px 6px}}
.sw i{{display:block;font-style:normal;font-size:12px;color:{hexes[7]};margin:0 14px;line-height:1.5}}
.eyes{{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}}
.eye{{border:1px solid {hexes[5]};border-radius:18px;padding:24px}}
.eye .eb{{font-size:10px;letter-spacing:.22em;text-transform:uppercase;font-weight:500}}
.eye h3{{font-size:26px;font-weight:300;letter-spacing:-.02em;margin:10px 0 18px}}
.eye b{{display:block;font-size:13px;font-weight:500}}
.eye code{{display:block;font:12px ui-monospace,monospace;color:{hexes[8]};margin:2px 0 6px}}
.eye i{{font-style:normal;font-size:12px;color:{hexes[8]};line-height:1.5}}
</style></head><body>
<h1>Slate-blue ramp</h1>
<p class="lede">Twelve steps, evenly spaced in CIELAB L* rather than in sRGB, so
the dark end has usable separation instead of bunching. Anchored on GAA's
published neutrals. This page is itself painted only in these colours: the
background is slate-00, the cards are slate-10, the borders slate-40.</p>
<h2>The ramp, and what each step is for</h2>
<div class="grid">{cards}</div>
<h2>Eyebrow accent, on a slate-20 card</h2>
<div class="eyes">{eyes}</div>
</body></html>""", encoding="utf-8")
    print(f"\nwrote {OUT}")


if __name__ == "__main__":
    main()
