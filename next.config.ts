import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
    eslint: {
        ignoreDuringBuilds: true
    },
    output: "standalone",
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true // TODO: Need to fix the build issue. Run build by removing this line to see actual error to fix.
    },
};

export default nextConfig;
