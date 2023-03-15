/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["tong.visitkorea.or.kr", "cdn.visitkorea.or.kr"],
  },
  pageExtensions: ["jsx", "js", "ts", "tsx", "json"],
};

module.exports = nextConfig;
