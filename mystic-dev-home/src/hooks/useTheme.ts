/***
 * Mystic Dev Website (https://thedevmystic.github.io
 *                     && https://mystic-dev.eu.org)
 *
 * @file useTheme.ts
 *
 * React hook for theming and theme toggling.
 ***/

import { useEffect, useState, useCallback } from "react";
import { getPreferredTheme, applyTheme, Theme } from "@library/theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme());

  // Apply theme whenever it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme };
}
