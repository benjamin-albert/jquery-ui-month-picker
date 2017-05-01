'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    qunit: {
      all: ['test/test.html', 'test/.test-new-api.html']
    },

    uglify: {
      demo: {
        files: {
          'demo/MonthPicker.min.js': 'src/MonthPicker.js'
        }
      }
    },

    copy: {
      versions: {
        src: 'test/test.html',
        dest: 'test/.test-new-api.html',
        options: {
          process: function(content, srcpath) {
            return content.replace(/<!--.*Grunt.*\:.*inject-api-version.*-->/g, '<script>window.NEW_JQUERY_UI_API=true</script>');
          }
        }
      }
    },

    cssmin: {
      demo: {
        files: {
          'demo/MonthPicker.min.css': 'src/MonthPicker.css'
        }
      }
    },

    'gh-pages': {
      options: {
        base: 'demo',
        add: true
      },

      src: ['**']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy', 'test', 'uglify', 'cssmin']);
  grunt.registerTask('test', ['qunit']);
};
