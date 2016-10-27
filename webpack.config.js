module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loader: ['babel-loader', 'eslint-loader'] },
    ],
  },
  devtool: 'source-map',
};
