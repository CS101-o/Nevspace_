/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },

   // Add this to ensure proper page refreshes
  typescript: {
    ignoreBuildErrors: true, // Only if you're having TS issues in production
  },

  trailingSlash: true, // Add this for static exports
  basePath: '', // Add this if you're not deploying to root
  
  

};

module.exports = nextConfig;