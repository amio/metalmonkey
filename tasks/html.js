var gulp = require('gulp')
var watch = require('gulp-watch')
var livereload = require('gulp-livereload')

/***********************************************************
 * Configue
 ***********************************************************/
var src = 'app/*.html'
var dest = 'dist'

/***********************************************************
 * Build
 ***********************************************************/
gulp.task('html', function () {
  return gulp.src(src)
    .pipe(gulp.dest(dest))
})

/***********************************************************
 * Watch
 ***********************************************************/
gulp.task('html:dev', function () {
  livereload.listen()
  return gulp.src(src)
    .pipe(watch(src))
    .pipe(gulp.dest(dest))
    .pipe(livereload())
})
