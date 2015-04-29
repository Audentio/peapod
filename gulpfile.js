var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass');

// Scripts Task
// Lint, Concatenates, Uglifies
gulp.task('process-scripts', function(){
	gulp.src('./src/js/**/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('./build/js'));
});

// Styles Task
// Compiles Sass Files, Concatenates CSS Files, Minifies CSS File
gulp.task('process-styles', function(){
	gulp.src('./src/sass/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./build/css/'));
});

// Watch Task
// Watches Changes in JS Files
gulp.task('watch', function(){
	gulp.watch('./src/js/**/*.js', ['process-scripts']);
	gulp.watch('./src/sass/**/*.scss', ['process-styles'])
});

gulp.task('default', ['process-scripts', 'process-styles', 'watch']);
