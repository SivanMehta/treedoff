import React, { Component } from 'react'
import faker from 'faker';

import Statement from './statement'

function generate_fake_argument() {
  return {
    title: faker.company.catchPhrase(),
    text: faker.hacker.phrase(),
    confidence: Math.random(),
    source: faker.internet.url(),
    pros: [],
    cons: []
  }
}

function parsePath(path) {
  if(typeof path === "undefined") return []

  var result = path.split("|")
  result = result.map(dir => [dir.substr(0,4), dir.substr(4)])
  return result
}

export default class Tree extends Component {
  constructor(props) {
    super(props)

    // would be fetched from the api
    const defaultArgument = {
      title: "Apples are better than oranges",
      description: "alsjdflaskjhfljahflkjhalskjhflkasjhflkjashf",
      confidence: .923,
      source: "lol.not",
      pros: [1, 2, 3].map(_ =>  generate_fake_argument()),
      cons: [1, 2].map(_ =>  generate_fake_argument())
    }

    defaultArgument.pros[1].pros = [1, 2, 3].map(_ =>  generate_fake_argument())
    defaultArgument.pros[1].cons = [1, 2].map(_ =>  generate_fake_argument())

    // would be parsed from the path given by the router

    this.state = {
      tree: defaultArgument,
      // list of types (pro/con, index)
      path: parsePath(this.props.path)
    }
  }

  render() {
    // parse path and traverse tree accordingly
    console.log(parsePath(this.props.path))

    var currentStatement = this.state.tree
    for(var i = 0; i < this.state.path.length; i++) {

      const prop = this.state.path[i][0]
      const index = this.state.path[i][1]
      currentStatement = currentStatement[prop][index]
    }

    return (
      <Statement title={ currentStatement.title }
                 description={ currentStatement.description }
                 source={ currentStatement.source }
                 confidence={ currentStatement.confidence }
                 pros={ currentStatement.pros }
                 cons={ currentStatement.cons }/>

    )
  }
}