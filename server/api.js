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

module.exports = {
  defaultArgument
}
