/**
 * @file src/app/manifest.ts
 * @description PWA Manifest for website.
 *
 * @author TheDevMystic (Surya)
 */

import { MetadataRoute } from "next";

/**
 * @function manifest
 * @description Site PWA Manifest file.
 */
export default function manifest(): MetadatRoute.Manifest {
  return {
    name: "Mystic Dev — Bridging the gap between Math, Code, and Logic!",
    short_name: "Mystic Dev",
    description: "Explore the beautiful, interconnected world of Mathematics, precise Coding, and philosophical Logic. A personal journey to bridge the gap between these disciplines.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9fbf9",
    screen_orientation: "natural",
    theme_color: "#2c6975",
    icons: [
      // Preferred icons - SVG
      {
        src: "/favicons/favicon.svg",
	sizes: "any",
	type: "image/svg+xml",
	purpose: "any maskable"
      },
      // Icons from smallest 16x16 to largest 512x512
      // 16x16
      {
        src: "/favicons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
        purpose: "any"
      },
      // 32x32
      {
        src: "/favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        purpose: "any"
      },
      // 48x48
      {
        src: "/favicons/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
        purpose: "any"
      },
      // 64x64
      {
        src: "/favicons/favicon-64x64.png",
        sizes: "64x64",
        type: "image/png",
        purpose: "any"
      },
      // 128x128
      {
        src: "/favicons/favicon-128x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "any"
      },
      // 144x144
      {
        src: "/favicons/favicon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any"
      },
      // 180x180 (Non Apple)
      {
        src: "/favicons/favicon-180x180.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any"
      },
      // 180x180 (Apple) Maskable for apple
      {
        src: "/favicons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any maskable"
      },
      // 192x192
      {
        src: "/favicons/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      // 256x256
      {
        src: "/favicons/favicon-256x256.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any"
      },
      // 324x324
      {
        src: "/favicons/favicon-324x324.png",
        sizes: "324x324",
        type: "image/png",
        purpose: "any"
      },
      // 512x512
      {
        src: "/favicons/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      },
      // 1024x1024
      {
        src: "/favicons/favicon-1024x1024.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any maskable"
      }
    ],
    screenshots: [
      {
        src: "/screenshots/screenshot-desktop.png",
        sizes: "1280x800",
        type: "image/png",
        platform: "wide", 
        label: "Home Page Desktop View",
      },
      {
        src: "/screenshots/screenshot-mobile.png",
        sizes: "750x1334",
        type: "image/png",
        platform: "narrow", 
        label: "Home Page Mobile View",
      },
    ],
  };
}
