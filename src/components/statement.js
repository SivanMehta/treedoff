import React, { Component } from 'react'

// Material UI
import Slider from 'material-ui/Slider'
import {List, ListItem} from 'material-ui/List';
import LinearProgress from 'material-ui/LinearProgress'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import Divider from 'material-ui/Divider'

// grid
import { Grid, Row, Col } from 'react-flexbox-grid';

// Inline Editing
import InlineEdit from 'react-edit-inline'
import './statement.css'

// custom components
import Snippet from './statement-snippet.js'

export default class Statement extends Component {

  constructor(props) {
    super(props)

    this.state = {
      confidence: this.props.confidence,
      editing: false
    }

    this.setConfidence = this.setConfidence.bind(this)
    this.addStatement = this.addStatement.bind(this)
    this.renderPros = this.renderPros.bind(this)
    this.renderCons = this.renderCons.bind(this)
    this.renderProgress = this.renderProgress.bind(this)
  }

  setConfidence(event, value) {
    this.props.setConfidence(value)
  }

  addStatement(pro) {
    if(this.refs[(pro ? "addPro" : "addCon")].input.value.length !== 0) {
      this.props.addStatement(
        pro,
        this.refs[(pro ? "addPro" : "addCon")].input.value
      )
    }
    this.refs[(pro ? "addPro" : "addCon")].input.value = ""
    return false
  }

  renderPros() {
    var rows = []
    var byConfidence = (b, a) => (a.confidence - b.confidence)
    const pros = this.props.pros.sort(byConfidence)
    const num_arguments = pros.length
    for(var i = 0; i < num_arguments; i++) {
      const k = i
      rows.push(
        <ListItem key={i} leftIcon={
            <RemoveCircle onTouchTap={ () => this.props.removeStatement(true, k) }/>
          }>
          <Snippet pro={ true }
                   title={ pros[i] ? pros[i].title : "" }
                   confidence={ pros[i] ? pros[i].confidence : 0 }
                   modifyPath={ this.props.modifyPath }
                   index={ i }/>
        </ListItem>
      )
    }

    return rows
  }

  renderCons() {
    var rows = []
    const byConfidence = (b, a) => (a.confidence - b.confidence)
    const cons = this.props.cons.sort(byConfidence)
    const num_arguments = cons.length
    for(var i = 0; i < num_arguments; i++) {
      const k = i
      rows.push(
        <ListItem key={i} leftIcon={
            <RemoveCircle onTouchTap={ () => this.props.removeStatement(false, k) }/>
          }>
          <Snippet pro={ false }
                   title={ cons[i] ? cons[i].title : "" }
                   confidence={ cons[i] ? cons[i].confidence : 0 }
                   modifyPath={ this.props.modifyPath }
                   index={ i }/>
        </ListItem>
      )
    }

    return rows
  }

  renderProgress() {
    return this.state.editing ? (
      <Slider value={ 0.5 } onChange={this.setConfidence}/>
    ) : (
      <LinearProgress mode="determinate" value={ this.props.confidence * 100 } color='#00c04A'/>
    )
  }

  render() {
    return (
      <Grid>
        <Row>
          <h1><InlineEdit
              paramName="title"
              className="input-title"
              activeClassName="input-title"
              text={ this.props.title }
              change={ this.props.setTitle } />
          </h1>
        </Row>
        <Row>
          <InlineEdit
            paramName="description"
            className="input-description"
            activeClassName="input-description"
            text={ this.props.description }
            change={ this.props.setDescription }
            />
        </Row>
        <Row>
          <InlineEdit
            paramName="source"
            className="input-source"
            activeClassName="input-source"
            text={ this.props.source ? this.props.source : "Please enter a source" }
            change={ this.props.setSource }
            />
        </Row>
        <Row>
          <Col xs={4} />
          <Col xs={4}>
            <Toggle
              label="Edit Confidence"
              labelPosition="right"
              onToggle={ (e, v) => this.setState({editing: v}) }
              defaultToggled={ this.state.editing }
              />
          </Col>
          <Col xs={4} />
        </Row>
        <Row>
          <Col xs={12}>
            { this.renderProgress() }
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <List>
              <ListItem primaryText="Pros" disabled={true} />
              <Divider />
              { this.renderPros() }
              <ListItem disabled={true}
                leftIcon={
                  <AddCircle onTouchTap={ () => this.addStatement(true) }
                             hoverColor="green"/>}>
                <TextField ref="addPro" floatingLabelText="Add a Pro"/>
              </ListItem>
            </List>
          </Col>
          <Col xs={12} sm={6}>
            <List>
              <ListItem primaryText="Cons" disabled={true} />
              <Divider />
              { this.renderCons() }
              <ListItem disabled={true}
                leftIcon={<AddCircle onTouchTap={ () => this.addStatement(false) }
                                        hoverColor="red"/>}>
                <TextField ref="addCon" floatingLabelText="Add a Con"/>
              </ListItem>
            </List>
          </Col>
        </Row>
      </Grid>
    )
  }
}

Statement.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  source: React.PropTypes.string,
  confidence: React.PropTypes.number,
  modifyPath: React.PropTypes.func,
  setConfidence: React.PropTypes.func,
  setDescription: React.PropTypes.func,
  setSource: React.PropTypes.func,
  setTitle: React.PropTypes.func,
  addStatement: React.PropTypes.func,
  pros: React.PropTypes.array,
  cons: React.PropTypes.array
}
