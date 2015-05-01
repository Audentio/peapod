var gulp = require('gulp'),
	packageName = "peapod";

// Scripts Task
// Lint, Concatenates, Uglifies
gulp.task('processJs', function(){
	var uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
		del = require('del'),
		sourcemaps = require('gulp-sourcemaps')
		template = require('gulp-template'),
		jshint = require('gulp-jshint'),
		jsdoc = require("gulp-jsdoc"),
		jscs = require('gulp-jscs'),
		notify = require('gulp-notify'),
		plumber = require('gulp-plumber'),
		replace = require('gulp-replace'),
		gulpif = require('gulp-if'),
		buildPassed = true;


	//Empty the built JS
	del(['./build/js/**/*.js'], function (err, deletedFiles) {
	
	});

	var jsFiles = gulp.src(['src/js/init.js', 'src/js/util/*.js', 'src/js/components/*.js', 'src/js/main.js'])
			.pipe(plumber({errorHandler: function(){
				console.warn("JS Error in building jsFiles variable.")
				buildPassed = false;
			}}))
			.pipe(replace('$pp', packageName));

	//jsLint
	jsFiles.pipe(plumber({errorHandler: function(){
			console.warn("JS Error in jsLint.")
			buildPassed = false;
		}}))
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', { verbose: false }));

    //JSCS
    jsFiles.pipe(plumber({errorHandler: function(){
			console.warn("JS Error in JSCS.")
			buildPassed = false;
		}}))
    	.pipe(jscs({
    		configPath: 'gulp/.jscsrc'
    	}));

	//jsDoc
	var pkg = require('./../package.json'),
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
		.pipe(plumber({errorHandler: function(){
			console.warn("JS Error in building jsDoc.")
			buildPassed = false;
		}}))
		.pipe(replace('$pp', packageName))
		.pipe(template({pkg: pkg}))
		.pipe(jsdoc.parser())
    	.pipe(jsdoc.generator('docs/js', tpl, opts));

	//compressed js
	jsFiles.pipe(plumber({errorHandler: function(){
			console.warn("JS Error in building main.min.js .")
			buildPassed = false;
		}}))
		.pipe(sourcemaps.init())
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/js/'))
		.pipe(gulpif(buildPassed, notify({ title: 'JS Builder Passed', message: 'Successfully built javascript.' }), notify({ title: 'JS Builder Failed', message: 'Could not built javascript :(.' })));

});

// Watch Task for JS
gulp.task('watchJs', function(){
	gulp.watch('src/js/**/*.js', ['processJs']);
});

gulp.task('processScripts', ['processJs', 'watchJs'])