import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a stray lockfile in the home
  // directory otherwise makes Next infer the wrong root).
  turbopack: {
    root: __dirname,
  },
  // three.js ships untranspiled ESM/add-ons in places; this is the
  // documented fix for react-three-fiber under Next.js 13.1+.
  transpilePackages: ["three"],
};

export default nextConfig;
