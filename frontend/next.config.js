const path = require('path')
const withSourceMaps = require('@zeit/next-source-maps')()
const withPlugins = require('next-compose-plugins')
const withImages = require('next-optimized-images')

module.exports = withPlugins(
  [
    withSourceMaps,
    [
      withImages,
      {
        optimizeImages: false,
        handleImages: ['jpeg', 'png', 'webp', 'gif'],
      },
    ],
  ],
  {
    env: {
      CI_COMMIT_SHA: process.env.CI_COMMIT_SHA,
      CI_COMMIT_TAG: process.env.CI_COMMIT_TAG,
    },
    publicRuntimeConfig: {
      BACKEND_URI: process.env.BACKEND_URI,
    },
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              titleProp: true,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
            },
          },
        ],
        include: path.resolve(__dirname, 'svg'),
      })

      return config
    },
  }
)
