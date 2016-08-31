const $ = require('gulp-load-plugins')()
const gulp = require('gulp')
const webpack = require('webpack')

module.exports = function build() {
  gulp.task('webpack-build', done => {
    process.env.NODE_ENV = 'production'
    const wpConfig = require('../webpack.config.js')

    webpack(wpConfig, (e, stats) => {
      if (e) throw new $.util.PluginError('webpack', e)
      $.util.log('[webpack]', stats.toString())
      done()
    })
  })
}
