var browserify = require('browserify')
var buffer = require('vinyl-buffer')
var glob = require('glob')
var gulp = require('gulp')
var gulpif = require('gulp-if')
var gutil = require('gulp-util')
var livereload = require('gulp-livereload')
var path = require('path')
var source = require('vinyl-source-stream')
var uglify = require('gulp-uglify')
var watchify = require('watchify')
var babelify = require('babelify')
// var reactify = require('reactify')

/*
 * Configue
 */
var src = 'app/scripts/*.js'
// var src_gmapi = 'app/scripts/gm-api/*.js'
var dest = 'dist/scripts'

/*
 * Watch
 */
function bundle (b, filename, development) {
  return b.bundle()

    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))

    // Gulpify
    .pipe(source(filename))

    // Uglify
    .pipe(gulpif(!development, buffer()))
    .pipe(gulpif(!development, uglify()))

    // Save
    .pipe(gulp.dest(dest))

    // Trigger livereload
    .pipe(gulpif(development, livereload()))
}

function browserifyEach (baseFilePath, development) {
  // Get the filename
  var filename = path.basename(baseFilePath)

  // Configure browserify
  var b = browserify({
    // Select bundle
    entries: './' + baseFilePath,

    // Enable Source Maps
    debug: development,

    // Needed for watchify
    cache: {},
    packageCache: {},
    fullPaths: development

  }).transform(babelify)

  if (development) {
    // Watch files
    b = watchify(b)

    // Rebundle on filechange
    b.on('update', function (file) {
      gutil.log(filename, 'changed')
      bundle(b, filename, development)
    })
  }

  // Add transforms here
  // b.transform(reactify)

  bundle(b, filename, development)
}

function buildBundles (src, development) {
  copyScripts()
  glob(src, function (err, files) {
    if (err) console.log(err)
    files.forEach(function (file) {
      browserifyEach(file, development)
    })
  })
}

function copyScripts () {
  return gulp.src([
    'node_modules/react/dist/react.js',
    'node_modules/react/dist/react.min.js',
    'node_modules/react-dom/dist/react-dom.js',
    'node_modules/react-dom/dist/react-dom.min.js'
  ]).pipe(gulp.dest(dest))
}

gulp.task('scripts', function () {
  buildBundles(src)
  // buildBundles(src_gmapi)
})

gulp.task('scripts:dev', function () {
  livereload.listen()
  buildBundles(src, true)
  // buildBundles(src_gmapi, true)
})
