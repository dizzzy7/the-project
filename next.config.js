/** @type {import('next').NextConfig} */
const path = require('path');

// Detect when Next is started with the --webpack flag so webpack-only customizations
// are only applied when running Webpack. Turbopack will use the `turbopack` option.
const usingWebpack = process.argv.includes('--webpack');

const turbopackConfig = {
  // Use Turbopack's loader support to apply SVGR for SVG -> React component imports
  rules: {
    '*.svg': ['@svgr/webpack'],
  },
  // Map path aliases for Turbopack (matches webpack.resolve.alias)
  resolveAlias: {
    '@public': path.resolve(__dirname, 'public'),
  },
};

const nextConfig = {
  // When using Webpack, keep the existing webpack customization. When running with
  // Turbopack, provide the equivalent config under `turbopack` instead.
  ...(usingWebpack
    ? {
        webpack: (config) => {
          config.module.rules.push({
            test: /.svg$/,
            use: ['@svgr/webpack'],
          });

          config.resolve.alias = {
            ...config.resolve.alias,
            '@public': path.resolve(__dirname, 'public'),
          };

          config.externals = [
            ...(config.externals || []),
            { canvas: 'canvas' },
          ];

          return config;
        },
      }
    : { turbopack: turbopackConfig }),

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
