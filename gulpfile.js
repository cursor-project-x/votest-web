'use strict';

const gulp = require('gulp');
const clean = require('gulp-clean');
const htmlmin = require('gulp-htmlmin');
const noop = require('gulp-noop');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const gulpSequence = require('gulp-sequence');
const eslint = require('gulp-eslint');
const sassLint = require('gulp-sass-lint');
const webserver = require('gulp-webserver');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglyfly = require('gulp-uglyfly');
const rename = require('gulp-rename');

// if production
//
const isProduction = process.env.NODE_ENV === 'production';

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
