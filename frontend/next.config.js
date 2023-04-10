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
      {
        source: "/places/:path",
        destination: "http://localhost:8080/places/:path",
      },
      {
        source: "/api/myPage/course/:path",
        destination: "http://localhost:8080/api/myPage/course/:path",
      },
      {
        source: "/api/myPage/place/bookMark/:path",
        destination: "http://localhost:8080/api/myPage/place/bookMark/:path",
      },
      {
        source: "/api/myPage/place/bookMark",
        destination: "http://localhost:8080/api/myPage/place/bookMark",
      },
      {
        source: "/api/place/overview/:id",
        destination: "http://localhost:8080/api/place/overview/:id",
      },
      {
        source: "/place/overview/:id",
        destination: "http://localhost:8080/place/overview/:id",
      },
      {
        source: "/api/place/overview/:path",
        destination: "http://localhost:8080/api/place/overview/:path",
      },
      {
        source: "/api/review/:path",
        destination: "http://localhost:8080/api/review/:path",
      },
      {
        source: "/api/review/detail/:path",
        destination: "http://localhost:8080/api/review/datail/:path",
      },
    ];
  },
};

module.exports = nextConfig;
