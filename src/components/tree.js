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
      // loading icon indication
      loading: false
    }

    this.setCurrentStatement = this.setCurrentStatement.bind(this);
    // this.changeCurrentStatement = thiss.changeCurrentStatement.bind(this);

    this.saveTree = this.saveTree.bind(this);
    this.setConfidence = this.setConfidence.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setSource = this.setSource.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.addStatement = this.addStatement.bind(this);
    this.removeStatement = this.removeStatement.bind(this);
    this.handleData = this.handleData.bind(this);

    
  }

  handleData(data){
    this.props.actions.updateTree(data);
  }

  componentDidMount() {
    fetch("/api")
      .then(res => res.json())
      .then(data => this.handleData(data))
      .catch(() => console.log("Could not fetch data =("))
  }

  saveTree() {
    fetch('/api/tree', {
      credentials: 'same-origin',
      body: JSON.stringify(this.props.tree),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => console.log(res.status))
  }

  // refactor so you just get the statements to display
  // get current statement

  // use a sort of map thingy
  setCurrentStatement(property, val){
    const copiedTree = Object.assign({}, this.props.tree);

    var currentStatement = copiedTree;
    // do this in parallel
    for(var i = 0; i < this.props.path.length; i++) {

      // change way state is managed so we don't need to use substr...
      const prop = this.props.path[i].substr(0, 4);
      const index = this.props.path[i].substr(4);

      currentStatement = currentStatement[prop][index];
    }

    // const toRet = [copiedTree, currentStatement];

    switch (property) {
      case 'confidence':
        currentStatement.confidence = val;
        return copiedTree;
      case 'description':
        currentStatement.description = val;
        return copiedTree;
      case 'source':
        currentStatement.source = val;
        return copiedTree;
      case 'title':
        currentStatement.title = val;
        return copiedTree;
      case 'add':
        currentStatement[val[0] ? "pros" : "cons"] = currentStatement[val[0] ? "pros" : "cons"]
      .concat(generate_fake_argument(val[1], .01))
        return copiedTree;
      case 'remove':
        currentStatement.title = val;
        return copiedTree;
      default:
        console.log('invalid property to change')
        return copiedTree;
    }

    
  }

  

  setConfidence(confidence) {
    this.props.actions.updateTree(this.setCurrentStatement('confidence', confidence));
  }

  setDescription(data) {
    this.props.actions.updateTree(this.setCurrentStatement('description', data.description));
  }

  setSource(data) {
    this.props.actions.updateTree(this.setCurrentStatement('source', data.source));
  }

  setTitle(data) {
    this.props.actions.updateTree(this.setCurrentStatement('title', data.title));
  }

  addStatement(pro, statement) {
    this.props.actions.updateTree(this.setCurrentStatement('add', [pro, statement]));
  }

  removeStatement(pro, index) {
    let copiedTree = Object.assign({}, this.props.tree)

    var currentStatement = copiedTree
    for(var i = 0; i < this.props.path.length; i++) {

      const prop = this.props.path[i].substr(0, 4)
      const index = this.props.path[i].substr(4)
      currentStatement = currentStatement[prop][index]
    }

    const cat = pro ? "pros" : "cons"

    currentStatement[cat] = currentStatement[cat].slice(0, index)
      .concat(currentStatement[cat].slice(index + 1, currentStatement[cat].length))
    
    this.props.actions.updateTree(copiedTree);
  }

  

  render() {
    // parse path and traverse tree accordingly
    var currentStatement = this.props.tree
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
        <History tree={ this.props.tree } path={ this.props.path } regress={ this.props.actions.regressPath } />
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
