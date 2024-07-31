const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: isProd ? true : false,
  },
};

module.exports = nextConfig;
