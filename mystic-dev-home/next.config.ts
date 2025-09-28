import type { NextConfig } from "next";

/* To determine whether it is dev build or production */
const isProd = process.env.NODE_ENV === "production";

/* Repo name */
const repoName = "/Mystic-Dev-Home";

const nextConfig: NextConfig = {
  /* As our project is static, use output: export */
  output: "export",

  /* Again, as static website, we can't rely on Next.js Image Optimization as it requires server. */
  images: {
    unoptimized: true,
  },

  /* Base repo path */
  basePath: isProd ? repoName : "",

  /* Assets prefix */
  assetPrefix: isProd ? `${repoName}/` : "",

  /* We'll use react strict mode for safety */
  reactStrictMode: true,
};

export default nextConfig;
