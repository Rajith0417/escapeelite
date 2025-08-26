import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // 👈 enables static export
  basePath: '/my-next-app',
  assetPrefix: '/my-next-app/',
};

export default nextConfig;
