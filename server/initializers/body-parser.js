exports.init = (app, done) => {
  const bodyParser = require('body-parser')
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.log.info('Now parsing body of incoming HTTP into JSON')

  done(null)
}
