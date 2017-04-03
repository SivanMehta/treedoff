// server/index.js
'use strict';
const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')

// Setup logger
app.use(morgan('dev'));

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
});

// api definitions
const api = require('./api');
app.get('/api', api.getTree);
app.post('/api/tree', api.persist);
app.get('/d3', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'd3.html'));
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;


const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
