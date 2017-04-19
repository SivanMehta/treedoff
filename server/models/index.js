const mongoose = require('mongoose')
const config = require('../config')

module.exports.init = (app, done) => {
  mongoose.connect(config.dbUri)

  mongoose.Promise = global.Promise

  mongoose.connection.on('error', (err) => {
    app.log.error(`Mongoose connection error: ${err}`)
    process.exit(1)
  })

  app.log.info(`Connected to MongoDB at ${config.dbUri}`)

  // load User model
  require('./users')
  done()
}
