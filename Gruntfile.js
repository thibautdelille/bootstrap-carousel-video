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
    }
  });

  grunt.registerTask('server', ['connect:server']);
  grunt.registerTask('s', ['server']);

  require('matchdep').filterDev('grunt-contrib*').forEach(grunt.loadNpmTasks);
}