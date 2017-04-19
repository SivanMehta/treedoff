

module.exports = [
  // logger
  './logger',
  // parsing HTTP request
  './body-parser'
].map(filename => done => require(filename).init(app, done))
