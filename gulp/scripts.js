var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
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
	colors = require('colors');
	packageName = "peapod",
	debugMode = true;

plumberError = function(label){
	return {
		errorHandler: function(msg){
			console.log(msg.message);
			console.log(label.toString().red.bold.underline);
			notify({ title: 'JS Builder Failed', message: 'Could not built javascript :(. ' + label })
		}
	}
}

// Scripts Task
// Lint, Concatenates, Uglifies
gulp.task('processJs', function(){
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

	//Empty the built JS
	del(['./build/js/**/*.js'], function (err, deletedFiles) {
		
	});

	gulp.src(['src/js/init.js', 'src/js/util/*.js', 'src/js/components/*.js', 'src/js/main.js'])
		.pipe(plumber(plumberError("JS Error building jsFiles variable.")))
		.pipe(replace('$pp', packageName))
		.pipe(plumber.stop())
		.pipe(plumber(plumberError("JS Error in jsLint."))) // jsLint
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', { verbose: false }))
		.pipe(plumber.stop())
		.pipe(plumber(plumberError("JS Error in JSCS."))) // JSCS
    	.pipe(jscs({
    		configPath: 'gulp/.jscsrc'
    	}))
    	.pipe(plumber.stop())
		.pipe(plumber(plumberError("JS Error in building main.min.js ."))) // output compressed js files
		.pipe(gulpif(debugMode, sourcemaps.init()))
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulpif(debugMode, sourcemaps.write()))
		.pipe(gulp.dest('build/js/'))
		.pipe(plumber.stop())
		.pipe(plumber(plumberError("JS Error in jsDoc."))) // jsDoc
		.pipe(template({pkg: pkg}))
		.pipe(jsdoc.parser())
		//.pipe(notify({ title: 'JS Builder Passed', message: 'Successfully built javascript.' }))
    	.pipe(jsdoc.generator('docs/js', tpl, opts));

    gulp.src(['src/js/init.js', 'src/js/util/*.js', 'src/js/components/*.js', 'src/js/main.js'])
		.pipe(replace('$pp', packageName))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('build/js/'));


});

// Watch Task for JS
gulp.task('watchJs', function(){
	gulp.watch('src/js/**/*.js', ['processJs']);
});

gulp.task('scripts', ['processJs', 'watchJs'])