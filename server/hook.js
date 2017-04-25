const assetHook = require('asset-require-hook');
const cssHook = require('css-modules-require-hook');
const sassParser = require('postcss-scss').parse;

assetHook({
  extensions: ['ico', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'ttf', 'eot', 'woff', 'woff2'],
  name: 'assets/[hash].[ext]',
  limit: 10000
});

cssHook({
  extensions: '.scss',
  processorOpts: {
    parser: sassParser
  }
});
