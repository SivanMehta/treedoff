// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const faker = require('faker');

function generate_fake_argument() {
  return {
    title: faker.company.catchPhrase(),
    description: faker.hacker.phrase(),
    confidence: Math.random(),
    source: faker.internet.url(),
    pros: [],
    cons: []
  }
}

const defaultArgument = {
  title: faker.company.catchPhrase(),
  description: faker.hacker.phrase(),
  confidence: Math.random(),
  source: faker.internet.url(),
  pros: "a".repeat(3).split('a').map(_ =>  generate_fake_argument()),
  cons: "a".repeat(2).split('a').map(_ =>  generate_fake_argument())
};

defaultArgument.pros[1].pros = [1, 2, 3].map(_ =>  generate_fake_argument());
defaultArgument.pros[1].cons = [1, 2].map(_ =>  generate_fake_argument());

jsonArg = JSON.stringify(defaultArgument);

// Setup logger
app.use(morgan('dev'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/api', function (req, res) {
    res.send(jsonArg)
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
