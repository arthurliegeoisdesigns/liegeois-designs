#!/usr/bin/env python3
"""
Subset the PP Migra display faces to the characters this site actually uses.

PP Migra ships 479 glyphs; liegeoisdesigns.com uses 22 non-ASCII characters.
The full faces (101 KB combined) were gating LCP: on Slow 4G the Extralight
cut landed at ~4.5s and LCP fired ~25ms later, because Chrome doesn't score
the hero <h1> until the real face repaints it.

Subsetting to Latin-1 + the punctuation in use drops that to ~26 KB.

Verified safe: ↗ ─ ═ ✓ are absent from the SOURCE font, so they already fall
back to Georgia today — subsetting changes nothing for them.

Run:  python3 scripts/subset-fonts.py
Deps: pip install fonttools brotli
"""
import os
import sys

try:
    from fontTools import subset
    from fontTools.ttLib import TTFont
except ImportError:
    sys.exit("Missing deps. Run: pip install fonttools brotli")

SRC_DIR = "public/fonts/pp"
FACES = [
    "PPMigra-Extralight",
    "PPMigra-ExtralightItalic",
    # Body face. Only 400/500 are licensed — Pangram Pangram charges per
    # weight. Do not add more without buying them.
    "PPNeueMontreal-Regular",
    "PPNeueMontreal-Medium",
]

# Latin-1 + smart quotes, dashes, ellipsis, bullet, arrows the site uses.
UNICODES = ",".join([
    "U+0020-007E",   # basic latin
    "U+00A0-00FF",   # latin-1 supplement (é, è, ç, à ...)
    "U+2013", "U+2014",                      # – —
    "U+2018", "U+2019", "U+201C", "U+201D",  # ' ' " "
    "U+2022", "U+2026",                      # • …
    "U+2190", "U+2192", "U+2193",            # ← → ↓
])

# Characters that must survive subsetting IF the source has them.
MUST_KEEP = [0x00E9, 0x00E8, 0x2014, 0x2019, 0x201C, 0x2022, 0x2192, 0x2193]


def main() -> int:
    total_before = total_after = 0
    failed = False

    for face in FACES:
        src = os.path.join(SRC_DIR, f"{face}.woff2")
        if not os.path.exists(src):
            print(f"  SKIP {face}: {src} not found")
            continue

        full = os.path.join(SRC_DIR, f"{face}.full.woff2")
        # Keep a pristine copy of the original exactly once.
        if not os.path.exists(full):
            import shutil
            shutil.copy2(src, full)
            print(f"  archived original -> {full}")

        out = os.path.join(SRC_DIR, f"{face}.woff2")
        before = os.path.getsize(full)

        subset.main([
            full,
            f"--unicodes={UNICODES}",
            "--flavor=woff2",
            f"--output-file={out}",
            "--layout-features=kern,liga,calt",
            "--no-hinting",
            "--desubroutinize",
        ])

        after = os.path.getsize(out)
        cmap = TTFont(out).getBestCmap()
        src_cmap = TTFont(full).getBestCmap()

        # Only fail on glyphs the SOURCE actually had.
        lost = [hex(c) for c in MUST_KEEP if c in src_cmap and c not in cmap]
        if lost:
            print(f"  FAIL {face}: lost glyphs {lost}")
            failed = True

        total_before += before
        total_after += after
        pct = (1 - after / before) * 100
        print(f"  {face}: {before/1024:.1f} KB -> {after/1024:.1f} KB  (-{pct:.0f}%, {len(cmap)} glyphs)")

    if total_before:
        print(f"\n  TOTAL: {total_before/1024:.1f} KB -> {total_after/1024:.1f} KB "
              f"(saved {(total_before-total_after)/1024:.1f} KB)")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
