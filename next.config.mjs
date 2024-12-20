import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

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
      {
        hostname: "trustseal.enamad.ir",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
