(function () {
  "use strict";

  // -----------------------------------------------------------------------
  // Dark Mode
  // -----------------------------------------------------------------------

  const STORAGE_KEY = "theme";
  const DARK_CLASS = "dark";
  const root = document.documentElement;

  /**
   * Return the user's preferred theme from localStorage,
   * falling back to the OS-level preference, then "light".
   */
  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") {
      return stored;
    }
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }

  /** Apply theme class and update toggle button label. */
  function applyTheme(theme) {
    if (theme === "dark") {
      root.classList.add(DARK_CLASS);
    } else {
      root.classList.remove(DARK_CLASS);
    }
    updateToggleIcon(theme);
  }

  /** Swap the toggle button text between sun and moon. */
  function updateToggleIcon(theme) {
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    // Sun when in dark mode (click to go light),
    // Moon when in light mode (click to go dark).
    btn.textContent = theme === "dark" ? "\u2600" : "\u263D";
    btn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  /** Toggle between dark and light, persist choice. */
  function toggleTheme() {
    var current = root.classList.contains(DARK_CLASS) ? "dark" : "light";
    var next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  // Apply saved/system theme immediately to avoid flash.
  applyTheme(getPreferredTheme());

  // -----------------------------------------------------------------------
  // DOM-ready initialisation
  // -----------------------------------------------------------------------

  document.addEventListener("DOMContentLoaded", function () {
    // Re-apply icon now that DOM is ready (button exists).
    var theme = root.classList.contains(DARK_CLASS) ? "dark" : "light";
    updateToggleIcon(theme);

    // Theme toggle click handler.
    var toggleBtn = document.querySelector(".theme-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", toggleTheme);
    }

    // -----------------------------------------------------------------
    // Smooth scroll for same-page anchor links
    // -----------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id = this.getAttribute("href");
        if (!id || id === "#") return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        // Update URL hash without jumping.
        if (history.pushState) {
          history.pushState(null, null, id);
        }
      });
    });
  });
})();
