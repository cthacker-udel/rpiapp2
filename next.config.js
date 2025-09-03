const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: { optimizePackageImports: ["@material-tailwind/react"] },
    images: { remotePatterns: [] },
    logging: { fetches: { fullUrl: true } },
};

module.exports = withBundleAnalyzer(nextConfig);
