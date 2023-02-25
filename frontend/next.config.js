/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["jsx", "js", "ts", "tsx", "json"],
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
