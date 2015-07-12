module.exports = function(grunt) {

  grunt.initConfig({
    autoprefixer: {
      build: {
        options: {
          browsers: ['last 2 versions', '> 1%']
        },
        files: [
          {
            src : ['src/css/*.sass.css'],
            ext : '.css',
            expand : true
          }
        ]
      }
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },
    /*
    * https://github.com/gruntjs/grunt-contrib-sass
    * description: compile sass to css
    */
    sass: {
      build: {
        files : [
          {
            src : ['*.scss', '!_*.scss'],
            cwd : 'src/scss',
            dest : 'src/css/',
            ext : '.sass.css',
            expand : true
          }
        ],
        options : {
          style : 'expanded'
        }
      }
    },
    watch: {
      scss: {
        files: ['src/scss/*.scss'],
        tasks: ['css']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '*.html',
          'src/css/{,*/}*.css',
          'src/js/{,*/}*.js'
        ]
      }
    }
  });


  grunt.registerTask('server', ['connect', 'watch']);
  grunt.registerTask('css', ['sass', 'autoprefixer']);

  grunt.registerTask('s', ['server']);
  grunt.registerTask('default', ['css']);

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  require('matchdep').filterDev('grunt-contrib*').forEach(grunt.loadNpmTasks);
}