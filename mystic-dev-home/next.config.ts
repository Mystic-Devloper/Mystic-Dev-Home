/**
 * @file /next.config.ts
 * @description Next.js Configuration file.
 *
 * @author TheDevMystic (Surya)
 */

import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

// To determine whether it is dev build or production
const isProd = process.env.NODE_ENV === "production";

// Offline Revision
const OFFLINE_REVISION = "1.0.0";

// Serwist configurations
const withSerwist = withSerwistInit({
  // Service worker source
  swSrc: "app/sw.ts",
  // Service worker destination
  swDest: "/sw.js",
  // Disable for developement & enable for production
  disable: !isProd,
  // Register worker manually
  register: false,
  // Cache on Navigation
  cacheOnNavigation: true,
  // Reload when network comes back
  reloadOnOnline: true,

  // Additional Precache pages
  additionalPrecacheEntries: [
    {
      url: "/~offline",
      revision: OFFLINE_REVISION,
    },
    {
      url: "/~offline/offline-placeholder-image.png",
      revision: OFFLINE_REVISION,
    },
    {
      url: "/~offline/offline-placeholder-video.mp4",
      revision: OFFLINE_REVISION,
    },
  ],

  // Exclude files
  exclude: [
    ({ asset }) => asset.name.startsWith('server/'),
    /\.map$/, // Exclude source maps
  ],

  // Always minify
  minify: true,
});


const nextConfig: NextConfig = {
  // As our project is static, use output: export
  output: "export",

  // Again, as static website, we can't rely on Next.js Image Optimization as it requires server.
  images: {
    unoptimized: true,
  },

  // Base repo path
  basePath: "",

  // Assets prefix
  assetPrefix: "",

  // We'll use react strict mode for safety
  reactStrictMode: true,
};

export default withSerwist(nextConfig);
