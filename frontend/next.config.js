const { type } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "tong.visitkorea.or.kr",
      "cdn.visitkorea.or.kr",
      "k.kakaocdn.net",
    ],
  },
  pageExtensions: ["jsx", "js", "ts", "tsx", "json"],
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://localhost:8080/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
