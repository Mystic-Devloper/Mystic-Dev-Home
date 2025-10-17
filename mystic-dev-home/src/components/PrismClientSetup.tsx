"use client"

/**
 * @file src/components/PrismClientSetup.tsx
 * @description Sets up prism on client (important for SSG).
 *
 * @author TheDevMystic (Surya)
 */

import { useEffect } from "react";
import * as Prism from "prismjs";
import "@library/prismSetup";

/**
 * @function PrismClientSetup
 * @description Sets up PrismJS on client.
 *
 * @returns N/A or null.
 */
export default function PrismClientSetup(): void {
  useEffect(() => {
    registerPrismCopyButton();
    Prism.highlightAll(); // Call after mount.
  }, []);

  return null;
}
