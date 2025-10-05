/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 's01.flagcounter.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api',
        destination: '/api/index',
      },
    ];
  },
};

export default nextConfig;
