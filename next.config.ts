import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 85 is the project default (see components/ui/Img); 75 stays allowed so pages
    // loaded with an older bundle, or any image that keeps the framework default, never break.
    qualities: [75, 85],
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
