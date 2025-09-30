/***
 * Mystic Dev Website (https://thedevmystic.github.io 
 *                     && https://mystic-dev.eu.org)
 *
 * @file theme.ts
 * 
 * This file implements theming and theme toggling.
 ***/

/**
 * Type aliases.
 */
export type Theme = "light" | "dark";

/**
 * This function gets user's preferred theme.
 *
 * @returns Preferred theme.
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
 * This function applies theme to the site.
 * 
 * @param {Theme} theme - Theme to be applied.
 *
 * @returns N/A (void).
 */
export function applyTheme(theme: Theme): void {
  const root: HTMLHtmlElement = document.documentElement;
  
  // Add dark class
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  // Save theme to local storage
  localStorage.setItem("theme", theme);
}
