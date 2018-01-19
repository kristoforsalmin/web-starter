const path = require('path');
const webpack = require('webpack');

const debug = process.env.NODE_ENV !== 'production';

const srcDir = 'src';
const destDir = 'dist';
const scriptsDir = 'scripts';

module.exports = {
  context: path.resolve(__dirname, `${srcDir}/${scriptsDir}`),
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, `${destDir}/${scriptsDir}`),
    publicPath: `/${scriptsDir}/`,
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  devtool: debug ? 'cheap-module-eval-source-map' : false,
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, `${srcDir}/${scriptsDir}`),
        loader: 'babel-loader',
        options: {
          cacheDirectory: debug,
        },
      },
    ],
  },
  plugins: [
    ...debug ? [] : [new webpack.optimize.UglifyJsPlugin()],
  ],
};
