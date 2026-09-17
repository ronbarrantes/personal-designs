# Design concepts for ronb.co

Five directions for a personal site whose centre of gravity is the blog. Plain HTML and
CSS, no build step, no framework. The only JavaScript is a ~30-line theme toggle (plus a
contents-tracker in concept 07).

House rules for this round: no gradients, no glows, no soft-focus decoration; nothing
centred — every layout is built on a left-aligned grid; and spacing is tight enough that a
laptop screen shows real content rather than air.

Open `index.html` for the gallery, or serve the folder:

```bash
python3 -m http.server 8000   # then http://localhost:8000
```

## The five concepts

| | Concept | Structure | Reading view |
|---|---|---|---|
| 03 | [Index](designs/03-index-archive/) | Sticky identity rail, one narrow column | Serif column, numbered section heads |
| 04 | [Ledger](designs/04-ledger/) | Flat top bar, ruled four-column archive table | Body beside a sticky meta + contents column |
| 05 | [Split](designs/05-split/) | Full-height panel pinned left, content stream right | Panel carries the article's context while you read |
| 06 | [Broadsheet](designs/06-broadsheet/) | 12-column editorial grid, lead story + shorts | Seven-column body, sticky margin notes, drop cap |
| 07 | [Workbench](designs/07-workbench/) | Three panes: nav rail, content, contents | Serif body with a contents pane that tracks your position |

Concepts 03–05 are one family (03 is the original, tightened; 04 and 05 are variations on
its skeleton). 06 and 07 are separate structures.

Each folder is self-contained and has the same three pages:

- `index.html` — home
- `writing.html` — blog archive
- `post.html` — a sample article with the full typographic scale
- `style.css`, `theme.js`

## The switcher

Every design page loads `switcher.js`, which injects a floating bar at the bottom of the
screen: the left half jumps between the five concepts **keeping the page you are on**
(so you can compare the same article three ways), the right half moves between home,
archive and article within the current concept. It adapts to light and dark, collapses to
numbers on phones, and can be dismissed with the `×` (remembered for the tab).

It is preview scaffolding, not part of any design — delete `switcher.js` and the single
`<script src="../../switcher.js" defer>` tag in each page once you pick a direction.

## Shared decisions

**Light and dark.** Every concept defines its palette as custom properties on `:root`,
redefines them under `@media (prefers-color-scheme: dark)` (guarded with
`:root:not([data-theme="light"])`) and again under `:root[data-theme="dark"]`. So the page
follows the OS by default, and the toggle overrides it and remembers the choice in
`localStorage`. `theme.js` runs in `<head>` before paint, so there is no flash.

**Accessibility.** Semantic landmarks and heading order, a skip link, visible
`:focus-visible` rings, `aria-current="page"` on the active nav item, an `aria-pressed`
theme button with a text label (not an icon alone), body text at 17–19px, text colours at
or above WCAG AA on both backgrounds, and a `prefers-reduced-motion` block in each
stylesheet. Decorative things (the gradient, the progress bar) are hidden from assistive
tech.

**Space.** Section rhythm and page gutters are `clamp()`-based, so the whitespace scales
with the viewport instead of collapsing at one breakpoint. Measures stay in the 34–42rem
range wherever there is prose.

**Type.** Loaded from Google Fonts for the demo: Inter and IBM Plex Mono throughout, with
Source Serif 4 for body copy in 03 and 07, and Instrument Serif for display in 06.
Self-host them (or swap in system stacks) before shipping.

All copy, post titles and dates are placeholder.

## Earlier rounds

The first round (`01-quiet-editorial`, warm paper and serif; `02-soft-horizon`, centred
with a gradient) was cut. Both are still in git history if you ever want a look:
`git show f2c4322..e271a57`.
