var gulp          = require('gulp'),
		fs						= require('fs'),
    plumber       = require('gulp-plumber'),
		template			= require('gulp-template'),
    sass          = require('gulp-sass'),
		babel					= require('gulp-babel'),
    notify        = require('gulp-notify'),
    minify        = require('gulp-minify-css'),
    autoprefixer  = require('gulp-autoprefixer'),
    sourcemaps    = require('gulp-sourcemaps'),
    browserSync   = require('browser-sync');
		
var package_json = JSON.parse(fs.readFileSync('./package.json'));
var packageInfo = {
	version: package_json.version,
	year: new Date().getFullYear(),
	licence: package_json.license
}

//Styles Browser Support
var browserSupport = ['> 1%', 'iOS >= 7', "Explorer >= 9" ,'last 2 versions', 'Firefox ESR', 'Opera 12.1'];

//Notification on build error
var plumber_SASS = {errorHandler: function(err){
  notify.onError({
    title:    'SASS',
    subtitle: "Compile failed!",
    message:  "Error: <%= error.message %>",
    sound:    "chord"
  })(err);
  this.emit('end');
}};
var plumber_JSX = {errorHandler: function(err){
  notify.onError({
    title:    'JSX',
    subtitle: "Compile failed!",
    message:  "Error: <%= error.message %>",
    sound:    "chord"
  })(err);
  this.emit('end');
}};


// Compiles component scss
// =======================
gulp.task('components.SASS', function(){
  
	gulp.src('src/components/**/*.scss')
	
  //Prevent errors from breaking watch process
  .pipe(plumber(plumber_SASS))
  
  //compile SASS
	.pipe(sass({ style: 'expanded', includePaths: ['src/sass'] }))
  
  //Autoprefixer
	.pipe(autoprefixer(browserSupport))
  
  .pipe(gulp.dest('build/components'))
  
  //BrowserSync injection
  .pipe(browserSync.stream());
});


// Copy HTML
// =====================
gulp.task('components.HTML', function(){
	gulp.src('src/components/**/*.html')
  .pipe(gulp.dest('build/components'));
});


// Compile Component JSX
// =====================
gulp.task('components.JSX', function(){
  
	gulp.src('src/components/**/*.jsx')
  
  //Prevent errors from breaking watch process
  .pipe(plumber(plumber_JSX))
	
	.pipe(template({'package': packageInfo}))
  
	//compile JSX
	.pipe(babel())
	
  .pipe(gulp.dest('build/components'));
});


// Watchman
// =========================
gulp.task('components.watch', function(){
  browserSync.init();

	gulp.watch('src/**/*.scss', ['components.SASS']);
  
	gulp.watch(['src/components/**/*.html'], ['components.HTML']);
  
	gulp.watch(['src/components/**/*.jsx'], ['components.JSX']);
  
  //Watch build directory
  //so browsersync doesn't reload before gulp operations
	gulp.watch(['build/components/**/*.js','build/components/**/*.html']).on('change', function(e){browserSync.reload()});
});

gulp.task('components', ['components.SASS', 'components.JSX', 'components.HTML', 'components.watch'])