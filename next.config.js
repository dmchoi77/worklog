const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  experimental: {
    instrumentationHook: true,
  },
  compiler: {
    removeConsole: isProd ? true : false,
  },
};

module.exports = nextConfig;
