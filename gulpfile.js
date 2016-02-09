const browserSync = require('browser-sync');
const changed     = require('gulp-changed');
const del         = require('del');
const gulp        = require('gulp');
const htmlmin     = require('gulp-htmlmin');
const imagemin    = require('gulp-imagemin');
const nunjucks    = require('gulp-nunjucks');
const sass        = require('gulp-sass');
const webpack     = require('webpack');

/**
 * Logging
 */

function streamError(error) {
  console.log(error.toString());

  if (this.emit) {
    this.emit('end');
  }
}

function compileError(error, stats) {
  if (error) {
    throw new error;
  }

  if (stats.compilation.errors.length) {
    stats.compilation.errors.forEach(error => streamError(error));
  }
}

/**
 * Paths
 */

const PATH_SRC     = './resources';
const PATH_DEST    = './public';
const PATH_MODULES = './node_modules';

/**
 * Config
 */

const config = {
  serve: {
    open: false,
    notify: false,
    server: {
      baseDir: PATH_DEST
    }
  },

  javascripts: {
    entry: {
      main: `${PATH_SRC}/assets/javascripts/main.js`
    },
    output: {
      path: `${PATH_DEST}/assets/javascripts`,
      filename: '[name].js',
      chunkFilename: '[id].js'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin()
    ]
  },

  stylesheets: {
    paths: {
      src: `${PATH_SRC}/assets/stylesheets/**`,
      dest: `${PATH_DEST}/assets/stylesheets`
    },
    sass: {
      outputStyle: 'compressed',
      includePaths: [
        PATH_MODULES
      ]
    }
  },

  images: {
    paths: {
      src: `${PATH_SRC}/assets/images/**`,
      dest: `${PATH_DEST}/assets/images`
    },
    imagemin: {
      progressive: true
    }
  },

  fonts: {
    paths: {
      src: `${PATH_SRC}/assets/fonts/**`,
      dest: `${PATH_DEST}/assets/fonts`
    }
  },

  views: {
    paths: {
      src: `${PATH_SRC}/views/**`,
      dest: PATH_DEST
    },
    htmlmin: {
      collapseWhitespace: true
    }
  }
};

/**
 * Tasks
 */

gulp.task('serve', ['javascripts', 'stylesheets', 'images', 'fonts', 'views'], () => {
  browserSync(config.serve);

  gulp.watch(config.stylesheets.paths.src, ['stylesheets']);
  gulp.watch(config.images.paths.src,      ['images', browserSync.reload]);
  gulp.watch(config.views.paths.src,       ['views',  browserSync.reload]);
  gulp.watch(config.fonts.paths.src,       ['fonts',  browserSync.reload]);
});

gulp.task('javascripts', () => {
  webpack(config.javascripts).watch(200, (error, stats) => {
    compileError(error, stats);
    browserSync.reload();
  });
});

gulp.task('stylesheets', () => {
  return gulp.src(config.stylesheets.paths.src)
    .pipe(changed(config.stylesheets.paths.src))
    .pipe(sass(config.stylesheets.sass))
    .on('error', streamError)
    .pipe(gulp.dest(config.stylesheets.paths.dest))
    .pipe(browserSync.stream());
});

gulp.task('images', () => {
  return gulp.src(config.images.paths.src)
    .pipe(changed(config.images.paths.src))
    .pipe(imagemin(config.images.imagemin))
    .pipe(gulp.dest(config.images.paths.dest));
});

gulp.task('fonts', () => {
  return gulp.src(config.fonts.paths.src)
    .pipe(changed(config.fonts.paths.src))
    .pipe(gulp.dest(config.fonts.paths.dest));
});

gulp.task('views', () => {
  return gulp.src(config.views.paths.src)
    .pipe(changed(config.views.paths.src))
    .pipe(nunjucks.compile())
    .on('error', streamError)
    .pipe(htmlmin(config.views.htmlmin))
    .pipe(gulp.dest(config.views.paths.dest));
});

gulp.task('clean', () => {
  del([`${PATH_DEST}/*`]);
});

gulp.task('default', ['serve']);
