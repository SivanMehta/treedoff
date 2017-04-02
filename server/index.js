// server/index.js
'use strict';
const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')

// Setup logger
app.use(morgan('dev'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')))

// api definition
const api = require('./api')

app.get('/api', function (req, res) {
    res.send(api.defaultArgument)
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;


const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
