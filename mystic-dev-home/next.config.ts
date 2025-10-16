// next.config.ts
import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

// To determine whether it is dev build or production
const isProd = process.env.NODE_ENV === "production";

// Repo name
const repoName = "/Mystic-Dev-Home";

// Serwist configurations
const withSerwist = withSerwistInit({
  // Service worker source
  swSrc: "app/sw.ts",
  // Service worker destination
  swDest: "public/sw.js",
  // Disable for developement & enable for production
  disable: isProd,
  // Register worker automatically
  register: true,
  // Scope of worker
  scope: isProd ? repoName : "",
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
      url: "/offline/offline-image.png",
      revision: OFFLINE_REVISION,
    },
  ],

  // Exclude files
  exclude: [
    ({ asset }) => asset.name.startsWith('server/'),
    /\.map$/, // Exclude source maps
  ],

  // Public Directory
  publicDir: "public",
  // Destination Directory
  destDir: ".next",
  // Always minify
  minify: true,
  // Explictly set worker url
  swUrl: "public/sw.ts",
});


const nextConfig: NextConfig = {
  // As our project is static, use output: export
  output: "export",

  // Again, as static website, we can't rely on Next.js Image Optimization as it requires server.
  images: {
    unoptimized: true,
  },

  // Base repo path
  basePath: isProd ? repoName : "",

  // Assets prefix
  assetPrefix: isProd ? `${repoName}/` : "",

  // We'll use react strict mode for safety
  reactStrictMode: true,
};

export default withSerwist(nextConfig);
