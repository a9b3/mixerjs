const config = {}

config.dev = {
  debug : true,
}

config.production = {
  debug : false,
}

module.exports = config[process.env.NODE_ENV] || config.dev
