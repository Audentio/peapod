// Load Packages
var gulp = require('gulp'),
	plumber = require('gulp-plumber')
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	minify = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	del = require('del'),
	sourcemaps = require('gulp-sourcemaps'),
	requireDir = require('require-dir');
	tasks = requireDir('./gulp');

// Browser Support
var browserSupport = {
	styles: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
	scripts: []
}

// Styles Task
// Compiles Sass Files, Concatenates CSS Files, Minifies CSS File
gulp.task('processStyles', function(){
	gulp.src('./src/sass/**/*.scss')
	.pipe(plumber())
	.pipe(sass({ style: 'expanded' }))
	.pipe(autoprefixer(browserSupport.styles))
	.pipe(rename({suffix: '.min'}))
	.pipe(minify())
	.pipe(gulp.dest('./build/css/'));
});

// Watch Task for CSS
gulp.task('watchStyles', function(){
	gulp.watch('src/sass/**/*.scss', ['process-styles'])
});

gulp.task('default', ['processSripts', 'processStyles', 'watchJs', 'watchCss']);
