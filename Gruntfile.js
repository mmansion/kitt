module.exports = function(grunt) {

  var G = grunt;

   /**
    *
    * GRUNT TASK CONFIGURATION
    *
    */
   
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    /**
    *
    * BOWER
    *
    */

    bower: {
      dist: {
        dest:      'dist/',
        js_dest:   'dist/scripts/libs',
        css_dest:  'dist/styles'
      }
    },

    /**
    *
    * CLEAN
    *
    */

    clean: {
      dist: 'dist/*' //deletes files in dist/webapp dir 
    },

    concat: {
      scripts: {
        options: {
          separator: '\n;',

          //BANNER FOR MASTER JS BUILD
          banner: '/**\n * \n * ' +
                  '<%= pkg.title || pkg.name %> - v<%= pkg.version %> '  +
                  '<%= grunt.template.today("yyyy.mm.dd") %>\n * \n'     +
                  '<%= pkg.description ? " * " + pkg.description + "\\n" : "" %>' +
                  ' * Copyright (c) <%= grunt.template.today("yyyy") %>' +
                  '<%= pkg.author ? " - " + pkg.author + "\\n" : "" %>'  +
                  ' *\n */\n\n'
        },
        src: [
          'dist/scripts/chapters/*',
          'dist/scripts/classes/*',
          'dist/scripts/core/*'
        ],
        dest: 'dist/build.js'
      },
      styles: {
        options: {
          separator: '\n;',

          //BANNER FOR MASTER CSS BUILD
          banner: '/**\n * \n * ' +
                  '<%= pkg.title || pkg.name %> - v<%= pkg.version %> '  +
                  '<%= grunt.template.today("yyyy.mm.dd") %>\n * \n'     +
                  '<%= pkg.description ? " * " + pkg.description + "\\n" : "" %>' +
                  ' * Copyright (c) <%= grunt.template.today("yyyy") %>' +
                  '<%= pkg.author ? " - " + pkg.author + "\\n" : "" %>'  +
                  ' *\n */\n\n'
        },
        src: [ //these need to be in order
          'dist/styles/normalize.css',
          'dist/styles/bootstrap.css',
          'dist/styles/main.css',
          'dist/styles/index.css'
        ],
        dest: 'dist/all.css'
      }
    },
    
    /**
    *
    * CONNECT
    *
    */

    connect: {
      dev: {
        options: {
          port: 9001,
          base: '.',
          keepalive: true,
          hostname : '*'
        }
      }
    },

    /**
    *
    * COPY
    *
    */

    copy: {
      source: { 
        files: [
          {
          expand: true, 
          cwd: 'src/',
          src: [ 
            '*/**'
          ], // include or exclude files to copy
          dest: 'dist/'
          }
        ]
      },
      scripts: {
        files: [
          {
          expand: true, 
          cwd: 'dist/',
          src: ['build.js', 'build.min.js'],
          dest: 'dist/scripts'
          }
        ]
      },
      styles: {
        files: [
          {
          expand: true, 
          cwd: 'dist/',
          src: ['all.css', 'all.min.css'],
          dest: 'dist/styles'
          }
        ]
      }
    },

    /**
    *
    * CSS MIN
    *
    */

    cssmin: {
      dist: {
        options: {
          banner: '/**\n * \n * ' +
                  '<%= pkg.title || pkg.name %> - v<%= pkg.version %> '  +
                  '<%= grunt.template.today("yyyy.mm.dd") %>\n * \n'     +
                  '<%= pkg.description ? " * " + pkg.description + "\\n" : "" %>' +
                  ' * Copyright (c) <%= grunt.template.today("yyyy") %>' +
                  '<%= pkg.author ? " - " + pkg.author + "\\n" : "" %>'  +
                  ' *\n */\n\n'
          },
          files: {
          'dist/all.min.css': ['dist/all.css']
          }
      }
    },

    /**
    *
    * EXEC
    *
    */

    exec: {

      edit: {
        cmd: function(file) {
          return 'subl ./src/sketches/' + file;
        }
      },

      editClass: {
        cmd: function(file) {
          return 'subl ./src/nexus-core/' + file;
        }
      },

      startServer: 'grunt connect &',

      loadNexus: {

        stdout: true,
        stderr: true,

        cmd: function(nexusToLoad) {
          return '"/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome" --load-and-launch-app=./src/Nexus001/ChromeApp'
          //return String("open ./src/Nexus" + nexusToLoad + "/nexus.app");
        }
      }
    },

    /**
    *
    * JSHINT
    *
    */

    jshint: {
      all: ['Gruntfile.js', 'src/**'],
      options: {
        '-W002': true //supress warning about IE8 by listing warning number from console output
      }
    },

    /**
    *
    * OPEN
    *
    */

    open: {
      src: {
        path: 'http:localhost:9001/src'
      }
    },

    /**
    *
    * PROCESS HTML
    *
    */

    processhtml: {
      all: {
        files: {
          'dist/index.html': ['src/index.html']
        }
      }
    },

    /**
    *
    * REMOVE
    *
    */

    remove: {
      options: {
        trace: true
      },
      scripts: {
        dirList: ['dist/scripts'],
      },
      styles: {
        dirList: ['dist/styles'],
      },
      cleanup: {
        fileList: [
          'dist/build.js',
          'dist/build.min.js',
          'dist/all.css',
          'dist/all.min.css',
          'dist/styles/normalize-css.css',
          'dist/styles/bootstrap.css'
        ]
      }
    },

    /**
    *
    * UGLIFY
    *
    */

    uglify: {
      scripts: {
        files: {
          'dist/build.min.js': ['dist/build.js']
        }
      }
    },

    /**
    *
    * WATCH
    *
    */

    watch: {
      options: {
        livereload: true
      },
      src: {
        files: ['src/**'],
        tasks: [ /*setup tasks to run on watch */ ]
      },
      docs: {
        files: ['src/**'],
        tasks: [ /* tasks to run on watch */ ]
      }
    },

    /**
    *
    * YUIDOC
    *
    */

    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          themedir: 'docs/yuidoc-theme/tellart', 
          paths: 'src/',
          outdir: 'docs/'
        }
      }
    }

  });

   /**
    *
    * Load NPM Modules
    *
    */

  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
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
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-remove');


  /*
   * Registered Grunt Tasks
   */

  //development and distribution tasks
  grunt.registerTask('default', ['open', 'connect']);

  //TESTING CONFIG

  grunt.registerTask('tmp', 'Generates a new canvas sketch.', function() {
    var configJS = grunt.file.read('src/config.js');
    var config = eval(configJS);
    console.log(config());
  });

  /*
   *
   * GRUNT CLASS
   *
   *  - generate a new nexus sketch
   */

  grunt.registerTask('class', 'Generates a new nexus class.', function() {
    var classList = grunt.file.readJSON('src/classes.json')
      , inc        = 0
      , alpha      = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
      , newClass   = 'Class-' + grunt.template.today("yyyy-mm-dd");

    // classList.forEach(function(classes) {
    //   for(var prop in classes) {
    //     if(prop === 'default') {
    //       delete classes[prop];
    //     }
    //     if(prop == 'src' && classes[prop].search(newSketch) !== -1) {
    //       while(classes[prop].search(newSketch + '-' + alpha[inc]) !== -1) {
    //         inc++;
    //       }
    //     }
    //   }
    // });

    newClass += '-' + alpha[inc] + '.js';

    classList.push({
      'title'  : grunt.template.today("yyyy-mm-dd") + '-' + alpha[inc],
      'src'    : newClass,
      'default': 'true'
    });

    grunt.log.writeln("generating new canvas sketch");
    grunt.file.copy('src/templates/basic-class-amd.js', 'src/nexus-core/' + newClass);
    grunt.file.write('src/classes.json', JSON.stringify(classList, null, 2));

    grunt.task.run('exec:editClass:' + newClass);
  });

  /*
   *
   * GRUNT SKETCH
   *
   *  - generate a new nexus sketch
   */

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

  /*
   *
   * GRUNT NEXUS
   *
   *  - launches a given nexus number
   */

  G.registerTask('nexus', 'launches a nexus', function(num) {
    //G.task.run('exec:startServer'); //start server at localhost 9001
    G.task.run('exec:loadNexus:' + (num || '001'));
  });
};