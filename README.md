# Web Starter

[![Dependency Status](https://david-dm.org/racse1/web-starter.svg)](https://david-dm.org/racse1/web-starter) [![devDependency Status](https://david-dm.org/racse1/web-starter/dev-status.svg)](https://david-dm.org/racse1/web-starter#info=devDependencies)

Web Starter is a simple web development toolset.

| Feature | Tools Used |
|---------|------------|
| CSS | [PostCSS](http://postcss.org/) (Autoprefixer, postcss-custom-media, postcss-custom-properties, postcss-import), [clean-css](https://github.com/jakubpawlowicz/clean-css), [SUIT CSS](https://suitcss.github.io/) (suitcss-base, suitcss-components-grid, suitcss-utils) |
| JavaScript | [webpack](https://webpack.github.io/), [Babel](https://babeljs.io/) (ES2015 preset), [UglifyJS](http://lisperator.net/uglifyjs/) |
| Images | [imagemin](https://github.com/imagemin/imagemin) |
| Code Linting | [stylelint](http://stylelint.io/) (stylelint-config-standard), [ESLint](http://eslint.org/) (eslint-config-airbnb-base) |
| Live Updating | [Browsersync](https://browsersync.io/) |

## Installation

Install dependencies:

```
npm install
```

## Usage

To build all resources run:

```
npm run build
```

To start watching all resources and updating connected browsers run:

```
npm run serve
```

Additionally you can have a look at the [`scripts` property](https://github.com/racse1/web-starter/blob/master/package.json#L2-L22) of the `package.json` for more information about available commands.

## Acknowledgements

* [Web Starter Kit by Google](https://developers.google.com/web/tools/starter-kit/)
* [task automation with npm run by James Halliday](http://substack.net/task_automation_with_npm_run)
* [Source Code for philipwalton.com by Philip Walton](https://github.com/philipwalton/blog)

## License

Code available under [MIT license](LICENSE).
