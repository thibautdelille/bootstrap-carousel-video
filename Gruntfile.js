module.exports = function(grunt) {

  grunt.initConfig({

  });
  
  require('matchdep').filterDev('grunt-contrib*').forEach(grunt.loadNpmTasks);
}