/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "developers.kakao.com",
        port: "",
        pathname: "/static/images/pc/news/**",
      },
    ],
  },
};

module.exports = nextConfig;
