import React, { Component } from 'react'

// Material UI
import Slider from 'material-ui/Slider'
import {List, ListItem} from 'material-ui/List'
import LinearProgress from 'material-ui/LinearProgress'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import Divider from 'material-ui/Divider'

// grid
import { Grid, Row, Col } from 'react-flexbox-grid'

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

    this.renderPros = this.renderPros.bind(this)
    this.renderCons = this.renderCons.bind(this)
    this.renderProgress = this.renderProgress.bind(this)
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
            <RemoveCircle onTouchTap={ () => this.props.setAttribute('remove', [true, k]) }/>
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
            <RemoveCircle onTouchTap={ () => this.props.setAttribute('remove', [false, k])}/>
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
      <Slider value={ 0.5 } onChange={(data) => this.props.setAttribute('confidence', data.confidence)}/>
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
              change={ (data) => this.props.setAttribute('title', data.title) } />
          </h1>
        </Row>
        <Row>
          <InlineEdit
            paramName="description"
            className="input-description"
            activeClassName="input-description"
            text={ this.props.description }
            change={ (data) => this.props.setAttribute('description', data.description) }
            />
        </Row>
        <Row>
          <InlineEdit
            paramName="source"
            className="input-source"
            activeClassName="input-source"
            text={ this.props.source ? this.props.source : "Please enter a source" }
            change={ (data) => this.props.setAttribute('source', data.source) }
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
                  <AddCircle onTouchTap={ () => this.props.setAttribute('add', [true, this.refs['addPro'].input.value]) }
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
                leftIcon={<AddCircle onTouchTap={ () => this.props.setAttribute('add', [false, this.refs['addCon'].input.value]) }
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
  setAttribute: React.PropTypes.func,
  pros: React.PropTypes.array,
  cons: React.PropTypes.array
}
