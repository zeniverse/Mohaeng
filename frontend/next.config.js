const { type } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "tong.visitkorea.or.kr",
      "cdn.visitkorea.or.kr",
      "k.kakaocdn.net",
      "lh3.google.com",
      "drive.google.com",
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
      {
        source: "/api/course/placeSearch",
        destination: "https://localhost:8080/api/course/placeSearch",
      },
    ];
  },
};

module.exports = nextConfig;
