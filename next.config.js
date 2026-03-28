/** @type {import('next').NextConfig} */
const path = require('path');

const turbopackConfig = {
  rules: {
    '*.svg': {
      loaders: ['@svgr/webpack'],
      as: '*.js',
    },
  },
};

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@public': path.resolve(__dirname, 'public'),
    };

    config.externals = [...(config.externals || []), { canvas: 'canvas' }];

    return config;
  },
  turbopack: turbopackConfig,

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

module.exports = nextConfig;
