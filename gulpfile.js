'use strict';

var gulp = require('gulp'),
    del = require('del'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    stylish = require('jshint-stylish');

gulp.task('jshint', function () {
  return gulp.src(['gulpfile.js', 'server/lib/*.*', 'client/js/*.*'])
             .pipe(plugins.jshint())
             .pipe(plugins.jshint.reporter(stylish));
});

gulp.task('clean:tmp', function () {
  del(['.tmp']);
});

gulp.task('build', ['jshint']);


gulp.task('dev', function () {
  console.log('TBD...');
});

// check code
gulp.task('default', ['dev']);