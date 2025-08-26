import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Ensures static export
  basePath: process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}` : "",
  images: {
    unoptimized: true, // Since GitHub Pages doesn’t support Next image optimization
  },
};

export default nextConfig;
