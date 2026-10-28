// Gremlin Frame: reading progress, the contents pane, and the frame's keys.
//   /    open search (the dg-search plugin's toggleSearch)
//   t    show or hide the contents pane
//   esc  close the contents pane when it covers the text
//
// Breakpoints live only in the stylesheet. This script reads the result:
// the pane is sticky beside the text on wide screens and fixed over it
// otherwise, and the progress bar's cell count is the --gc-cells property.
//
// The pane also follows the reader: when the template's sidebar script marks
// a new current section (.toc-active), the pane scrolls itself to keep that
// entry in view. It scrolls the pane only; scrollIntoView would move the page
// as well and fight the reader's own scrolling.
(function () {
  const root = document.documentElement;
  const STORE = "gc-contents";

  const pane = () => document.querySelector("body > aside");
  const hasPane = () => Boolean(document.querySelector("body > aside :is(.toc, .backlinks, .gc-book)"));
  const isWide = () => {
    const aside = pane();
    return Boolean(aside) && getComputedStyle(aside).position === "sticky";
  };

  function remembered() {
    try {
      return localStorage.getItem(STORE);
    } catch (e) {
      return null;
    }
  }

  function remember(value) {
    try {
      localStorage.setItem(STORE, value);
    } catch (e) {
      // Storage can be unavailable (private windows, blocked site data).
    }
  }

  // On wide screens the pane shows unless the reader closed it; elsewhere it
  // covers the text, so it starts closed.
  function isOpen() {
    return isWide()
      ? !root.classList.contains("gc-contents-closed")
      : root.classList.contains("gc-contents-open");
  }

  function setOpen(open) {
    const wide = isWide();
    root.classList.toggle("gc-contents-closed", wide && !open);
    root.classList.toggle("gc-contents-open", !wide && open);
    document.querySelectorAll('[data-gc-action="contents"]').forEach((button) => {
      button.setAttribute("aria-expanded", String(open));
    });
    if (open) followContents();
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Keep the current entry at least two lines inside the pane's edges; when
  // it leaves that band, bring it to the middle. A hidden entry (the note's
  // own title, at the top of the note) returns the pane to its top.
  function followContents() {
    const panel = document.getElementById("page-panel");
    const active = panel && panel.querySelector(".toc-container a.toc-active");
    if (!active || panel.scrollHeight <= panel.clientHeight) return;
    const behavior = reducedMotion.matches ? "auto" : "smooth";
    if (!active.getClientRects().length) {
      panel.scrollTo({ top: 0, behavior });
      return;
    }
    const view = panel.getBoundingClientRect();
    const entry = active.getBoundingClientRect();
    const band = 2 * parseFloat(getComputedStyle(active).lineHeight);
    if (entry.top >= view.top + band && entry.bottom <= view.bottom - band) return;
    const top = panel.scrollTop + (entry.top - view.top) - (panel.clientHeight - entry.height) / 2;
    panel.scrollTo({ top, behavior });
  }

  const contents = document.querySelector(".toc-container");
  if (contents) {
    new MutationObserver(followContents).observe(contents, {
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  function toggleContents() {
    if (!hasPane()) return;
    const open = !isOpen();
    setOpen(open);
    if (isWide()) remember(open ? "open" : "closed");
  }

  function openSearch() {
    if (typeof window.toggleSearch !== "function") return;
    const search = document.getElementById("globalsearch");
    if (!search || !search.classList.contains("active")) window.toggleSearch();
  }

  function progress() {
    const max = root.scrollHeight - window.innerHeight;
    const share = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 1;
    document.querySelectorAll("[data-gc-progress]").forEach((bar) => {
      const cells = parseInt(getComputedStyle(bar).getPropertyValue("--gc-cells"), 10) || 12;
      const filled = Math.round(share * cells);
      bar.querySelector(".gc-fill").textContent = "█".repeat(filled);
      bar.querySelector(".gc-rest").textContent = "░".repeat(cells - filled);
      bar.querySelector(".gc-pct").textContent = Math.round(share * 100) + "%";
    });
  }

  function typing(target) {
    return Boolean(target.closest && target.closest("input, textarea, select, [contenteditable]"));
  }

  document.addEventListener("keydown", (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
    if (typing(event.target)) return;
    if (event.key === "/") {
      event.preventDefault();
      openSearch();
    } else if (event.key === "t" && hasPane()) {
      event.preventDefault();
      toggleContents();
    } else if (event.key === "Escape" && !isWide() && isOpen()) {
      setOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    const action = event.target.closest && event.target.closest("[data-gc-action]");
    if (action) {
      if (action.dataset.gcAction === "search") openSearch();
      if (action.dataset.gcAction === "contents") toggleContents();
      return;
    }
    // Following a contents link while the pane covers the text should show the text.
    if (!isWide() && isOpen() && event.target.closest("body > aside a[href]")) setOpen(false);
  });

  // Crossing the wide breakpoint: the pane's mode changes, so reapply the
  // reader's choice for that mode.
  let wasWide = isWide();
  window.addEventListener(
    "resize",
    () => {
      const wide = isWide();
      if (wide !== wasWide) {
        wasWide = wide;
        root.classList.remove("gc-contents-open");
        root.classList.toggle("gc-contents-closed", wide && remembered() === "closed");
        setOpen(isOpen());
      }
      progress();
    },
    { passive: true }
  );
  window.addEventListener("scroll", progress, { passive: true });

  if (isWide() && remembered() === "closed") root.classList.add("gc-contents-closed");
  setOpen(isOpen());
  progress();
})();
