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
        source: "/:path*",
        destination: "http://localhost:8080/:path*",
      },

      // 코스 상세를 보려면 위 코드는 주석 처리하고 아래 코드는 주석을 풀어주세요.

      {
        source: "/login/:path*",
        destination: "http://localhost:8080/login/:path*",
      },
      {
        source: "/loginInfo/:path*",
        destination: "http://localhost:8080/loginInfo/:path*",
      },
      {
        source: "/loginInfo",
        destination: "http://localhost:8080/loginInfo",
      },
      {
        source: "/oauth/token/:path*",
        destination: "http://localhost:8080/oauth/token/:path*",
      },
      {
        source: "/api/course/:id",
        destination: "http://localhost:8080/api/course/:id",
      },
    ];
  },
};

module.exports = nextConfig;
