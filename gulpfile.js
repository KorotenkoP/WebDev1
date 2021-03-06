//подключение плагина gulp:
var gulp = require('gulp');
var webserver = require('gulp-webserver-io'); //require('gulp-serverlivereload')
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');

gulp.task('default',['webserver'], function () {
    gulp.watch('site/**/*', ['build']);
    gulp.watch('site/sass/**/*.scss', ['sass']);
});

gulp.task('build', function () {
    return gulp.src('site/**/*')
           .pipe(gulp.dest('../public'));
});

gulp.task('webserver', ['build'], function() {
    gulp.src('../public')
    .pipe(webserver({
        livereload: true,
        open: true
    }));
});

//перемещение и сжатие картинок
gulp.task('images', function() {
    gulp.src('site/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('../public/images'))
});

//препроцессор css
gulp.task('sass', function () {
  return gulp.src('site/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('../public/css'));
});
