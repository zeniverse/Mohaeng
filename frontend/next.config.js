const { type } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  fallback: true,
  images: {
    domains: [
      "tong.visitkorea.or.kr",
      "cdn.visitkorea.or.kr",
      "k.kakaocdn.net",
      "lh3.google.com",
      "drive.google.com",
      "mohaeng.s3.ap-northeast-2.amazonaws.com",
    ],
  },
  pageExtensions: ["jsx", "js", "ts", "tsx", "json"],
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/login/:path",
        destination: "http://localhost:8080/login/:path",
      },
      {
        source: "/loginInfo/:path",
        destination: "http://localhost:8080/loginInfo/:path",
      },
      {
        source: "/oauth/token/:path",
        destination: "http://localhost:8080/oauth/token/:path",
      },
    ];
  },
};

module.exports = nextConfig;
