import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // A single, higher quality for every optimized image: renders and aerial photos lose detail at 75.
    qualities: [85],
    // Thumbnails of the company's official YouTube videos.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
