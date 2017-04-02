import React, { Component } from 'react'
import faker from 'faker'

// Material UI
import AppBar from 'material-ui/AppBar'

// custom components
import Statement from './statement'
import History from './history'

function generate_fake_argument(title, amt) {
  return {
    title: title ? title : faker.company.catchPhrase() ,
    description: faker.hacker.phrase(),
    confidence: amt ? amt : Math.random(),
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
      title: "Waiting for server response...",
      description: "Patience, young padawan",
      confidence: .999,
      source: "lol.not",
      pros: [],
      cons: []
    }

    // defaultArgument.pros[1].pros = [1, 2, 3].map(_ =>  generate_fake_argument())
    // defaultArgument.pros[1].cons = [1, 2].map(_ =>  generate_fake_argument())

    // would be parsed from the path given by the router
    this.state = {
      tree: defaultArgument,
      // list of types (pro/con, index)
      path: []
    }
  }

  componentDidMount() {
    fetch("/api")
      .then(res => res.json())
      .then(data => this.setState({tree: data}))
  }

  advancePath = (pro, index) => {
    this.setState({
      path: this.state.path.concat((pro ? "pros" : "cons") + index)
    })
  }

  regressPath = (amt) => {
    this.setState({
      path: this.state.path.slice(0, amt)
    })
  }

  setConfidence = (confidence) => {
    let copiedTree = Object.assign({}, this.state.tree)

    var currentStatement = copiedTree
    for(var i = 0; i < this.state.path.length; i++) {

      const prop = this.state.path[i].substr(0, 4)
      const index = this.state.path[i].substr(4)
      currentStatement = currentStatement[prop][index]
    }
    currentStatement.confidence = confidence
    this.setState({tree: copiedTree})
  }

  addStatement = (pro, statement) => {
    let copiedTree = Object.assign({}, this.state.tree)

    var currentStatement = copiedTree
    for(var i = 0; i < this.state.path.length; i++) {

      const prop = this.state.path[i].substr(0, 4)
      const index = this.state.path[i].substr(4)
      currentStatement = currentStatement[prop][index]
    }
    currentStatement[pro ? "pros" : "cons"] = currentStatement[pro ? "pros" : "cons"]
      .concat(generate_fake_argument(statement, .01))
    this.setState({tree: copiedTree})
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
          modifyPath={ this.advancePath }
          setConfidence={ this.setConfidence }
          addStatement={ this.addStatement }/>
      </div>

    )
  }
}
