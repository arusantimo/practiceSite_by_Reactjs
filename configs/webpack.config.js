const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: [
    './src/client.js',
  ],
  plugins: [
    new ExtractTextPlugin({
      filename: 'www.min.css',
      allChunks: false,
    }),
  ],
}