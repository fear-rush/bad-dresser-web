import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 300,
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 750, 1080, 1200, 1440, 1920],
    qualities: [75, 78, 80, 82, 85],
  },
  async headers() {
    return [
      {
        source: "/landing-page/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
