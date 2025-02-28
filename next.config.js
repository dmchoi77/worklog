import withPWA from 'next-pwa';

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

const pwaConfig = withPWA({
  dest: 'public',
  runtimeCaching: [],
});

module.exports = pwaConfig(nextConfig);
