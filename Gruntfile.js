"use strict";

module.exports = function(grunt) {

  grunt.initConfig({
    vector2raster: {   // Task
      ios: {  // Target
        files:[
          {
            src: "tempsrc/icon.svg",   // Source
            dest: "temp/"
            // Destination basepath (+ image name when no options)
          }
        ],
        options:{   // Options
          dest:[    // Array of objects with dest image properties
            {
              name:"icon-40abced.png",   // name can have some pathinfo as well
              size:{width:40,height:40}   // or just 40 when the image is square
            }
          ]
        }
      }
    },
  });

  grunt.registerTask('makeimages', function() {
    var done = this.async();
    var makeImages = require('./build/js/makeimages');
    makeImages.makeImages().done(function(result) {
      console.log("result:", result);
      done();
    });
  });

  grunt.loadNpmTasks('grunt-vector2raster');

  grunt.registerTask('default', ['makeimages']);
};

