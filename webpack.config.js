const path = require('path');
const webpack = require('webpack');

const debug = process.env.NODE_ENV !== 'production';

module.exports = {
  context: path.resolve(__dirname, 'src/scripts'),
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist/scripts'),
    publicPath: '/scripts/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  devtool: debug ? 'cheap-module-eval-source-map' : false,
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    ...debug ? [] : [new webpack.optimize.UglifyJsPlugin()],
  ],
};
