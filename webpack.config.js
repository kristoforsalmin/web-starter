const debug = process.env.NODE_ENV !== 'production';

module.exports = {
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: debug,
        },
      },
    ],
  },
};
