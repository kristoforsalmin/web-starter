const atImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const customMedia = require('postcss-custom-media');
const customProperties = require('postcss-custom-properties');

const debug = process.env.NODE_ENV !== 'production';

module.exports = {
  map: debug,
  plugins: [
    atImport(),
    customMedia(),
    customProperties(),
    autoprefixer(),
    ...debug ? [] : [csso()],
  ],
};
