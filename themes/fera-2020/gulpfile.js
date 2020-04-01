const
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  sassGlob = require('gulp-sass-glob'),
  cssImageDimensions = require('gulp-css-image-dimensions'),
  imagemin = require('gulp-imagemin'),
  gulpif = require('gulp-if'),
  watch = require('gulp-watch'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify-es').default,
  theme = 'assets/';

var path = {
  css: theme + "css",
  js: theme + "js",
  scss: theme + "scss",
  images: theme + "images",
  fonts: theme + "fonts",
  coffee: theme + "coffee",
};


// Error
function onError(err){
  console.log(err);
  this.emit('end');
}

//compila o scss
gulp.task('sass', (done) => {
  gulp.src(path.scss + '/**/*.scss')
    .on('error', onError)
    .pipe(sassGlob())
    .pipe(sass())
    .on('error', onError)
    .pipe(cssImageDimensions('../images'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(autoprefixer())
    .on('error', onError)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulp.dest(path.css))
    done();
})

//junta tudo que foi compilado com os vendors
gulp.task('styles', (done) => {
  return gulp.src([
      '../../node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
      '../../node_modules/owl.carousel/dist/assets/owl.theme.default.min.css',
      '../../node_modules/font-awesome/css/font-awesome.min.css',
      theme + 'css/fera-components/styles.css',
      theme + 'css/app/styles.css'
    ])
    .on('error', onError)
    .pipe(concat('app.min.css'))
    .pipe(postcss(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })))
    .pipe(gulp.dest(theme + '/css'))
    done();
});

// Scripts
gulp.task('scripts', (done) => {
  return gulp.src([
    '../../node_modules/jquery/dist/jquery.min.js',
    '../../node_modules/owl.carousel/dist/owl.carousel.min.js',
    theme + 'js/ferakit.general.js'
    ])
    .pipe(concat('app.min.js', {
      outSourceMap: true
    }))
    .pipe(uglify())
    .on('error', onError)
    .pipe(gulp.dest(theme + 'js'))
    done();
});

gulp.task('watch', () => {
  gulp.watch(path.scss + '/**/*.scss', gulp.series('sass', 'styles'))
  gulp.watch(path.css + '/**/*.css', )
  gulp.watch([path.js + '/**/*.js', '!' + path.js + '/**/*.min.js'], gulp.parallel('scripts'))
});

// Then subsequent tasks can be asynchronous in executing
gulp.task('serve', gulp.series('sass', 'styles', 'scripts', 'watch'));

// attach a default task, so when when just <code>gulp</code> the thing runs
gulp.task('default', gulp.series('serve'));