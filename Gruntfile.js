module.exports = function(grunt) {

grunt.initConfig({
    clean: {
        css: {
            src: 'public/stylesheets/style.css'
        }
    },
    less: {
        dev: {
            files: {
                'public/stylesheets/style.css': 'public/stylesheets/style.less'
            }
        }
    },
    watch: {
        less: {
            files: ['public/stylesheets/**/*.less'],
            tasks: ['less']
        }
    }
});

grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.registerTask('buildcss', [
    'clean:css',
    'less:dev',
    'watch:less'
]);

};

