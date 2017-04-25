const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: [
    'babel-polyfill',
    './src/client.jsx'
  ],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  resolve: {
		extensions: ['.ts', '.tsx', '.js', 'json', '.jsx', 'css', 'scss']
	},
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        resolve: {
          extensions: ['.ts', '.tsx', '.js', 'json', '.jsx', 'css', 'scss']
        }
      }
    }),
    new ExtractTextPlugin({
      filename: 'www.min.css',
      allChunks: false
    }),
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
        unused: true
      },
      output: {
        comments: false
      }
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader!awesome-typescript-loader?module=es6',
        options: {
          cacheDirectory: true,
        }
      },
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
        }
      },
      {
        test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        exclude: /node_modules/,
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
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader!postcss-loader!sass-loader'),
      }
    ]
  }
};
