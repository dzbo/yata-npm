const gulp       = require('gulp');
const mocha      = require('gulp-mocha');
const eslint     = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const babel      = require('gulp-babel');

// Lint

gulp.task('lint:src', function() {
  return gulp.src('./src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint:bin', function() {
  return gulp.src('./bin/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint:test', function() {
  return gulp.src('./test/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Build task

gulp.task('babel:src', function() {
  return gulp.src('./src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/preset-env'],
      "plugins": [
        ["@babel/plugin-transform-runtime",
          {
            "regenerator": true
          }
        ]
      ]
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series('lint:src', 'babel:src'));

// Tests tasks

gulp.task('test', gulp.series('lint:test', 'lint:src', 'lint:bin', 'babel:src', () =>
	gulp.src('./test/**/*.js', { read: false })
		.pipe(mocha())
));

// Watch tasks

gulp.task('watch', function() {
  gulp.watch('test/**/*.js', gulp.series('test'));
  gulp.watch('src/**/*.js', gulp.series('test'));
  gulp.watch('bin/**/*.js', gulp.series('test'));
});

gulp.task('default', gulp.series('test', 'watch'));
