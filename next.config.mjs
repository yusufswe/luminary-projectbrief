/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "pub-31332c411b0146678211381416191308.r2.dev", // url hostname of your images bucket
        pathname: "/**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
