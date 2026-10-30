/** @type {import('next').NextConfig} */
const isExport = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  reactStrictMode: true,
  ...(isExport ? {
    output: 'export',
    basePath: '/the-ashh-store',
    trailingSlash: true,
    images: { unoptimized: true }
  } : {}),
  images: {
    unoptimized: isExport,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'prod-img.thesouledstore.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.myntassets.com',
      }
    ],
  },
};

export default nextConfig;
