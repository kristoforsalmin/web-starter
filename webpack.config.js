const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader?presets[]=es2015', exclude: /node_modules/ },
    ],
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
};
