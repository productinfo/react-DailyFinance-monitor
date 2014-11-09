'use strict';

var path = require('path'),
  configLoader = require('konphyg')(path.resolve(__dirname, 'config')),
  config = configLoader('config');

exports = module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      compass: {
        files: [config.client + '/css/{,*/}*.{scss,sass}'],
        tasks: ['compass:server']
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp'
          ]
        }]
      },
      server: '.tmp'
    },
    express: {
      options: {
        port: config.port,
        hostname: '*'
      },
      livereload: {
        options: {
          server: path.resolve(config.server),
          bases: [path.resolve(config.target), path.resolve(config.client)],
          livereload: true,
          serverreload: true
        }
      },
      dist: {
        options: {
          server: path.resolve(__dirname, config.server),
          bases: [path.resolve(config.target), path.resolve(config.client)]
        }
      },
      test: {
        options: {
          server: path.resolve(__dirname, config.server),
          bases: [path.resolve(__dirname, config.target), path.resolve(__dirname, 'test')]
        }
      }
    },
    compass: {
      options: {
        sassDir: config.client + '/css',
        cssDir: '.tmp/css',
        javascriptsDir: config.client + '/js',
        importPath: config.client + '/bower_components',
        relativeAssets: false
      },
      dist: {
        options: {
          sassDir: config.client + '/css',
          cssDir: '.tmp/css',
          javascriptsDir: config.client + '/js',
          importPath: config.client + '/bower_components',
          relativeAssets: false,
          outputStyle: 'compressed'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:' + config.port
      }
    },
    concurrent: {
      server: [
        'compass:server'
      ],
      dist: [
        'compass:dist'
      ],
      test: [
        'compass'
      ]
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'server/lib/*.*',
        'client/js/*.*',
        'Gruntfile.js',
        'index.js'
      ]
    }
  });

  // for development usage
  grunt.registerTask('server', [
    'clean:server',
    'concurrent:server',
    'express:livereload',
    'open',
    'watch'
  ]);

  // for deploying on production instance
  grunt.registerTask('deploy', [
    'clean:server',
    'concurrent:dist',
    'express:dist',
    'express-keepalive'
  ]);

  grunt.registerTask('default', [
    'jshint'
  ]);

};
