/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  ...nextConfig,
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
  images: {
    domains: ["github.com", "kmzgkstraazrxkyxaejh.supabase.co"],
  },
};
