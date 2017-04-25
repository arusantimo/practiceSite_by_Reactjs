const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

require('dotenv').config();

process.noDeprecation = true;

module.exports = {
  devtool: '#source-map',
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://0.0.0.0:${process.env.DEV_PORT}`,
    'webpack/hot/only-dev-server',
    './src/client.jsx'
  ],
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new ExtractTextPlugin({
      filename: 'www.min.css',
      allChunks: false
    })
  ],
  resolve: {
		extensions: ['.ts', '.tsx', '.js', 'json', '.jsx', 'css', 'scss']
	},
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader?cacheDirectory=true',
          'react-hot-loader',
          'awesome-typescript-loader?cacheDirectory=true'
        ],
      },
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(ico|png|jpe?g|gif|svg|woff|woff2|ttf|eot)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          name: 'assets/[hash].[ext]',
          limit: 10000
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap'),
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('sass-loader?sourceMap'),
        exclude: /node_modules/
      }
    ]
  }

};
