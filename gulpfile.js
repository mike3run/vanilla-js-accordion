var pkg = require('./package.json')
var pug = require('gulp-pug')
var gulp = require('gulp')
var less = require('gulp-less')
var clean = require('gulp-clean-css')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var header = require('gulp-header')
var jshint = require('gulp-jshint')
var stylish = require('jshint-stylish');

var banner = ['/**',
  ' * Vanilla JavaScript Accordion v<%= pkg.version %>',
  ' * <%= pkg.homepage %>',
  ' */',
  ''].join('\n');

gulp.task('script', function () {
  gulp.src(['./src/javascript/vanilla-js-accordion.js'])
    .pipe(uglify())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./docs/javascript'));
});

gulp.task('markup', function () {
  gulp.src('./src/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function () {
  gulp.src('./src/styles/*.less')
    .pipe(less())
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./docs/styles'));
});

gulp.task('docs-styles', function () {
  gulp.src('./docs/styles/*.less')
    .pipe(less())
    .pipe(clean({
      compatibility: 'ie9'
    }))
    .pipe(gulp.dest('./docs/styles'));
});

gulp.task('lint', function () {
  return gulp.src('./src/javascript/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('default', [ 'script', 'markup', 'styles', 'docs-styles', 'lint' ]);
