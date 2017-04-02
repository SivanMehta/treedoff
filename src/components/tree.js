import React, { Component } from 'react'
import faker from 'faker'

// Material UI
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

// custom components
import Statement from './statement'
import History from './history'

function generate_fake_argument(title, amt) {
  return {
    title: title ? title : faker.company.catchPhrase() ,
    description: faker.hacker.phrase(),
    confidence: amt ? amt : Math.random(),
    source: "",
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

    this.state = {
      // the argument that we're representing
      tree: defaultArgument,
      // list of types (pro/con, index)
      path: [],
      // loading icon indication
      loading: false
    }
  }

  componentDidMount() {
    fetch("/api")
      .then(res => res.json())
      .then(data => this.setState({tree: data}))
      .catch(() => console.log("Could not fetch data =("));
  }

  // https://www.youtube.com/watch?v=1LI81cWh3Fs
  saveTree = () => {
    fetch('/api/tree', {
      credentials: 'same-origin',
      body: JSON.stringify(this.state.tree),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => console.log(res.status))
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

  setDescription = (data) => {
    let copiedTree = Object.assign({}, this.state.tree)

    var currentStatement = copiedTree
    for(var i = 0; i < this.state.path.length; i++) {

      const prop = this.state.path[i].substr(0, 4)
      const index = this.state.path[i].substr(4)
      currentStatement = currentStatement[prop][index]
    }
    currentStatement.description = data.description
    this.setState({tree: copiedTree})
  }

  setSource = (data) => {
    let copiedTree = Object.assign({}, this.state.tree)

    var currentStatement = copiedTree
    for(var i = 0; i < this.state.path.length; i++) {

      const prop = this.state.path[i].substr(0, 4)
      const index = this.state.path[i].substr(4)
      currentStatement = currentStatement[prop][index]
    }
    currentStatement.source = data.source
    this.setState({tree: copiedTree})
  }

  setTitle = (data) => {
    let copiedTree = Object.assign({}, this.state.tree)

    var currentStatement = copiedTree
    for(var i = 0; i < this.state.path.length; i++) {

      const prop = this.state.path[i].substr(0, 4)
      const index = this.state.path[i].substr(4)
      currentStatement = currentStatement[prop][index]
    }

    currentStatement.title = data.title
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
        <AppBar title="Treedoff"
                showMenuIconButton={ false }
                iconElementRight={
                  <FlatButton
                    label="Save"
                    onTouchTap={ this.saveTree }
                    style={{margin: 12}}>
                  </FlatButton>
            }/>
        <History data={ this.state } regress={ this.regressPath }/>
        <Statement title={ currentStatement.title }
          description={ currentStatement.description }
          source={ currentStatement.source }
          confidence={ currentStatement.confidence }
          pros={ currentStatement.pros }
          cons={ currentStatement.cons }
          modifyPath={ this.advancePath }
          setConfidence={ this.setConfidence }
          addStatement={ this.addStatement }
          setDescription={ this.setDescription }
          setSource={ this.setSource }
          setTitle={ this.setTitle }/>
      </div>

    )
  }
}
