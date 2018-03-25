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

## System Requirements

This toolset uses some features of Unix-like operating systems. If you use Windows, please make sure you have Git Bash installed.

Additionally you will need to manually add Make and rsync:

1. Go to [MSYS2 packages repository](http://repo.msys2.org/msys/x86_64/) and download latest versions of Make and rsync.
2. Merge contents of `usr` folder from each archive into `C:\Program Files\Git\usr`.
3. Open Git Bash and check that `make` and `rsync` commands are available.

## Installation

Install dependencies:

```
npm install
```

## Usage

To build all resources run:

```
make
```

To start static server and watch files for changes run:

```
make serve
```

Additionally you can take a look at the [`Makefile`](Makefile) for more information about available commands.

## Acknowledgements

* [Web Starter Kit by Google](https://developers.google.com/web/tools/starter-kit/)
* [task automation with npm run by James Halliday](http://substack.net/task_automation_with_npm_run)
* [Source Code for philipwalton.com by Philip Walton](https://github.com/philipwalton/blog)
* [Auto-build CSS / JS etc by TJ Holowaychuk](https://github.com/tj/watch#auto-build-css--js-etc)

## License

Code available under [MIT license](LICENSE).
