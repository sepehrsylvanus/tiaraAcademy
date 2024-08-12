import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "images.pexels.com",
      },
      {
        hostname: "firebasestorage.googleapis.com",
      },
      {
        hostname: "infallible-zhukovsky-7f1f128am.storage.iran.liara.space",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
