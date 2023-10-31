/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["thenewdawn.b-cdn.net", "thenewdawn.sirv.com"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "thenewdawn.b-cdn.net",
    //     port: "",
    //     pathname: "**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "thenewdawn.sirv.com",
    //     port: "",
    //     pathname: "**",
    //   },
    // ],
  },
};

module.exports = nextConfig;
