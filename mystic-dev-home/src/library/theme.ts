/**
 * @file src/library/theme.ts
 * @description Theme helper function for useTheme react hook.
 *
 * @author TheDevMystic (Surya)
 */

/**
 * @type Theme
 * @description Type aliases.
 */
export type Theme = "light" | "dark";

/**
 * @function getPreferredTheme
 * @description Retrives user's preferred theme.
 * Uses local storage for old visitor and,
 * Uses media query for new visitor.
 *
 * @returns {Theme} - Preferred theme.
 */
export function getPreferredTheme(): Theme {
  // If window is undefined, return light theme.
  if (typeof window === undefined) return "light";

  // Get theme from local storage
  const saved: Theme = localStorage.getItem("theme") as Theme | null;
  
  // If theme was cached (revisit)
  if (saved) return saved;

  // Else if new user (first visit)
  const prefersDark: boolean = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

/**
 * @function applyTheme
 * @description Applies theme to the site.
 * 
 * @param {Theme} theme - Theme to be applied.
 *
 * @returns N/A (void).
 */
export function applyTheme(theme: Theme): void {
  const root: HTMLHtmlElement = document.documentElement;
  const isDarkApplied: boolean = root.classList.contains("dark");
  
  // If desired theme is dark and dark theme is applied, do nothing and return
  if (theme === "dark" && isDarkApplied) {
    localStorage.setItem("theme", theme);
    return;
  }
  
  // If desired theme is light and dark theme is not applied, do nothing and return
  if (theme === "light" && !isDarkApplied) {
    localStorage.setItem("theme", theme);
    return;
  }

  // If we reach here, theme needs to be changed
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  // Save theme to local storage
  localStorage.setItem("theme", theme);
}
