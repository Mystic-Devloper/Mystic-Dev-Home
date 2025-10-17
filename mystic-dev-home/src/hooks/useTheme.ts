/**
 * @file src/hooks/useTheme.ts
 * @description React hook for theming and theme toggling.
 *
 * @author TheDevMystic
 */

import { useEffect, useState, useCallback } from "react";
import type { Theme } from "@library/theme";
import { getPreferredTheme, applyTheme } from "@library/theme";

/**
 * @function useTheme
 * @description React hook to handle theme and theme toggling.
 *
 * @returns Current theme and theme toggler function.
 */
export default function useTheme() {
  // Set theme
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme());

  // Apply theme whenever it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);
  
  // Theme toggling
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme };
}
