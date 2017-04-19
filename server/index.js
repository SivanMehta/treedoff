const express = require('express')
const app = express()
const path = require('path')
const passport = require('passport')
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
  './api'

].map(filename => done => require(filename).init(app, done))

async.waterfall(initializers, (err, _) => {

  // Serve static assets
  app.use(express.static(path.resolve(__dirname, '..', 'public')))

  // check for react files
  const fs = require('fs')
  fs.access(path.resolve(__dirname, '..', 'public', 'build'), fs.constants.F_OK | fs.constants.R_OK, (err) => {
    if(err) {
      const suggestion = " --> The React.js application was probably not built"
      throw err + suggestion
    }
  })

  // D3 vis routes
  app.get('/d3', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'd3.html'))
  })

  // Always return the main index.html, so react-router render the route in the client
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
  })

  module.exports = app


  const PORT = process.env.PORT || 9000

  app.listen(PORT, () => {
    app.log.info(`App listening on port ${PORT}!`)
  })

})
