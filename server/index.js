// server/index.js
'use strict'
const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const passport = require('passport');
const config = require('./config');

// Setup logger
app.use(morgan('dev'))

// parsing
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

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

// connect to the database and load models
require('./models').connect(config.dbUri);





// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware to ensure token is valid
const authCheckMiddleware = require('./middleware/auth-check');
app.use('/trav', authCheckMiddleware);

// Login Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);





// api definitions
const api = require('./api')
app.get('/api', api.getTree)
app.post('/api/tree', api.persist)

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
  console.log(`App listening on port ${PORT}!`)
})
