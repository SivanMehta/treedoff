const express = require('express')
const app = express()
const async = require('async')

// setup initializers
const initializers = [
  // logger
  './initializers/logger',

  // parsing HTTP request
  './initializers/body-parser',

  // connect to database and load models
  './models',

  // passport
  './passport',

  // authorization middleware and routes
  './auth',

  // api definitions
  './api',

  // Serve static assets
  './initializers/static-assets.js'
  
].map(filename => done => require(filename).init(app, done))

async.waterfall(initializers, (err) => {
  module.exports = app
  const PORT = process.env.PORT || 9000

  app.listen(PORT, () => {
    app.log.info(`App listening on port ${PORT}!`)
  })
})
