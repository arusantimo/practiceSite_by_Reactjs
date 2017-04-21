const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  plugins: [
    new ExtractTextPlugin({
      filename: 'www.min.css',
      allChunks: false,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        resolve: {
          extensions: ['.ts', '.tsx', '.js']
        }
      }
    }),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.css', '.scss'],
  },
}