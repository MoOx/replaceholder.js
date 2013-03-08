module.exports = function(grunt) {

	// Imports
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-casper');
	grunt.loadNpmTasks('grunt-notify');

	grunt.option('env', typeof grunt.option('env') !== 'undefined' ? grunt.option('env') : 'dev');

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			files: [
				'*.js',
				'*.json',
				'tests/**/*.js'
			]
		},

		casper: {
			options: {
				test: true,
				'fail-fast': true,
				'log-level': 'info'
			},
			unit: {
				files: {
					'xunit/unit-results.xml' : ['tests/unit.js']
				}
			},
			functional: {
				files: {
					'xunit/functional-results.xml' : ['tests/functional/*.js']
				}
			}
		}
	});

	grunt.registerTask('test', ['jshint', 'casper']);
	grunt.registerTask('default', ['test']);
};
