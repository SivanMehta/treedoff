exports.init = (app, done) => {
  // pass the authentication checker middleware to ensure token is valid
  app.authCheckMiddleware = require('./middleware')

  // Login and Signup Routes
  app.use('/auth', require('./routes'))

  app.log.info('Initialized auth middleware and routes')

  done()
}
