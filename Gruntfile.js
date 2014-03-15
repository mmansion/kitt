module.exports = function(grunt) {

  /*
   * Grunt Project Configuration
   */

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {  

      //ref: https://github.com/gruntjs/grunt-contrib-clean

      /*
      clean directories before write
      dist: 'dist/*',
      docs: 'docs/*'
      */
    },

    concat: {

      //ref: https://github.com/gruntjs/grunt-contrib-concat

      
      // dist: {
      //   options: {
      //     separator: '\n',
      //     banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      //             '<%= grunt.template.today("yyyy-mm-dd") %> */'
      //   },
      //   src: ['path/to/src.js'],
      //   dest: 'path/to/dest.js'
      // }
      
    },
    
    connect: {

      //ref: https://github.com/gruntjs/grunt-contrib-connect

      dev: {
        options: {
          port: 9999,
          base: '.',
          keepalive: true,
          hostname : '*'
        }
      }
      
    },

    copy: {

      //ref: https://github.com/gruntjs/grunt-contrib-copy

      /*
      dist: { 
        //copy library assets 
        //note that oncat can handle copying script files
        files: [
          {
          expand: true, 
          cwd: 'src/ralphe',
          src: [ ] // include or exclude files to copy
          dest: 'dist/'
          }
        ]
      }
      */
    },

    jshint: {
      
      //ref: https://github.com/gruntjs/grunt-contrib-jshint

      /*
      all: ['Gruntfile.js', 'path/to/src/**'],
      options: {
        '-W002': true //supress warning about IE8 by listing warning number from console output
      }
      */
    },  

    open: {
      src: {
        path: 'http:localhost:9999/src'
      }
    },

    exec: {
      edit: {
        cmd: function(file) {
          return 'subl ./src/sketches/' + file;
        }
      }
    }
  });

  /*
   * Load NPM Tasks
   */

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-open');

  /*
   * Registered Grunt Tasks
   */

  //development and distribution tasks
  grunt.registerTask('default', ['open', 'connect']);



  grunt.registerTask('tmp', 'Generates a new canvas sketch.', function() {
    var configJS = grunt.file.read('src/config.js');
    var config = eval(configJS);
    console.log(config());
  });


   //custom grunt task for generating a new canvas sketch

  grunt.registerTask('sketch', 'Generates a new canvas sketch.', function() {
    var sketchList = grunt.file.readJSON('src/sketches.json')
      , inc        = 0
      , alpha      = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
      , newSketch  = 'sketch-' + grunt.template.today("yyyy-mm-dd");

    sketchList.forEach(function(sketches) {
      for(var prop in sketches) {
        if(prop === 'default') {
          delete sketches[prop];
        }
        if(prop == 'src' && sketches[prop].search(newSketch) !== -1) {
          while(sketches[prop].search(newSketch + '-' + alpha[inc]) !== -1) {
            inc++;
          }
        }
      }
    });

    newSketch += '-' + alpha[inc] + '.js';

    sketchList.push({
      'title'  : grunt.template.today("yyyy-mm-dd") + '-' + alpha[inc],
      'src'    : newSketch,
      'default': 'true'
    });

    grunt.log.writeln("generating new canvas sketch");
    grunt.file.copy('src/templates/basic-sketch.js', 'src/sketches/' + newSketch);
    grunt.file.write('src/sketches.json', JSON.stringify(sketchList, null, 2));

    grunt.task.run('exec:edit:' + newSketch, 'default');
  });

};