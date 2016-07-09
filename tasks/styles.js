var gulp = require('gulp')
var less = require('gulp-less')
var watch = require('gulp-watch')
var sourcemaps = require('gulp-sourcemaps')
var LessPluginCleanCSS = require('less-plugin-clean-css')
var LessPluginAutoPrefix = require('less-plugin-autoprefix')
var livereload = require('gulp-livereload')

/***********************************************************
 * Configue
 ***********************************************************/
var src = [
  'app/styles/**/*.less'
]
var dest = 'dist/styles'

var cleancss = new LessPluginCleanCSS({
  advanced: true
})

var autoprefix = new LessPluginAutoPrefix({
  browsers: ['last 2 versions']
})

/***********************************************************
 * Build
 ***********************************************************/
gulp.task('styles', function () {
  copyStyles()
  return gulp.src(src)
    .pipe(less({
      plugins: [autoprefix, cleancss]
    }))
    .pipe(gulp.dest(dest))
})

function copyStyles () {
  return gulp.src([
    'node_modules/material-design-lite/material.min.css'
  ])
    .pipe(gulp.dest(dest))
}

/***********************************************************
 * Watch
 ***********************************************************/
gulp.task('styles:dev', function () {
  livereload.listen()
  return gulp.src(src)
    .pipe(watch(src))
    // .pipe(sourcemaps.init())
    .pipe(less({
      plugins: [autoprefix]
    }))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest))
    // Livereload
    .pipe(livereload())
})
