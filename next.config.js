/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  ...nextConfig,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard", // Matched parameters can be used in the destination
        permanent: true,
      },
    ];
  },
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
  images: {
    domains: ["github.com", "kmzgkstraazrxkyxaejh.supabase.co"],
  },
};
