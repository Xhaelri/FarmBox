import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tvwxwxmwxbndmoicihnd.supabase.co",
        port: "",
      },
      {
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;