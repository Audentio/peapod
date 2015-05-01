// Load Packages
var gulp = require('gulp'),
	requireDir = require('require-dir');
	tasks = requireDir('./gulp');


gulp.task('default', ['scripts', 'styles']);