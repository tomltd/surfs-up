module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'css/style.css': 'css/style.scss'
        }
      }
    },
    postcss: {
      options: {
        map: true, // inline sourcemaps

        // or
        map: {
            inline: false, // save all sourcemaps as separate files...
            annotation: 'dist/css/maps/' // ...to the specified directory
        },

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'css/*.css'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'postcss']);
  grunt.registerTask('css', ['sass', 'postcss']);
};
