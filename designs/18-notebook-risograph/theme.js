/* Theme toggle: light / dark / follow-system. Runs in <head> before paint. */
(function () {
  var root = document.documentElement;
  var KEY = "theme-preference";
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  if (stored === "light" || stored === "dark") root.setAttribute("data-theme", stored);

  function isDark() {
    var set = root.getAttribute("data-theme");
    if (set) return set === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function wire() {
    var buttons = document.querySelectorAll("[data-theme-toggle]");
    function sync() {
      var dark = isDark();
      buttons.forEach(function (btn) {
        btn.setAttribute("aria-pressed", String(dark));
        var label = btn.querySelector("[data-theme-label]");
        if (label) label.textContent = dark ? "Light" : "Dark";
      });
    }
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = isDark() ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem(KEY, next); } catch (e) {}
        sync();
      });
    });
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
      if (!root.getAttribute("data-theme")) sync();
    });
    sync();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wire);
  } else {
    wire();
  }
})();
