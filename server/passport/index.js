const passport = require('passport')
const path = require('path')

exports.init = (app, done) => {
  app.use(passport.initialize())

  // load passport strategies
  const localSignupStrategy = require('./local-signup')
  const localLoginStrategy = require('./local-login')
  passport.use('local-signup', localSignupStrategy)
  passport.use('local-login', localLoginStrategy)

  app.log.info('Initialized Passport')

  done()
}
