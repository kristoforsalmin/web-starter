# Web Starter

[![Dependency Status](https://david-dm.org/racse1/web-starter.svg)](https://david-dm.org/racse1/web-starter) [![devDependency Status](https://david-dm.org/racse1/web-starter/dev-status.svg)](https://david-dm.org/racse1/web-starter#info=devDependencies)

Web Starter is a simple web development toolset.

| Feature | Tools Used |
|---------|------------|
| HTML | [Pug](https://pugjs.org/) |
| CSS | [PostCSS](http://postcss.org/), [CSSO](https://github.com/css/csso), [SUIT CSS](https://suitcss.github.io/) |
| JavaScript | [webpack](https://webpack.github.io/), [Babel](https://babeljs.io/), [UglifyJS](http://lisperator.net/uglifyjs/) |
| Images | [imagemin](https://github.com/imagemin/imagemin), [svg-sprite](https://github.com/jkphl/svg-sprite) |
| Code Linting | [stylelint](http://stylelint.io/), [ESLint](http://eslint.org/) |
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

Additionally you can have a look at the [`scripts` property](https://github.com/racse1/web-starter/blob/master/package.json#L2-L21) of the `package.json` for more information about available commands.

## Acknowledgements

* [Web Starter Kit by Google](https://developers.google.com/web/tools/starter-kit/)
* [task automation with npm run by James Halliday](http://substack.net/task_automation_with_npm_run)
* [Source Code for philipwalton.com by Philip Walton](https://github.com/philipwalton/blog)

## License

Code available under [MIT license](LICENSE).
