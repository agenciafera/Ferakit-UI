var gulp = require('gulp'),
  compass = require('gulp-compass'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css');

// Error
function onError(err) {
  console.log(err);
  this.emit('end');
}

// Buld
gulp.task('build', ['compass', 'styles', 'watch']);

// Default
gulp.task('default', ['build', 'watch']);

// Compass
gulp.task('compass', function() {
  gulp.src('scss/**/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'css',
      font: 'fonts',
      sass: 'scss',
      image: 'images'
    }))
    .on('error', onError)
})

// Styles
gulp.task('styles', function() {
  return gulp.src('css/**/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8',
      keepSpecialComments: 0})
    )
    .on('error', onError)
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css'));
});

// Watch
gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['compass'])
  gulp.watch(['css/**/*.css', '!' + 'css/fera-components.css'], ['styles'])
});
