const gulp = require('gulp')
const path = require('path')
const swPrecache = require('sw-precache')

module.exports = function misc(config) {
  gulp.task('clean', done => {
    const del = require('del')

    del([
      config.dist,
    ], {
      force: true,
    })
    .then(() => {
      done()
    })
  })

  gulp.task('others', () => {
    return gulp.src([
      `!${config.src}/**/*.html`,
      `!${config.src}/**/*.js`,
      `!${config.src}/**/*.jsx`,
      `!${config.src}/**/*.scss`,
      `!${config.src}/**/*.css`,
      `${config.src}/**/*.*`,
    ])
    .pipe(gulp.dest(config.dist))
  })

  gulp.task('move:index', () => {
    return gulp.src([
      `${config.src}/index.html`,
    ])
    .pipe(gulp.dest(config.dist))
  })

  gulp.task('generate-service-worker', done => {
    swPrecache.write(path.join(config.dist, 'service-worker.js'), {
      staticFileGlobs: [ `${config.dist}/**/*.{js,html,css,png,jpg,gif}` ],
      stripPrefix: config.dist,
    }, done)
  })
}
