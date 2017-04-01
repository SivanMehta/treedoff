import React, { Component } from 'react'
import faker from 'faker'

// Material UI
import AppBar from 'material-ui/AppBar'

// custom components
import Statement from './statement'
import History from './history'

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
      path: []
    }

    this.advancePath = this.advancePath.bind(this)
    this.regressPath = this.regressPath.bind(this)
  }

  advancePath(pro, index) {
    this.setState({
      path: this.state.path.concat((pro ? "pros" : "cons") + index)
    })
  }

  regressPath(amt) {
    this.setState({
      path: this.state.path.slice(0, amt)
    })
  }

  render() {
    // parse path and traverse tree accordingly

    var currentStatement = this.state.tree
    for(var i = 0; i < this.state.path.length; i++) {

      const prop = this.state.path[i].substr(0, 4)
      const index = this.state.path[i].substr(4)
      currentStatement = currentStatement[prop][index]
    }

    return (
      <div>
        <AppBar title="Treedoff" iconElementLeft={ <History data={ this.state } regress={ this.regressPath }/> } />
        <Statement title={ currentStatement.title }
          description={ currentStatement.description }
          source={ currentStatement.source }
          confidence={ currentStatement.confidence }
          pros={ currentStatement.pros }
          cons={ currentStatement.cons }
          modifyPath={ this.advancePath }/>
      </div>

    )
  }
}
