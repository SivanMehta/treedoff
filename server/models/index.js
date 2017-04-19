const mongoose = require('mongoose')
const config = require('../config')

module.exports.init = (app, done) => {
  mongoose.connect(config.dbUri, (err) => {
    if (err) {
      app.log.error(`Mongoose connection error: ${err}`)
      return done(err)
    }
    mongoose.Promise = global.Promise

    app.log.info(`Connected to MongoDB at ${config.dbUri}`)

    // load User model
    require('./users')
    done(null)
  })
}
