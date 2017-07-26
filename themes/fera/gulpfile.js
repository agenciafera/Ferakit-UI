var gulp = require('gulp'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css');

// Error
function onError(err) {
  console.log(err);
  this.emit('end');
}

// Build
gulp.task('build', ['compass', 'styles', 'watch']);

// Default
gulp.task('default', ['build', 'watch']);

// Compass
gulp.task('compass', function() {
  gulp.src('assets/scss/*.scss')
    .pipe(compass({
      require: ['sass-globbing', 'compass/import-once/activate'],
      css: 'assets/css',
      font: 'assets/fonts',
      sass: 'assets/scss',
      image: 'assets/images',
      relative: true
    }))
    .on('error', onError)
})

// Styles
gulp.task('styles', function() {
  return gulp.src(['assets/css/**/*.css', '!assets/css/**/*.min.css'])
    .pipe(cleanCSS({
      compatibility: 'ie8',
      keepSpecialComments: 0})
    )
    .on('error', onError)
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(rename({
      suffix: ".min",
    }))
    .pipe(gulp.dest('assets/css'));
});

// Watch
gulp.task('watch', function() {
  gulp.watch('assets/scss/**/*.scss', ['compass'])
  gulp.watch(['assets/css/**/*.css', '!assets/css/**/*.min.css'], ['styles'])
});
