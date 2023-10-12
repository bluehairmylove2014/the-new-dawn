/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["thenewdawn.b-cdn.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thenewdawn.b-cdn.net",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "rialloer.sirv.com",
        port: "",
        pathname: "/the_new_dawn/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
