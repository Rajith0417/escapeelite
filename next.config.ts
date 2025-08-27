import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // 👈 enables static export
  basePath: '/escapeelite',
  assetPrefix: '/escapeelite/',
  images: {
    unoptimized: true,           // required for static export
  },
};

export default nextConfig;
