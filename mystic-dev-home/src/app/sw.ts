/**
 * @file src/app/sw.ts
 * @description Service worker for website.
 *
 * @author TheDevMystic (Surya)
 */

import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist, StaleWhileRevalidate, FallbackResponsePlugin, ExpirationPlugin } from "serwist";

// Prechache Manifest
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

// Service worker
declare const self: ServiceWorkerGlobalScope;

/**
 * @description Image Cache strategy.
 */
const imageCache = {
  matcher: ({ request }: { request: Request }) => request.destination === "image",
  handler: new StaleWhileRevalidate({
    cacheName: "static-image-assets",
    plugins: [
      // Fallback
      new FallbackResponsePlugin({
        fallback: "/~offline/offline-placeholder-image.png",
      }),
      // Expiration
      new ExpirationPlugin({
        maxEntries: 50, // Limit to 50 images in this cache
        // Set the expiration time to 30 days (in seconds)
        maxAgeSeconds: 30 * 24 * 60 * 60, // 2,592,000 seconds
      }),
    ],
  }),
};


/**
 * @description Video Cache strategy.
 */
const videoCache = {
  matcher: ({ request }: { request: Request }) => request.destination === "video",
  handler: new StaleWhileRevalidate({
    cacheName: "static-video-assets",
    plugins: [
      // Fallback
      new FallbackResponsePlugin({
        fallback: "/~offline/offline-placeholder-video.mp4",
      }),
      // Expiration
      new ExpirationPlugin({
        maxEntries: 10, // Limit to 10 images in this cache
        // Set the expiration time to 30 days (in seconds)
        maxAgeSeconds: 30 * 24 * 60 * 60, // 2,592,000 seconds
      }),
    ],
  }),
};

const serwist = new Serwist({
  // Precache Manifest
  precacheEntries: self.__SW_MANIFEST,
  
  // Runtime Caching to default strategy
  runtimeCaching: [
    imageCache,
    videoCache,
    ...defaultCache,
  ],

  // Service worker lifecycle
  skipWaiting: true,
  clientsClaim: true,

  // Fallbacks
  fallbacks: {
    entries: [
      {
        url: "/~offline",
	matcher({ request }) {
          return request.destination === "document";
	},
      },
    ],
  },
});

/**
 * @description Install service worker.
 */
serwist.addEventListener("install", () => {
  // Logic to force pre-caching the offline page when the SW installs
  const urlsToPrecache = ["/~offline"] as const;

  const requestPromises = Promise.all(
    urlsToPrecache.map((entry) => {
      return serwist.handleRequest({
        request: new Request(entry),
        event: new InstallEvent("install"), // Fake event for installation
      });
    }),
  );
  (self as unknown as InstallEvent).waitUntil(requestPromises);
});

serwist.addEventListeners();
