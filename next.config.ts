import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  // output: 'export', // 👈 enables static export
  basePath: isProd ? '/escapeelite' : '',
  // assetPrefix: isProd ? '/escapeelite/' : '',
  images: {
    unoptimized: true,           // required for static export
  },
  publicRuntimeConfig: {
    basePath: isProd ? "/escapeelite" : "",
  },
};

export default nextConfig;
