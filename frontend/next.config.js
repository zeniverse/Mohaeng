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
        source: "/login/:path*",
        destination: "http://localhost:8080/login/:path*",
      },
      {
        source: "/loginInfo/:path*",
        destination: "http://localhost:8080/loginInfo/:path*",
      },
      {
        source: "/oauth/token/:path*",
        destination: "http://localhost:8080/oauth/token/:path*",
      },
      {
        source: "/api/course/:id",
        destination: "http://localhost:8080/api/course/:id",
      },
      {
        source: "/api/myPage/course/bookMark",
        destination: "http://localhost:8080/api/myPage/course/bookMark",
      },
      {
        source: "/api/myPage/place/bookMark/:path*",
        destination: "http://localhost:8080/api/myPage/place/bookMark/:path*",
      },
      {
        source: "/api/myPage/course",
        destination: "http://localhost:8080/api/myPage/course",
      },
      {
        source: "/api/myPage/course/:path*",
        destination: "http://localhost:8080/api/myPage/course:path*",
      },
      {
        source: "/places/:path*",
        destination: "http://localhost:8080/places/:path*",
      },

      {
        source: "/overview/:path*",
        destination: "http://localhost:8080/overview/:path*",
      },
      {
        source: "/overview/:id",
        destination: "http://localhost:8080/overview/:id",
      },
    ];
  },
};

module.exports = nextConfig;
