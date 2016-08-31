const $ = require('gulp-load-plugins')()
const gulp = require('gulp')

module.exports = function lint() {
  gulp.task('lint:js', () => {
    return gulp.src([
      `!node_modules/**/*`,
      `!build/**/*`,
      `**/*.js`,
    ])
    .pipe($.gitmodified([ 'added', 'modified' ]))
    .pipe($.eslint(require('../.eslintrc.js')))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError())
  })
}
