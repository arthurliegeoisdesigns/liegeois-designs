# docs/

The design system for liegeoisdesigns.com. **Version controlled on purpose.**

## Why these live here

`DESIGN.md` and `PRODUCT.md` used to sit at the workspace root, outside this
git repo. They were the documents everything else was built from and they had
no history, no review trail, and no backup beyond one local disk. Four
different versions of "the design system" had drifted apart precisely because
nothing tracked when or why any of them changed.

They now live beside the code they describe, so a change to a token and the
change to the doc that justifies it land in the same commit.

## Files

| File | What it is |
|---|---|
| `DESIGN.md` | **The single source of truth.** v3, derived from shipped code. |
| `PRODUCT.md` | Register, audience, purpose, anti-references, design principles. |
| `DESIGN.superseded-2026-06-15.md` | Previous design system. Kept for lineage — it declared "no light mode" and named Cormorant Garamond. |
| `history/` | The June 2026 `impeccable` critique (scored 30/40) and the superseded `design.json`. Both predate the current site. |

## Running impeccable — cwd matters

`impeccable`'s context loader resolves in this order:

1. `cwd`, if `PRODUCT.md` or `DESIGN.md` is there
2. `cwd/.agents/context`, then **`cwd/docs`**  ← how it finds these
3. `$IMPECCABLE_CONTEXT_DIR`
4. `cwd`, as a "nothing found" default

So it must be run **from this repo root** (`liegeois-designs/`), not from the
workspace root above it:

```bash
cd liegeois-designs
node ../.claude/skills/impeccable/scripts/context.mjs
```

Run from the workspace root it reports `NO_PRODUCT_MD` and will try to send you
through `reference/init.md` to write a PRODUCT.md that already exists.

Alternatively set `IMPECCABLE_CONTEXT_DIR=./liegeois-designs/docs`.

## Rule

If a token changes in `globals.css`, `DESIGN.md` changes in the same commit.
That coupling is the entire point of moving these here — the drift they were
recovered from is what happens when it is optional.
