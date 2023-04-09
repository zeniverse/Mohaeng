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
      {
        source: "/api/course/placeSearch",
        destination: "https://localhost:8080/api/course/placeSearch",
      },
      {
        source: "/api/course",
        destination: "https://localhost:8080/api/course",
      },
      {
        source: "/api/course/:id",
        destination: "https://localhost:8080/api/course/:id",
      },
      {
        source: "/api/place/:slug*",
        destination: "http://localhost:3000/api/place/:slug*",
      },
      {
        source: "/place/overview/:id",
        destination: "https://localhost:8080/place/overview/:id",
      },
      {
        source: "/places/:slug*",
        destination: "http://localhost:8080/places?areaCode=:slug*",
      },
      {
        source: "/oauth/token",
        destination: "https://localhost:8080/oauth/token",
      },
      {
        source: "/loginInfo",
        destination: "https://localhost:8080/loginInfo",
      },
    ];
  },
};

module.exports = nextConfig;
