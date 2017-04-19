const path = require('path')
const fs = require('fs')
const express = require('express')

exports.init = (app, done) => {
  // Serve static assets
  app.use(express.static(path.resolve(__dirname, '..', '..', 'public')))

  // check for react files
  fs.access(path.resolve(__dirname, '..', '..', 'public', 'build'), fs.constants.F_OK | fs.constants.R_OK, (err) => {
    if (err) {
      app.log.error('The React application was not built')
      return done(err)
    }
    // D3 vis routes
    app.get('/d3', (req, res) => {
      res.sendFile(path.resolve(__dirname, '..', 'd3.html'))
    })

    // Always return the main index.html, so react-router render the route in the client
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'))
    })

    app.log.info('Static assets, including the React app, are available')
    done(null)
  })
}
