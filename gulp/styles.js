var gulp = require('gulp'),
	plumber = require('gulp-plumber')
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	minify = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps');

//Styles Browser Support
var browserSupport = ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'];

// Styles Task
// Compiles Sass Files, Concatenates CSS Files, Minifies CSS File
gulp.task('processStyles', function(){
	gulp.src('./src/sass/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(plumber())
	.pipe(sass({ style: 'expanded' }))
	.pipe(autoprefixer(browserSupport.styles))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./build/css/'))
	.pipe(rename({ suffix: '.min' }))
	.pipe(minify())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./build/css/'));
});

// Watch Task for CSS
gulp.task('watchStyles', function(){
	gulp.watch('src/sass/**/*.scss', ['processStyles'])
});

gulp.task('styles', ['processStyles', 'watchStyles'])