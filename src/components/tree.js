import React, { Component } from 'react'
import faker from 'faker'

// Material UI
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

// custom components
import Statement from './statement'
import History from './history'

// redux actions
import * as treeActions from '../actions/tree-actions'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

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

class Tree extends Component {
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

      // loading icon indication
      loading: false
    }

    this.saveTree = this.saveTree.bind(this)
    this.setConfidence = this.setConfidence.bind(this)
    this.setDescription = this.setDescription.bind(this)
    this.setSource = this.setSource.bind(this)
    this.setTitle = this.setTitle.bind(this)
    this.addStatement = this.addStatement.bind(this)
    this.removeStatement = this.removeStatement.bind(this)
  }

  componentDidMount() {
    fetch("/api")
      .then(res => res.json())
      .then(data => this.setState({tree: data}))
      .catch(() => console.log("Could not fetch data =("))
  }

  saveTree() {
    fetch('/api/tree', {
      credentials: 'same-origin',
      body: JSON.stringify(this.state.tree),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => console.log(res.status))
  }

  

  setConfidence(confidence) {
    console.log(this.props.path);
    let copiedTree = Object.assign({}, this.state.tree)

    var currentStatement = copiedTree
    for(var i = 0; i < this.props.path.length; i++) {

      const prop = this.props.path[i].substr(0, 4)
      const index = this.props.path[i].substr(4)
      currentStatement = currentStatement[prop][index]
    }
    currentStatement.confidence = confidence
    this.setState({tree: copiedTree})
  }

  setDescription(data) {
    let copiedTree = Object.assign({}, this.state.tree)

    var currentStatement = copiedTree
    for(var i = 0; i < this.props.path.length; i++) {

      const prop = this.props.path[i].substr(0, 4)
      const index = this.props.path[i].substr(4)
      currentStatement = currentStatement[prop][index]
    }
    currentStatement.description = data.description
    this.setState({tree: copiedTree})
  }

  setSource(data) {
    let copiedTree = Object.assign({}, this.state.tree)

    var currentStatement = copiedTree
    for(var i = 0; i < this.props.path.length; i++) {

      const prop = this.props.path[i].substr(0, 4)
      const index = this.props.path[i].substr(4)
      currentStatement = currentStatement[prop][index]
    }
    currentStatement.source = data.source
    this.setState({tree: copiedTree})
  }

  setTitle(data) {
    let copiedTree = Object.assign({}, this.state.tree)

    var currentStatement = copiedTree
    for(var i = 0; i < this.props.path.length; i++) {

      const prop = this.props.path[i].substr(0, 4)
      const index = this.props.path[i].substr(4)
      currentStatement = currentStatement[prop][index]
    }

    currentStatement.title = data.title
    this.setState({tree: copiedTree})
  }

  addStatement(pro, statement) {
    let copiedTree = Object.assign({}, this.state.tree)

    var currentStatement = copiedTree
    for(var i = 0; i < this.props.path.length; i++) {

      const prop = this.props.path[i].substr(0, 4)
      const index = this.props.path[i].substr(4)
      currentStatement = currentStatement[prop][index]
    }
    currentStatement[pro ? "pros" : "cons"] = currentStatement[pro ? "pros" : "cons"]
      .concat(generate_fake_argument(statement, .01))
    this.setState({tree: copiedTree})
  }

  removeStatement(pro, index) {
    let copiedTree = Object.assign({}, this.state.tree)

    var currentStatement = copiedTree
    for(var i = 0; i < this.props.path.length; i++) {

      const prop = this.props.path[i].substr(0, 4)
      const index = this.props.path[i].substr(4)
      currentStatement = currentStatement[prop][index]
    }

    const cat = pro ? "pros" : "cons"

    currentStatement[cat] = currentStatement[cat].slice(0, index)
      .concat(currentStatement[cat].slice(index + 1, currentStatement[cat].length))
    this.setState({tree: copiedTree})
  }

  

  render() {
    // parse path and traverse tree accordingly
    var currentStatement = this.state.tree
    for(var i = 0; i < this.props.path.length; i++) {

      const prop = this.props.path[i].substr(0, 4)
      const index = this.props.path[i].substr(4)
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
        <History tree={ this.state.tree } path={ this.props.path } regress={ this.props.actions.regressPath } />
        <Statement title={ currentStatement.title }
          description={ currentStatement.description }
          source={ currentStatement.source }
          confidence={ currentStatement.confidence }
          pros={ currentStatement.pros }
          cons={ currentStatement.cons }
          modifyPath={ this.props.actions.advancePath }
          setConfidence={ this.setConfidence }
          addStatement={ this.addStatement }
          setDescription={ this.setDescription }
          setSource={ this.setSource }
          setTitle={ this.setTitle }
          removeStatement={ this.removeStatement } />
      </div>

    )
  }

}

// Redux connector functions

function mapStateToProps(state, props) {
  return {
    path: state.path,
    tree: state.tree
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(treeActions, dispatch)
  };
}

// Giving yourself props with connect
export default connect(mapStateToProps, mapDispatchToProps)(Tree);
