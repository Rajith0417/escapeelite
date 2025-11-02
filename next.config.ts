import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // enables static export if needed
  basePath: "", // never use '/' 
  images: {
    unoptimized: true, // required for static export
  },
};

export default nextConfig;

