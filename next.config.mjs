/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  images: {
    remotePatterns: [
      {
        hostname: "images.pexels.com",
      },
      {
        hostname: "firebasestorage.googleapis.com",
      },
      {
        hostname: "blissful-aryabhata-vfxiizwlv.storage.iran.liara.space",
      },
    ],
  },
};

export default nextConfig;
