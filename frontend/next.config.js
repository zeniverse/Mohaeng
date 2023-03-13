/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["tong.visitkorea.or.kr"],
  },
  pageExtensions: ["jsx", "js", "ts", "tsx", "json"],
  compiler: {
    styledComponents: true,
  },
};
module.exports = nextConfig;
