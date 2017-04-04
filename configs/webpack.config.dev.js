const _ = require('lodash');
const webpack = require("webpack");
const path = require('path');
const baseConfig = require('./webpack.config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
require('dotenv').config();
process.noDeprecation = true;

module.exports = _.assign({}, baseConfig, {
  devtool: '#source-map',
  entry: _.concat([
    `react-hot-loader/patch`, // activate HMR for React
    `webpack-dev-server/client?http://0.0.0.0:${process.env.DEV_PORT}`, // WebpackDevServer host and port
    `webpack/hot/only-dev-server`, // "only" prevents reload on syntax errors
  ], baseConfig.entry),
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  devServer: {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    historyApiFallback: true,
    contentBase: './public',
    proxy: {
      "**": `http://127.0.0.1:${process.env.PORT}`
    }
  },
  plugins: _.concat(baseConfig.plugins, [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]),
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0'],
          plugins: [
            'react-hot-loader/babel',
            'transform-decorators-legacy',
            'transform-class-properties'
          ]
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(ico|png|jpe?g|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'url-loader',
        options: {
          name: 'assets/[hash].[ext]',
          limit: 10000
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap'),
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader?sourceMap!less-loader?sourceMap'),
        exclude: /node_modules/
      }
    ]
  }
});