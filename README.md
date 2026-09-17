# Design concepts for ronb.co

Three radically different directions for a personal site whose centre of gravity is the
blog. Plain HTML and CSS, no build step, no framework. The only JavaScript is a ~30-line
theme toggle (plus an optional reading-progress bar in concept 02).

Open `index.html` for the gallery, or serve the folder:

```bash
python3 -m http.server 8000   # then http://localhost:8000
```

## The three concepts

| | Concept | Feel | Reading layout |
|---|---|---|---|
| 01 | [Quiet Editorial](designs/01-quiet-editorial/) | Warm paper, serif display type, literary | Long serif measure, drop cap, hanging sidenotes |
| 02 | [Soft Horizon](designs/02-soft-horizon/) | Airy, rounded, one soft gradient horizon, modern sans | Centred column, cards, reading-progress line |
| 03 | [Index & Archive](designs/03-index-archive/) | Precise, hairlines, mono metadata, numbered archive | Sticky identity rail + one narrow serif column |

Each folder is self-contained and has the same three pages:

- `index.html` — home
- `writing.html` — blog archive
- `post.html` — a sample article with the full typographic scale
- `style.css`, `theme.js`

## The switcher

Every design page loads `switcher.js`, which injects a floating bar at the bottom of the
screen: the left half jumps between the three concepts **keeping the page you are on**
(so you can compare the same article three ways), the right half moves between home,
archive and article within the current concept. It adapts to light and dark, collapses to
`01 / 02 / 03` on phones, and can be dismissed with the `×` (remembered for the tab).

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

**Type.** Loaded from Google Fonts for the demo — 01 uses Fraunces + Newsreader, 02 uses
Plus Jakarta Sans + Inter, 03 uses Inter + IBM Plex Mono + Source Serif 4. Self-host them
(or swap in system stacks) before shipping.

All copy, post titles and dates are placeholder.
