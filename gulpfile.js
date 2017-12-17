'use strict';
require('dotenv').config();

const debug = require('debug')('app-build');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');

// preload all plugins
const plugins = gulpLoadPlugins();

// if production
const isProduction = process.env.NODE_ENV !== 'development';

// will clean dest directory on event => reload
gulp.task('clean', () => {
  return gulp
    .src('./dest/**/*', { read: false })
    .pipe(plugins.clean())
});

// up the version
gulp.task('bump', function(){
  return gulp
    .src('./package.json')
    .pipe(plugins.bump())
    .pipe(gulp.dest('./'));
});

// will copy all html views
gulp.task('views', () => {
  delete require.cache[require.resolve('./package.json')]

  return gulp
    .src('./src/*.html')
    .pipe(plugins.versionAppend(['html', 'js', 'css']))
    .pipe(isProduction ? plugins.htmlmin({collapseWhitespace: true}) : plugins.noop())
    .pipe(gulp.dest('./dest/'))
});

// will compile js-file and push to dir.es5
gulp.task('scripts', () => {
  return gulp
    .src('./src/scripts/**/*.js')
    .pipe(plugins.babel({
      presets: ['env']
    }))
    .pipe(plugins.concat('app.js'))
    .pipe(plugins.uglyfly({
      output: { beautify: isProduction ? false : true }
    }))
    .pipe(gulp.dest('./dest/scripts'));
});

// will compile sass to css with autoprefixer call sass:lint;
gulp.task('styles', () => {
  return gulp
    .src('./src/styles/**/*.s+(a|c)ss')
    .pipe(plugins.sass({
      outputStyle: isProduction ? 'compressed' : 'expanded'
    }).on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(plugins.concat('app.css'))
    .pipe(gulp.dest('./dest/styles/'))
});

// will copy images without opt. and sprites
gulp.task('images', () => {
  return gulp
    .src('./src/images/*.png')
    .pipe(gulp.dest('./dest/images/'))
});

// server
gulp.task('server', () => {
  return gulp
    .src('./dest')
    .pipe(plugins.webserver({
      port: process.env.HTTP_PORT || 8080,
      livereload: isProduction ? false : true,
      directoryListing: false,
      open: false
    }));
});

// watch & reload server
gulp.task('watch', () => {
  return gulp.watch('src/**/*', ['build']);
});

// build app
gulp.task('build', done => {
  return plugins.sequence('clean', 'bump', ['views', 'styles', 'scripts', 'images'])(done)
});

// default task
gulp.task('default', plugins.sequence(['build'], ['server', 'watch']));
