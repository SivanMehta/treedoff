const express = require('express')
const app = express()
const async = require('async')

const initializers = [
  // logger
  './initializers/logger',

  // parsing HTTP request
  './initializers/body-parser',

  // connect to database and load models
  './models',

  // passport usage
  './passport',

  // authorization middleware and routes
  './auth',

  // api definitions
  './api',

  // Serving static assets
  './initializers/static-assets.js'

].map(filename => done => require(filename).init(app, done))

// Now that all of the initializers are defined, actually run them.
// When they're done, start the application.
async.waterfall(initializers, (err) => {
  if(err) {
    throw err
  }

  module.exports = app
  const PORT = process.env.PORT || 9000

  app.listen(PORT, () => {
    app.log.info(`App listening on port ${PORT}!`)
  })
})
