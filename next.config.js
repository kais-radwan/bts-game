/** @type {import('next').NextConfig} */
const nextConfig = {
  // apply to accept images from any source
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
