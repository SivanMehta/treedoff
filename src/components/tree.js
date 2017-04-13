import React, { Component } from 'react'
import faker from 'faker'

// Material UI
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import {Tabs, Tab} from 'material-ui/Tabs'

// custom components
import Statement from './statement'
import History from './history'

// redux actions
import * as treeActions from '../actions/tree-actions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Auth from '../modules/Auth'

/* global fetch */

import { Redirect } from 'react-router-dom'

function generateFakeArgument (title, amt) {
  return {
    title: title,
    description: faker.hacker.phrase(),
    confidence: amt,
    source: '',
    pros: [],
    cons: []
  }
}

class Tree extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // loading icon indication
      loading: false,
      redirect: false
    }

    this.setCurrentStatement = this.setCurrentStatement.bind(this)
    this.saveTree = this.saveTree.bind(this)
    this.setAttribute = this.setAttribute.bind(this)
    this.handleData = this.handleData.bind(this)
  }

  handleData (data) {
    this.props.actions.updateTree(data)
  }

  componentDidMount () {
    fetch('/api', {
      headers: {
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
    .then(res => res.json())
    .then(data => this.handleData(data))
    .catch((ex) => console.log(ex))
  }

  saveTree () {
    fetch('/api/tree', {
      body: JSON.stringify(this.props.tree),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    }).then(res => console.log(res.status))
  }

  // refactor so you just get the statements to display
  // get current statement
  setCurrentStatement (property, val) {
    const copiedTree = Object.assign({}, this.props.tree)

    var currentStatement = copiedTree
    for (var i = 0; i < this.props.path.length; i++) {
      const prop = this.props.path[i].substr(0, 4)
      const index = this.props.path[i].substr(4)

      currentStatement = currentStatement[prop][index]
    }

    switch (property) {
      case 'confidence':
        currentStatement.confidence = val
        return copiedTree
      case 'description':
        currentStatement.description = val
        return copiedTree
      case 'source':
        currentStatement.source = val
        return copiedTree
      case 'title':
        currentStatement.title = val
        return copiedTree
      case 'add':
        currentStatement[val[0] ? 'pros' : 'cons'] = currentStatement[val[0] ? 'pros' : 'cons']
          .concat(generateFakeArgument(val[1], 0.01))
        return copiedTree
      case 'remove':
        const pro = val[0]
        const index = val[1]
        const cat = pro ? 'pros' : 'cons'
        currentStatement[cat] = currentStatement[cat].slice(0, index)
          .concat(currentStatement[cat].slice(index + 1, currentStatement[cat].length))
        return copiedTree
      default:
        console.error('invalid property to change')
        return copiedTree
    }
  }

  setAttribute (attribute, data) {
    this.props.actions.updateTree(
      this.setCurrentStatement(attribute, data)
    )
  }

  render () {
    // parse path and traverse tree accordingly
    var currentStatement = this.props.tree
    for (var i = 0; i < this.props.path.length; i++) {
      const prop = this.props.path[i].substr(0, 4)
      const index = this.props.path[i].substr(4)
      currentStatement = currentStatement[prop][index]
    }

    return this.state.redirect || !Auth.isUserAuthenticated() ? <Redirect to='/' /> : (
      <Tabs>
          <Tab label='Pros and Cons'>

            <AppBar title='Treedoff'
              showMenuIconButton={false}
              iconElementRight={
                <FlatButton
                  label='Save'
                  onTouchTap={this.saveTree}
                  style={{margin: 12}} />} />
            <History tree={this.props.tree} path={this.props.path} regress={this.props.actions.regressPath} />
            <Statement title={currentStatement.title}
              description={currentStatement.description}
              source={currentStatement.source}
              confidence={currentStatement.confidence}
              pros={currentStatement.pros}
              cons={currentStatement.cons}
              modifyPath={this.props.actions.advancePath}
              setAttribute={this.setAttribute} />

          </Tab>
          <Tab label='Tree'>
            I am a beautiful tree
          </Tab>
      </Tabs>
    )
  }
}

// Redux connector functions

function mapStateToProps (state, props) {
  return {
    path: state.path,
    tree: state.tree
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(treeActions, dispatch)
  }
}

// Giving yourself props with connect
export default connect(mapStateToProps, mapDispatchToProps)(Tree)
