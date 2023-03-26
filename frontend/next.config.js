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
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "http://219.255.1.253:8080/:path*",
  //     },
  //   ];
  // },
};
module.exports = nextConfig;
