import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/app', // if you're serving from /app subdirectory
  output: 'standalone', // for better compatibility with standard hosting
  // other config options as needed
};

export default nextConfig;
