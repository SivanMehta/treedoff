const faker = require('faker')
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

// "database"
var database = {
  title: "Apples > Oranges",
  description: "We aim to tackle this age-old question through the use of Treedoff",
  confidence: Math.random(),
  source: faker.internet.url(),
  pros: "a".repeat(5).split('a').map(_ =>  generate_fake_argument()),
  cons: "a".repeat(5).split('a').map(_ =>  generate_fake_argument())
}

database.pros[0].pros = [1, 2, 3].map(_ =>  generate_fake_argument())
database.pros[0].cons = [1, 2].map(_ =>  generate_fake_argument())
database.pros[0].pros[0] = [1, 2, 3].map(_ =>  generate_fake_argument())

function persist(req, res) {
  // literally just replace it for know
  database = Object.assign({}, req.body)
  res.sendStatus(200)

  // console.log(JSON.stringify(database))
}

function getTree(req, res) {
  res.send(database)
}

module.exports = {
  getTree,
  persist
}
