import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // 👈 enables static export
  basePath: '/escapeelite',
  assetPrefix: '/escapeelite/',
};

export default nextConfig;
