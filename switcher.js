/* ============================================================
   Design preview switcher.
   Injects a floating bar that jumps between the design concepts
   (keeping whichever page you are on) and between the pages of
   the current concept. Preview-only — delete this file and the
   one <script> tag per page when a direction is chosen.
   ============================================================ */
(function () {
  var DESIGNS = [
    { slug: "03-index-archive", num: "03", name: "Index" },
    { slug: "04-ledger",        num: "04", name: "Ledger" },
    { slug: "05-split",         num: "05", name: "Split" },
    { slug: "06-broadsheet",    num: "06", name: "Broadsheet" },
    { slug: "07-workbench",     num: "07", name: "Workbench" },
    { slug: "08-marginalia-map", num: "08", name: "Marginalia Map" },
    { slug: "09-receipt-zine", num: "09", name: "Receipt Zine" },
    { slug: "10-quiet-dossier", num: "10", name: "Quiet Dossier" },
    { slug: "11-alpine-grid", num: "11", name: "Alpine Grid" },
    { slug: "12-constellation-notes", num: "12", name: "Constellation Notes" },
    { slug: "13-index-cards", num: "13", name: "Index Cards" },
    { slug: "14-terminal-garden", num: "14", name: "Terminal Garden" },
    { slug: "15-museum-labels", num: "15", name: "Museum Labels" },
    { slug: "16-radio-log", num: "16", name: "Radio Log" },
    { slug: "17-hypertext-lab", num: "17", name: "Hypertext Lab" },
    { slug: "18-notebook-risograph", num: "18", name: "Notebook Riso" },
    { slug: "19-cinema-index", num: "19", name: "Cinema Index" },
    { slug: "20-legal-pad", num: "20", name: "Legal Pad" },
    { slug: "21-data-atlas", num: "21", name: "Data Atlas" },
    { slug: "22-type-specimen", num: "22", name: "Type Specimen" },
    { slug: "23-attic-archive", num: "23", name: "Attic Archive" },
    { slug: "24-field-station", num: "24", name: "Field Station" },
    { slug: "25-pixel-bureau", num: "25", name: "Pixel Bureau" },
    { slug: "26-calendar-wall", num: "26", name: "Calendar Wall" },
    { slug: "27-signal-noise", num: "27", name: "Signal Noise" }
  ];
  var PAGES = [
    { file: "index.html",   name: "Home" },
    { file: "writing.html", name: "Writing" },
    { file: "post.html",    name: "Article" }
  ];
  var HIDE_KEY = "design-switcher-hidden";

  /* ---- where are we? ---- */
  var parts = decodeURIComponent(window.location.pathname).split("/");
  var file = parts[parts.length - 1] || "index.html";
  var current = null;
  for (var i = 0; i < parts.length; i++) {
    for (var d = 0; d < DESIGNS.length; d++) {
      if (parts[i] === DESIGNS[d].slug) current = DESIGNS[d];
    }
  }
  if (!current) return; // not inside a design folder — nothing to switch
  if (PAGES.map(function (p) { return p.file; }).indexOf(file) === -1) file = "index.html";

  /* ---- styles ---- */
  var css = [
    ".ds-bar{--ds-bg:rgba(255,255,255,.82);--ds-fg:#16161a;--ds-mute:#6a6a74;",
    "--ds-line:#e2e2e7;--ds-active-bg:#16161a;--ds-active-fg:#fff;--ds-shadow:0 1px 2px rgba(0,0,0,.05),0 14px 40px -12px rgba(0,0,0,.28);",
    "position:fixed;left:50%;bottom:1rem;transform:translateX(-50%);z-index:9999;",
    "display:flex;align-items:center;gap:.5rem;max-width:calc(100vw - 1.5rem);overflow-x:auto;",
    "padding:.45rem .55rem;border:1px solid var(--ds-line);border-radius:999px;",
    "background:var(--ds-bg);color:var(--ds-fg);box-shadow:var(--ds-shadow);",
    "-webkit-backdrop-filter:saturate(180%) blur(14px);backdrop-filter:saturate(180%) blur(14px);",
    "font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;font-size:13px;line-height:1.2;}",

    "@media (prefers-color-scheme:dark){:root:not([data-theme='light']) .ds-bar{",
    "--ds-bg:rgba(22,22,26,.85);--ds-fg:#f0f0f4;--ds-mute:#9a9aa6;--ds-line:#33333c;",
    "--ds-active-bg:#f0f0f4;--ds-active-fg:#16161a;--ds-shadow:0 1px 2px rgba(0,0,0,.5),0 18px 44px -14px rgba(0,0,0,.8);}}",
    ":root[data-theme='dark'] .ds-bar{--ds-bg:rgba(22,22,26,.85);--ds-fg:#f0f0f4;--ds-mute:#9a9aa6;--ds-line:#33333c;",
    "--ds-active-bg:#f0f0f4;--ds-active-fg:#16161a;--ds-shadow:0 1px 2px rgba(0,0,0,.5),0 18px 44px -14px rgba(0,0,0,.8);}",

    ".ds-bar ul{display:flex;align-items:center;gap:.15rem;list-style:none;margin:0;padding:0;}",
    ".ds-bar a{display:block;white-space:nowrap;text-decoration:none;color:var(--ds-mute);",
    "padding:.4rem .7rem;border-radius:999px;transition:background .15s ease,color .15s ease;}",
    ".ds-bar a:hover{color:var(--ds-fg);background:color-mix(in srgb,var(--ds-fg) 8%,transparent);}",
    ".ds-bar a[aria-current]{background:var(--ds-active-bg);color:var(--ds-active-fg);}",
    ".ds-bar .ds-label{color:var(--ds-mute);font-size:10px;letter-spacing:.1em;text-transform:uppercase;padding-left:.5rem;}",
    ".ds-bar .ds-sep{width:1px;align-self:stretch;background:var(--ds-line);margin:.15rem .3rem;}",
    ".ds-bar button{font:inherit;color:var(--ds-mute);background:none;border:0;cursor:pointer;",
    "padding:.4rem .6rem;border-radius:999px;line-height:1;}",
    ".ds-bar button:hover{color:var(--ds-fg);background:color-mix(in srgb,var(--ds-fg) 8%,transparent);}",
    ".ds-bar :focus-visible{outline:2px solid #2b4eff;outline-offset:2px;}",
    ".ds-bar[hidden]{display:none;}",
    ".ds-show{position:fixed;right:1rem;bottom:1rem;left:auto;transform:none;}",
    ".ds-num{display:none;}",
    "@media (max-width:40rem){.ds-bar{font-size:12px;gap:.25rem;bottom:.6rem;}",
    ".ds-bar .ds-label{display:none;}.ds-bar .ds-name{display:none;}.ds-num{display:inline;}}",
    "@media (prefers-reduced-motion:reduce){.ds-bar *{transition:none !important;}}"
  ].join("");

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* ---- build ---- */
  function link(href, label, short, isCurrent) {
    var a = document.createElement("a");
    a.href = href;
    a.innerHTML = '<span class="ds-name"></span><span class="ds-num"></span>';
    a.querySelector(".ds-name").textContent = label;
    a.querySelector(".ds-num").textContent = short || label;
    if (isCurrent) {
      a.setAttribute("aria-current", "page");
    }
    return a;
  }

  function group(items) {
    var ul = document.createElement("ul");
    items.forEach(function (a) {
      var li = document.createElement("li");
      li.appendChild(a);
      ul.appendChild(li);
    });
    return ul;
  }

  var bar = document.createElement("nav");
  bar.className = "ds-bar";
  bar.setAttribute("aria-label", "Design preview switcher");

  var designLabel = document.createElement("span");
  designLabel.className = "ds-label";
  designLabel.textContent = "Design";
  bar.appendChild(designLabel);

  bar.appendChild(group(DESIGNS.map(function (d) {
    return link("../" + d.slug + "/" + file, d.name, d.num, d.slug === current.slug);
  })));

  var sep = document.createElement("span");
  sep.className = "ds-sep";
  sep.setAttribute("aria-hidden", "true");
  bar.appendChild(sep);

  var pageLabel = document.createElement("span");
  pageLabel.className = "ds-label";
  pageLabel.textContent = "Page";
  bar.appendChild(pageLabel);

  bar.appendChild(group(PAGES.map(function (p) {
    return link("./" + p.file, p.name, null, p.file === file);
  })));

  var hide = document.createElement("button");
  hide.type = "button";
  hide.innerHTML = "&times;";
  hide.setAttribute("aria-label", "Hide the design switcher");

  var show = document.createElement("button");
  show.type = "button";
  show.className = "ds-bar ds-show";
  show.textContent = "Designs";
  show.setAttribute("aria-label", "Show the design switcher");

  function store(value) {
    try { sessionStorage.setItem(HIDE_KEY, value); } catch (e) {}
  }
  function hidden() {
    try { return sessionStorage.getItem(HIDE_KEY) === "1"; } catch (e) { return false; }
  }

  hide.addEventListener("click", function () {
    bar.hidden = true;
    show.hidden = false;
    store("1");
    show.focus();
  });
  show.addEventListener("click", function () {
    show.hidden = true;
    bar.hidden = false;
    store("0");
    hide.focus();
  });

  bar.appendChild(hide);

  function mount() {
    document.body.appendChild(bar);
    document.body.appendChild(show);
    /* keep the page's own footer clear of the bar */
    document.body.style.paddingBottom = "5rem";
    if (hidden()) { bar.hidden = true; } else { show.hidden = true; }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
