var gulp = require('gulp'),
  compass = require('gulp-compass'),
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
gulp.task('build', ['compass', 'watch']);

// Default
gulp.task('default', ['build', 'watch']);

// Compass
gulp.task('compass', function() {
  gulp.src('assets/scss/**/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'css',
      font: 'fonts',
      sass: 'scss',
      image: 'images'
    }))
    .on('error', onError)
})

// Watch
gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['compass'])
});
