/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: process.env.NEXT_PUBLIC_API_URL
            ? `${process.env.NEXT_PUBLIC_API_URL}/:path*`
            : "http://placeholder.local/:path*",
        },
      ],
      fallback: [
        {
          source: "/:shortCode",
          destination: "/api/redirect/:shortCode",
        },
      ],
    };
  },
};

module.exports = nextConfig;
