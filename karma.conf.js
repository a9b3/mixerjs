process.env.NODE_ENV = 'test'
// set this is travis yaml env var
const isTravis = process.env.CONTINUOUS_INTEGRATION
const webpackConfig = require('./webpack.config.js')

module.exports = function(config) {
  config.set({
    // default is 9876
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: [
      isTravis ? 'PhantomJS' : 'Chrome',
    ],
    singleRun: false,
    frameworks: [
      'mocha',
    ],
    files: [
      {
        pattern: './!(node_modules|build)/**/*.spec.js?(x)',
        // uncomment if you dont want to watch
        // watched: false,
        included: true,
        served: true,
      },
    ],
    preprocessors: {
      './!(node_modules|build)/**/*.spec.js?(x)': [
        'webpack',
        'sourcemap',
      ],
    },
    reporters: [
      'dots',
      'mocha',
    ],
    webpack: Object.assign({}, webpackConfig, {
      // required by enzyme
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
      },
    }),
    webpackServer: {
      noInfo: true,
    },
  })
}
