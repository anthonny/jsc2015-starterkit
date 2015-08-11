module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: {
        src: ["target"]
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['reveal.js/**/*'], dest: 'target/'},
          {expand: true, cwd: 'src/', src: ['assets/**/*'], dest: 'target/'}
        ],
      },
    },
    watch: {
      options: {
        livereload: true
      },
      adoc: {
        files: ['src/**/*.adoc',],
        tasks: ['run:build']
      },
      assets: {
        files: ['src/assets/**/*',],
        tasks: ['copy']
      }
    },
    run: {
      options: {
        // Task-specific options go here.
      },
      build: {
        cmd: 'asciidoctor',
        args: [
          '-T',
          'asciidoctor-reveal.js/templates/slim',
          'src/index.adoc',
          '-o',
          'target/index.html'
        ]
      }
    },
    connect: {
      server: {
        options: {
          livereload: true,
          port: 1337,
          base: 'target'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'copy', 'run']);
  grunt.registerTask('serve', ['clean', 'copy', 'run', 'connect', 'watch']);

};
