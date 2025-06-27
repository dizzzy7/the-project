import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /.svg$/,
      use: ['@svgr/webpack'],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@public': require('path').resolve(__dirname, 'public'),
    };

    config.externals = [...config.externals, { canvas: 'canvas' }];

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  transpilePackages: ['three'],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
