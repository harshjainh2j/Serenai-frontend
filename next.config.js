/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/chat/:path*",
        destination: "http://localhost:3001/chat/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
