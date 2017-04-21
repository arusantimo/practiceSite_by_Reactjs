const _ = require('lodash');
const webpack = require("webpack");
const path = require('path');
const baseConfig = require('./webpack.config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
require('dotenv').config();
process.noDeprecation = true;

module.exports = _.assign({}, baseConfig, {
  devtool: '#source-map',
  entry: [
    path.join(__dirname, 'src', 'client.js'),
    `react-hot-loader/patch`, // activate HMR for React
    `webpack-dev-server/client?http://0.0.0.0:${process.env.DEV_PORT}`, // WebpackDevServer host and port
    `webpack/hot/only-dev-server`, // "only" prevents reload on syntax errors
  ],
  output: {
    path: '/',
    filename: 'client.js'
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
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: [
            'react-hot-loader/babel',
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
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap'),
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('sass-loader?sourceMap'),
      }
    ]
  }
});