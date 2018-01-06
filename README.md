# Web Starter

[![Dependency Status](https://img.shields.io/david/racse1/web-starter.svg)](https://david-dm.org/racse1/web-starter) [![devDependency Status](https://img.shields.io/david/dev/racse1/web-starter.svg)](https://david-dm.org/racse1/web-starter?type=dev)

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

Additionally you can have a look at the [`scripts` property](https://github.com/racse1/web-starter/blob/master/package.json#L2-L19) of the `package.json` for more information about available commands.

## Usage with Docker

First, build the image:

```
docker build -t web-starter .
```

Then create and run the container:

```
docker run -p 3000:3000 -p 3001:3001 web-starter
```

If no [command](https://docs.docker.com/engine/reference/run/#cmd-default-command-or-options) provided, `npm run serve` will be executed by default.

## Acknowledgements

* [Web Starter Kit by Google](https://developers.google.com/web/tools/starter-kit/)
* [task automation with npm run by James Halliday](http://substack.net/task_automation_with_npm_run)
* [Source Code for philipwalton.com by Philip Walton](https://github.com/philipwalton/blog)

## License

Code available under [MIT license](LICENSE).
