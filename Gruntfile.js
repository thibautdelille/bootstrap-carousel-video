module.exports = function(grunt) {

  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 3000,
          base: '.',
          keepalive: true
        }
      }
    },
    copy: {
      // Copy all ./assets/ folder to Jekyll folder
      bower: {
        files: [
          {
            expand: true,
            cwd: '.',
            src: ['/bower_components/bootstrap/dist/css/bootstap.min.css'],
            dest: 'src' }
        ]
      },
    }
  });

  grunt.registerTask('server', ['connect:server']);

  require('matchdep').filterDev('grunt-contrib*').forEach(grunt.loadNpmTasks);
}