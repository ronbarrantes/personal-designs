# Design concepts for ronb.co

Twenty-five directions for a personal site whose centre of gravity is the blog. Plain
HTML and CSS, no build step, no framework. The only JavaScript is the shared theme toggle
and the preview switcher.

Open `index.html` for the gallery, or serve the folder:

```bash
python3 -m http.server 8000   # then http://localhost:8000
```

## The concepts

Each folder is self-contained and has the same three pages:

- `index.html` — home
- `writing.html` — blog archive
- `post.html` — a sample article with the full typographic scale
- `style.css`, `theme.js`

| | Concept | Direction | Reading view |
|---|---|---|---|
| 03 | [Index](designs/03-index-archive/) | Sticky identity rail, narrow column, hairlines | Serif column with numbered section heads |
| 04 | [Ledger](designs/04-ledger/) | Flat top bar and ruled record-book archive | Body beside sticky meta and contents |
| 05 | [Split](designs/05-split/) | Full-height identity panel with scrolling content | Context remains pinned while reading |
| 06 | [Broadsheet](designs/06-broadsheet/) | Twelve-column editorial grid, lead story and shorts | Wide article with margin notes |
| 07 | [Workbench](designs/07-workbench/) | Three-pane application frame | Contents pane tracks article position |
| 08 | [Marginalia Map](designs/08-marginalia-map/) | Cartographic knowledge garden | Field-map article with route-like metadata |
| 09 | [Receipt Zine](designs/09-receipt-zine/) | Stapled zine, receipts, stamps, rotated scraps | Loud handmade article surface |
| 10 | [Quiet Dossier](designs/10-quiet-dossier/) | Brutalist case-file restraint | Heavy rules and sober case notes |
| 11 | [Alpine Grid](designs/11-alpine-grid/) | Swiss poster grid and primary accents | Disciplined oversized type hierarchy |
| 12 | [Constellation Notes](designs/12-constellation-notes/) | Night-sky archive with orbital nodes | Compact luminous reading modules |
| 13 | [Index Cards](designs/13-index-cards/) | Clipped cards, accession labels, cross-references | Card-catalog article rhythm |
| 14 | [Terminal Garden](designs/14-terminal-garden/) | Command-line knowledge garden | Monospace logbook reading flow |
| 15 | [Museum Labels](designs/15-museum-labels/) | Exhibition catalog and object labels | Curatorial prose with accession details |
| 16 | [Radio Log](designs/16-radio-log/) | Broadcast-desk interface and signal strips | Timestamped transcript-like article |
| 17 | [Hypertext Lab](designs/17-hypertext-lab/) | Browser-native link cloud and fragments | Exposed anchors and asymmetry |
| 18 | [Notebook Riso](designs/18-notebook-risograph/) | Two-ink ruled notebook and riso texture | Research-note article system |
| 19 | [Cinema Index](designs/19-cinema-index/) | Film-program frames and scene slugs | Dramatic widescreen editorial pacing |
| 20 | [Legal Pad](designs/20-legal-pad/) | Yellow-pad rules and sidebar objections | Footnote-friendly argument page |
| 21 | [Data Atlas](designs/21-data-atlas/) | Quantified-self charts and tabular essays | Analytical article with atlas cues |
| 22 | [Type Specimen](designs/22-type-specimen/) | Typography-first specimen pages | Measured scale and glyph-like modules |
| 23 | [Attic Archive](designs/23-attic-archive/) | Warm folders, shelf marks, personal history | Archival cabinet reading surface |
| 24 | [Field Station](designs/24-field-station/) | Coordinates, specimens, weather chips | Compact outdoor field reports |
| 25 | [Pixel Bureau](designs/25-pixel-bureau/) | Low-resolution office windows | Bitmap-border article shell |
| 26 | [Calendar Wall](designs/26-calendar-wall/) | Year-wall and seasonal time blocks | Chronological article framing |
| 27 | [Signal Noise](designs/27-signal-noise/) | Scanlines, waveforms, fractured modules | Experimental signal-processing article |

## Research references

The expanded set uses Awwwards portfolio collections, SiteInspire, Typewolf portfolio
examples, Brutalist Websites, and Designlab brutalism examples as broad research input:
editorial grids, dense archive systems, experimental typography, restrained brutalist
interfaces, personal knowledge gardens, zines, dossiers, and field-note systems. No
specific site, code, text, asset, or recognizable identity was copied.

## The switcher

Every design page loads `switcher.js`, which injects a floating bar at the bottom of the
screen. It jumps between all 25 concepts while keeping the page you are on, so you can
compare the same home, archive, or article view across the whole gallery. It adapts to
light and dark, collapses to numbers on phones, and can be dismissed with the `×`
remembered for the tab.

It is preview scaffolding, not part of any design. Delete `switcher.js` and the single
`<script src="../../switcher.js" defer>` tag in each page once you pick a direction.

## Shared decisions

**Light and dark.** Every concept defines its palette as custom properties on `:root`,
redefines them under `@media (prefers-color-scheme: dark)` guarded with
`:root:not([data-theme="light"])`, and again under `:root[data-theme="dark"]`. The page
follows the OS by default, and the toggle overrides it and remembers the choice in
`localStorage`.

**Accessibility.** Semantic landmarks and heading order, a skip link, visible
`:focus-visible` rings, `aria-current="page"` on the active nav item, an `aria-pressed`
theme button with a text label, readable body text, and `prefers-reduced-motion` blocks.

**Static hosting.** The gallery is dependency-free and Vercel/static-host friendly. There
is no package manager, build output, or runtime server requirement.

All copy, post titles, names, and dates are placeholder.

## Earlier rounds

The first round (`01-quiet-editorial`, warm paper and serif; `02-soft-horizon`, centred
with a gradient) was cut. Both are still in git history if you ever want a look:
`git show f2c4322..e271a57`.
