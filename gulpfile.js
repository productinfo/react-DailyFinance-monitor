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


// for development usage
// 'clean:server',
// 'concurrent:server',
// 'express:livereload',
// 'open',
// 'watch'
gulp.task('server', ['clean:tmp']);

// for deploying on production instance
// 'clean:server',
// 'concurrent:dist',
// 'express:dist',
// 'express-keepalive'
gulp.task('deploy', ['jshint']);

// check code
gulp.task('default', ['jshint']);