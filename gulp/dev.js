const express = require('express')
const gulp = require('gulp')
const path = require('path')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

module.exports = function serve(config) {
  gulp.task('dev', done => {
    const wpConfig = require('../webpack.config.js')
    const compiler = webpack(wpConfig)

    new webpackDevServer(compiler, {
      publicPath: wpConfig.output.publicPath,
      stats: {
        colors: true,
      },
      // outputs nothing
      // quiet: false,
      // suppress boring information
      noInfo: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
      },
      hot: true,
      historyApiFallback: true,
    })
    .listen(config.port, 'localhost', e => {
      if (e) return console.log(e)
      console.log(`
        serving app on port ${config.port}
      `)
      done()
    })
  })

  gulp.task('serve:dist', done => {
    const app = express()

    app.use(express.static(path.join(__dirname, '..', 'build')))

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
    })

    app.listen(config.port, 'localhost', e => {
      if (e) return console.log(e)
      console.log(`
        serving app on port ${config.port}
      `)
      done()
    })
  })
}
