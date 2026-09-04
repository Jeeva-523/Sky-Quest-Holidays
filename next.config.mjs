/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/skyadmin',
        destination: '/skyAdmin',
      },
      {
        source: '/admin/login',
        destination: '/skyAdmin',
      },
    ];
  },
};

export default nextConfig;
