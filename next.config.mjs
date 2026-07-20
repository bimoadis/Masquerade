/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/deep/:path*',
        destination: 'https://backend-cf.caesarzach.workers.dev/deep/:path*',
      },
      {
        source: '/api/trench/:path*',
        destination: 'https://backend-cf.caesarzach.workers.dev/trench/:path*',
      },
    ];
  },
};

export default nextConfig;
