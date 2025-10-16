/**
 * @file src/app/sw.ts
 * @description Service worker for website.
 *
 * @author TheDevMystic (Surya)
 */

import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

// Prechache Manifest
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

// Service worker
declare const self: ServiceWorkerGlobalScope;
