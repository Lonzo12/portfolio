// Light / dark theme toggle. The initial theme is set by a tiny inline script in <head>
// (saved choice first, then the visitor's system setting), so the page never flashes.
(function () {
  var KEY = "theme";
  var root = document.documentElement;
  var btn = document.querySelector("[data-theme-toggle]");

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function current() {
    return root.getAttribute("data-bs-theme") === "dark" ? "dark" : "light";
  }
  function sync() {
    if (!btn) return;
    var dark = current() === "dark";
    btn.setAttribute("aria-pressed", String(dark));
    var label = dark ? "Switch to light theme" : "Switch to dark theme";
    btn.setAttribute("aria-label", label);
    btn.setAttribute("title", label);
  }
  function set(theme) {
    root.setAttribute("data-bs-theme", theme);
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    sync();
  }

  if (btn) {
    btn.addEventListener("click", function () {
      set(current() === "dark" ? "light" : "dark");
    });
  }

  // Follow the system setting until the visitor chooses a theme themselves.
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function (e) {
      if (!saved()) {
        root.setAttribute("data-bs-theme", e.matches ? "dark" : "light");
        sync();
      }
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  sync();
})();
