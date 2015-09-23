var gulp = require('gulp'),
    plumber = require('gulp-plumber')
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    minify = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync');

//Styles Browser Support
var browserSupport = ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'];
var plumberConfig = {errorHandler: function(err){
  notify.onError({
    title:    "SASS",
    subtitle: "Compile failed!",
    message:  "Error: <%= error.message %>",
    sound:    "chord"
  })(err);
  this.emit('end');
}};

// Component Task
// Compiles component scss
gulp.task('processComponents', function(){
	gulp.src('components/components.scss')
	.pipe(sourcemaps.init())
	.pipe(plumber(plumberConfig))
	.pipe(sass({ style: 'expanded', precision: 8 }))
	.pipe(autoprefixer(browserSupport))
  .pipe(gulp.dest('components'))
	.pipe(rename({ suffix: '.min' }))
	.pipe(minify())
  .pipe(gulp.dest('components'))
  .pipe(browserSync.stream());
});

// Watch Task for components
gulp.task('watchComponents', function(){
  browserSync.init();
	gulp.watch('components/**/*.scss', ['processComponents']);
	gulp.watch(['components/**/*.html','components/**/*.js']).on('change', browserSync.reload);
});

gulp.task('components', ['processComponents', 'watchComponents'])