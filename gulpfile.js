const gulp = require('gulp')
const runSequence = require('run-sequence')
require('require-dir')('./tasks')

gulp.task('build', function (callback) {
  runSequence(
    'clean', [
      'fonts',
      'html',
      'images',
      'locales',
      'manifest',
      'scripts',
      'styles'
    ],
    'package',
    callback)
})

gulp.task('release', function (callback) {
  runSequence(
    'manifest:incBuildNo',
    'build',
    callback)
})

gulp.task('watch', function (callback) {
  runSequence(
    [
      'clean'
    ], [
      'fonts:dev',
      'html:dev',
      'images:dev',
      'locales:dev',
      'manifest:dev',
      'scripts:dev',
      'styles:dev'
    ],
    callback)
})

gulp.task('default', [
  'build'
])
