var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	del = require('del'),
	sourcemaps = require('gulp-sourcemaps'),
	requireDir = require('require-dir');
	tasks = requireDir('./gulp');



// Styles Task
// Compiles Sass Files, Concatenates CSS Files, Minifies CSS File
gulp.task('process-styles', function(){
	gulp.src('./src/sass/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./build/css/'));
});

// Watch Task for CSS
gulp.task('watchCss', function(){
	gulp.watch('src/sass/**/*.scss', ['process-styles'])
});

gulp.task('default', ['process-scripts', 'process-styles', 'watchJs', 'watchCss']);
