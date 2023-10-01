/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rialloer.sirv.com",
        port: "",
        pathname: "/the_new_dawn/**",
      },
    ],
  },
};

module.exports = nextConfig;
