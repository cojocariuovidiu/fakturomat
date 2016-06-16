module.exports = function(grunt){
   grunt.initConfig({
      concat: {
         js: {
            src: ['public/lib/angular/angular.js',
                  'public/lib/angular-resource/angular-resource.js',
                  'public/lib/angular-route/angular-route.js',
                  'public/lib/angular-animate/angular-animate.js',
                  'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                  'public/lib/angular-cookies/angular-cookies.js',
                  'public/lib/angular-uuid-service/angular-uuid-service.js',
                  'public/application.js', 
                  'public/!(lib)/*.js', 
                  'public/!(lib)/**/**/*.js'],
            dest: 'public/app.concat.js'
         },
         css: {
            src: ['public/!(lib)/**/css/*.css'],
            dest: 'public/css/style.concat.css'
         }
      },
      uglify: {
         dist: {
            src: 'public/app.concat.js',
            dest: 'public/app.min.js'
         }
      },
      watch: {
         files: [ 'public/application.js', 
                  'public/!(lib)/**/*.js', 
                  'public/!(lib)/**/**/*.js', 
                  'public/!(lib)/**/*.js',
                  'public/!(lib)/**/css/*.css'],
         tasks: ['concat', 'uglify']
      }
   });
   
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-watch');

   grunt.registerTask('default', ['concat', 'uglify']);
}

