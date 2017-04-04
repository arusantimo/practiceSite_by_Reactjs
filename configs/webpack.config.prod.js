const _ = require('lodash');
const webpack = require('webpack');
const baseConfig = require('./webpack.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = _.assign({}, baseConfig,{
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  plugins: _.concat(baseConfig.plugins, [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
        unused: true,
      },
      output: {
        comments: false,
      },
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      }
    })
  ]),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            'es2015',
            'react',
            'stage-0'
            [
              "env",
                {
                  browsers: ['last 2 versions', '> 10%', 'ie 9'],
                  // tree shaking
                  "modules": false
                }
            ]
          ],
          plugins: [
            'transform-decorators-legacy',
            'transform-class-properties'
          ]
        }
      },
      {
        test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'url-loader',
        options: {
          name: 'assets/[hash].[ext]',
          limit: 10000,
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('css-loader'),
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('css-loader!postcss-loader!less-loader'),
      }
    ]
  }
});