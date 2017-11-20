'use strict';
var gulp = require('gulp');
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');
var noop = require('gulp-noop');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
// var pug= require('gulp-pug');
// var pugLinter = require('gulp-pug-linter');
var gulpSequence = require('gulp-sequence');
var eslint = require('gulp-eslint');
var sassLint = require('gulp-sass-lint');
var webserver = require('gulp-webserver');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglyfly = require('gulp-uglyfly');
var rename = require('gulp-rename');

// if production
//
var isProduction = process.env.NODE_ENV === 'production';

// will clean dest directory on event => reload
//
gulp.task('clean', () => {
  return gulp.src('./dest/**/*', { read: false })
    .pipe(clean()) 
});

// will copy all html views
//
gulp.task('views', () => {
  gulp.src('./src/*.html')
    .pipe(isProduction ? htmlmin({collapseWhitespace: true}) : noop()) 
    .pipe(gulp.dest('./dest/'))
});

// will check js files.
//
gulp.task('js:lint', () => {
  return gulp.src('./src/scripts/dev/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
});

// will compile js-file and push to dir.es5
//
gulp.task('compile:js', () => {
  return gulp.src('./src/scripts/dev/**/*.js')
    .pipe(babel({
      presets: ['env']
}))
    .pipe(gulp.dest('./src/scripts/dest'));
});

// concat, uglyfly, call compile:js
//
gulp.task('js:optimization', () => {
  return gulp.src('./src/scripts/dest/*.js')
    .pipe(concat('app.js'))
    .pipe(uglyfly({
      output: { beautify: isProduction ? false : true }
    }))
    .pipe(gulp.dest('./dest/js'));
});

// sass/scss linter
//
gulp.task('sass:lint', () => {
  return gulp.src('./src/sass/**/*.s+(a|c)ss')
    .pipe(sassLint({
      rules: {
        'indentation': [
          1, 
            {
              'size': 4
            }
        ],
        'no-ids': 1,
        'no-mergeable-selectors': 0
      }
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

// will compile sass to css with autoprefixer call sass:lint;
//
gulp.task('sass', () => {
  gulp.start('sass:lint')
  return gulp.src('./src/sass/**/*.s+(a|c)ss')
    .pipe(sass({outputStyle: isProduction ? 'compressed' : 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
       browsers: ['last 2 versions'],
       cascade: false
    }))
    .pipe(gulp.dest('./dest/css'))
});

// will copy images without opt. and sprites
//
gulp.task('images', () => {
  return gulp.src('./src/images/*.png')
  .pipe(gulp.dest('./dest/images/'))
});

// server
gulp.task('server', () => {
  gulp.src('./dest')
    .pipe(webserver({
      port:8080,
      livereload: isProduction ? false : true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('build', done => {
  gulpSequence('clean', ['views', 'sass', 'compile:js', 'images'], ['js:optimization'])(done)
});

gulp.task('watch', () => {
  gulp.watch('src/**/*', ['build']);
  gulp.watch('src/scripts/**/*.js', ['js:lint']);
});

gulp.task('default', gulpSequence(['views', 'js:lint', 'build'], ['server', 'watch']));
