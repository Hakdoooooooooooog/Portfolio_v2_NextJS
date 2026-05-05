import type { NextConfig } from "next";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: ONE_YEAR_SECONDS,
  },
};

export default nextConfig;
