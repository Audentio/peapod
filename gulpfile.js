var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	del = require('del'),
	sourcemaps = require('gulp-sourcemaps');

// Scripts Task
// Lint, Concatenates, Uglifies
gulp.task('process-scripts', function(){
	var uglify = require('gulp-uglify'),
		template = require('gulp-template'),
		jshint = require('gulp-jshint'),
		jsdoc = require("gulp-jsdoc");


	//Empty the built JS
	del(['./build/js/**/*.js'], function (err, deletedFiles) {
	
	});

	var jsFiles = gulp.src(['src/js/init.js', 'src/js/util/*.js', 'src/js/components/*.js', 'src/js/main.js']);

	//jsLint
	jsFiles.pipe(jshint())
		.pipe(jshint.reporter('default', { verbose: true }));

	//jsDoc
	var pkg = require('./package.json'),
		opts = {
		    'private': true,
		    monospaceLinks: true,
		    cleverLinks: true,
		    outputSourceFiles: true
		},
		tpl = {
		    path: 'ink-docstrap',
		    systemName      : pkg.name,
		    footer          : 'Pea Pod Documentation',
		    copyright       : 'Copyright Audentio Design 2015',
		    navType         : 'inline',
		    theme           : 'flatly',
		    linenums        : true,
		    collapseSymbols : true,
		    inverseNav      : true
		};
	gulp.src(['src/js/**/*.js', 'README.md'])
		.pipe(template({pkg: pkg}))
		.pipe(jsdoc.parser())
    	.pipe(jsdoc.generator('docs/js', tpl, opts));

	//uncompressed js
	jsFiles.pipe(sourcemaps.init())
		.pipe(concat('main.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/js/'));

	//compressed js
	jsFiles.pipe(sourcemaps.init())
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/js/'));

});

// Styles Task
// Compiles Sass Files, Concatenates CSS Files, Minifies CSS File
gulp.task('process-styles', function(){
	gulp.src('./src/sass/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./build/css/'));
});

// Watch Task for JS
gulp.task('watchJs', function(){
	gulp.watch('src/js/**/*.js', ['process-scripts']);
});

// Watch Task for CSS
gulp.task('watchCss', function(){
	gulp.watch('src/sass/**/*.scss', ['process-styles'])
});

gulp.task('default', ['process-scripts', 'process-styles', 'watchJs', 'watchCss']);
