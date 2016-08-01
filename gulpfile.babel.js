/* eslint-disable import/no-extraneous-dependencies */
import autoprefixer from 'autoprefixer';
import bourbon from 'bourbon';
import browserSync from 'browser-sync';
import del from 'del';
import gulp from 'gulp';
import gutil from 'gulp-util';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import nunjucks from 'gulp-nunjucks';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import webpack from 'webpack';

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

function streamError(error) {
  gutil.log(gutil.colors.red(error.toString()));
  gutil.beep();

  if (this && typeof this.emit === 'function') {
    this.emit('end');
  }
}

function compileError(error, stats) {
  if (error) {
    throw error;
  }

  if (stats.hasErrors()) {
    stats.compilation.errors.forEach(err => streamError(err));
  }
}

/**
 * Config
 */

const PATH_SRC = './src';
const PATH_DEST = './dist';
const PATH_MODULES = './node_modules';

const config = {
  serve: {
    open: false,
    notify: false,
    server: {
      baseDir: PATH_DEST,
    },
  },

  javascripts: {
    entry: {
      main: `${PATH_SRC}/javascripts/main.js`,
    },
    output: {
      path: `${PATH_DEST}/javascripts`,
      filename: '[name].js',
    },
    module: {
      loaders: [
        { test: /\.js$/, loader: ['babel-loader', 'eslint-loader'], exclude: PATH_MODULES },
      ],
    },
    plugins: [],
    devtool: 'source-map',
  },

  stylesheets: {
    paths: {
      src: `${PATH_SRC}/stylesheets/**`,
      dest: `${PATH_DEST}/stylesheets`,
    },
    sass: {
      outputStyle: isProduction() ? 'compressed' : 'expanded',
      includePaths: [bourbon.includePaths],
    },
    autoprefixer: {
      browsers: ['last 2 versions'],
    },
  },

  images: {
    paths: {
      src: `${PATH_SRC}/images/**`,
      dest: `${PATH_DEST}/images`,
    },
    imagemin: {
      progressive: true,
    },
  },

  fonts: {
    paths: {
      src: `${PATH_SRC}/fonts/**`,
      dest: `${PATH_DEST}/fonts`,
    },
  },

  html: {
    paths: {
      src: `${PATH_SRC}/**/*.html`,
      dest: PATH_DEST,
    },
    htmlmin: {
      collapseWhitespace: isProduction(),
    },
  },

  copy: {
    paths: {
      src: [
        `${PATH_SRC}/*`,
        `!${PATH_SRC}/*.html`,
      ],
      dest: PATH_DEST,
    },
  },
};

if (isProduction()) {
  config.javascripts.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

/**
 * Tasks
 */

gulp.task('serve', ['javascripts', 'stylesheets', 'images', 'fonts', 'html', 'copy'], () => {
  browserSync(config.serve);

  gulp.watch(config.stylesheets.paths.src, ['stylesheets']);
  gulp.watch(config.images.paths.src, ['images', browserSync.reload]);
  gulp.watch(config.fonts.paths.src, ['fonts', browserSync.reload]);
  gulp.watch(config.html.paths.src, ['html', browserSync.reload]);
});

gulp.task('javascripts', () => {
  webpack(config.javascripts).watch(200, (error, stats) => {
    compileError(error, stats);
    browserSync.reload();
  });
});

gulp.task('stylesheets', () => (
  gulp.src(config.stylesheets.paths.src)
    .pipe(sourcemaps.init())
    .pipe(sass(config.stylesheets.sass))
    .on('error', streamError)
    .pipe(postcss([autoprefixer(config.stylesheets.autoprefixer)]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.stylesheets.paths.dest))
    .pipe(browserSync.stream())
));

gulp.task('images', () => (
  gulp.src(config.images.paths.src)
    .pipe(imagemin(config.images.imagemin))
    .pipe(gulp.dest(config.images.paths.dest))
));

gulp.task('fonts', () => (
  gulp.src(config.fonts.paths.src)
    .pipe(gulp.dest(config.fonts.paths.dest))
));

gulp.task('html', () => (
  gulp.src(config.html.paths.src)
    .pipe(nunjucks.compile())
    .on('error', streamError)
    .pipe(htmlmin(config.html.htmlmin))
    .pipe(gulp.dest(config.html.paths.dest))
));

gulp.task('copy', () => (
  gulp.src(config.copy.paths.src, { dot: true })
    .pipe(gulp.dest(config.copy.paths.dest))
));

gulp.task('clean', () => {
  del([`${PATH_DEST}/*`]);
});

gulp.task('default', ['serve']);
