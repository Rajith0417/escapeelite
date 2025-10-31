import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  // output: 'export', // enables static export if needed
  basePath: "", // never use '/' 
  images: {
    unoptimized: true, // required for static export
  },
  publicRuntimeConfig: {
    basePath: isProd ? "/escapeelite" : "",
  },
};

export default nextConfig;

