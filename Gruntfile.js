'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var tsFiles = ['lib/{,*/}*.ts',
                  '!lib/reference.ts',
                  '!lib/{,*/}*.d.ts',
                  'tests/{,*/}*.ts',
                  '!test/{,*/}*.d.ts'];

  grunt.initConfig({
    watch: {
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'tests/{,*/}*.html',
          'css/{,*/}*.css',
          'lib/{,*/}*.js'
        ]
      },
      ts: {
          files: tsFiles,
          tasks: ['ts:dev']
      }
    },

    ts: {
      options: { // use to override the default options, http://gruntjs.com/configuring-tasks#options
          target: 'es3', // es3 (default) / or es5
          //module: 'commonjs', // amd , commonjs (default)
          sourcemap: true, // true (default) | false
          //declaration: false, // true | false (default)
          //nolib: false, // true | false (default)
          //comments: false // true | false (default)
      },
      dev: {
          src: tsFiles,
          reference: 'lib/reference.ts', // If specified, generate this file that you can use for your reference management
          // out: '<%= yeoman.app %>/scripts/out.js', // If specified, generate an out.js file which is the merged js file
          options: { // override the main options, http://gruntjs.com/configuring-tasks#options
              sourcemap: true,
              declaration: true,
              comments: true,
              target: 'es5'
          },
      },
      build: { // another target
          src: tsFiles,
          options: { // overidet he main options for this target
              sourcemap: false,
          }
      }
    },

    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '127.0.0.1',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
          	'lib',
          	'tests',
          	'css'
          ]
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'lib/scripts.js': [
            'lib/scripts.js'
          ]
        }
      }
    } 
  });

  grunt.registerTask('default', [
  	'ts:dev',
  	'connect:livereload',
  	'watch'
  	]);
};