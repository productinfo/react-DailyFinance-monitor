'use strict';

var gulp = require('gulp'),
    del = require('del'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    stylish = require('jshint-stylish');

// open localhost
gulp.task('open', function(){
  gulp.src('./client/index.html')
  .pipe(plugins.open('', {
    url: 'http://localhost:1992'
  }));
});

// precompile jsx for dev
gulp.task('react:dev', function () {
  gulp.src('client/js/*.jsx')
      .pipe(plugins.react())
      .pipe(gulp.dest('client/build'));
});

// compile SASS
gulp.task('sass', function () {
  gulp.src('client/css/main.scss')
      .pipe(plugins.sass())
      .pipe(gulp.dest('client/css'));
});

// minify CSS
gulp.task('minify-css', function () {
  gulp.src('client/css/main.css')
      .pipe(plugins.minifyCss())
      .pipe(gulp.dest('dist/css'));
});

// minify JS
gulp.task('minify-js', function() {
  gulp.src('client/js/**/*.js')
      .pipe(plugins.uglify({ mangle: false }))
      .pipe(gulp.dest('dist/js'));
});

// minify HTML
gulp.task('minify-html', function() {
  gulp.src('client/index.html')
      .pipe(plugins.minifyHtml({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist'));

  gulp.src('client/views/*.html')
      .pipe(plugins.minifyHtml({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist/views'));
});

// jshint
gulp.task('lint', function () {
  return gulp.src(['gulpfile.js', 'server/lib/*.*', 'client/js/*.*'])
             .pipe(plugins.jshint())
             .pipe(plugins.jshint.reporter(stylish));
});

gulp.task('clean', function (cb) {
  del(['dist'], cb);
});

// copy bower_components folder to dist
gulp.task('copy', function(){
  return gulp.src('client/bower_components/**')
    .pipe(gulp.dest('dist/bower_components'));
});

// nodemon task
gulp.task('nodemon', function () {
  console.log('start nodemon!');
  plugins.nodemon({
    script: 'server/lib/index.js'
  })
  .on('change', ['react:dev'])
  .on('restart', function () {
    console.log('restarted!');
  });
});

gulp.task('webpack', function() {
  return gulp.src('client/js/main.js')
    .pipe(plugins.webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/'));
});

// build and minify code
gulp.task('build', ['copy', 'sass', 'minify-css', 'minify-js', 'minify-html']);

// create dist directory
gulp.task('dist', ['lint', 'clean'], function () {
  gulp.start('build');
});

// production build (not complete yet)
gulp.task('prod', ['dist', 'dev']);

// develop build
gulp.task('dev', ['react:dev', 'nodemon', 'open']);

// default
gulp.task('default', ['dev']);