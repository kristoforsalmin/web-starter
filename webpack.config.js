const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const debug = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: debug ? 'inline-source-map' : false,
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader?presets[]=es2015', exclude: /node_modules/ },
    ],
  },
  plugins: [
    ...debug ? [] : [new UglifyJsPlugin()],
  ],
};
