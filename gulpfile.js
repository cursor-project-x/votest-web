require('dotenv').config();
'use strict';

const gulp = require('gulp');
const clean = require('gulp-clean');
const htmlmin = require('gulp-htmlmin');
const noop = require('gulp-noop');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const gulpSequence = require('gulp-sequence');
const webserver = require('gulp-webserver');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglyfly = require('gulp-uglyfly');

// if production
const isProduction = process.env.NODE_ENV !== 'development';

// will clean dest directory on event => reload
gulp.task('clean', () => {
  return gulp.src('./dest/**/*', { read: false })
    .pipe(clean())
});

// will copy all html views
gulp.task('views', () => {
  gulp.src('./src/*.html')
    .pipe(isProduction ? htmlmin({collapseWhitespace: true}) : noop())
    .pipe(gulp.dest('./dest/'))
});

// will compile js-file and push to dir.es5
gulp.task('scripts', () => {
  return gulp.src('./src/scripts/**/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglyfly({
      output: { beautify: isProduction ? false : true }
    }))
    .pipe(gulp.dest('./dest/scripts'));
});

// will compile sass to css with autoprefixer call sass:lint;
gulp.task('styles', () => {
  return gulp.src('./src/styles/**/*.s+(a|c)ss')
    .pipe(sass({
      outputStyle: isProduction ? 'compressed' : 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./dest/styles/'))
});

// will copy images without opt. and sprites
gulp.task('images', () => {
  return gulp.src('./src/images/*.png')
    .pipe(gulp.dest('./dest/images/'))
});

// server
gulp.task('server', () => {
  return gulp.src('./dest')
    .pipe(webserver({
      port: process.env.HTTP_PORT || 8080,
      livereload: isProduction ? false : true,
      directoryListing: false,
      open: false
    }));
});

// watch & reload server
gulp.task('watch', () => {
  gulp.watch('src/**/*', ['build']);
});

// build app
gulp.task('build', done => {
  gulpSequence('clean', ['views', 'styles', 'scripts', 'images'])(done)
});

// default task
gulp.task('default', gulpSequence(['build'], ['server', 'watch']));
