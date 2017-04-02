import React, { Component } from 'react'

// Material UI
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'
import Slider from 'material-ui/Slider'
import LinearProgress from 'material-ui/LinearProgress'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import AddCircle from 'material-ui/svg-icons/content/add-circle'

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
      editing: true
    }
  }

  setConfidence = (event, value) => {
    this.props.setConfidence(value)
  }

  addStatement = (pro) => {
    if(this.refs[(pro ? "addPro" : "addCon")].input.value.length !== 0) {
      this.props.addStatement(
        pro,
        this.refs[(pro ? "addPro" : "addCon")].input.value
      )
    }
    this.refs[(pro ? "addPro" : "addCon")].input.value = ""
  }

  renderTableBody() {
    var rows = []
    var byConfidence = (b, a) => (a.confidence - b.confidence)
    const pros = this.props.pros.sort(byConfidence)
    const cons = this.props.cons.sort(byConfidence)
    const num_arguments = Math.max(pros.length, cons.length)
    for(var i = 0; i < num_arguments; i++) {
      rows.push(
        <TableRow key={i}>
          <TableHeaderColumn colSpan={1}/>
          <Snippet pro={ true }
                   title={ pros[i] ? pros[i].title : "" }
                   confidence={ pros[i] ? pros[i].confidence : 0 }
                   modifyPath={ this.props.modifyPath }
                   index={ i }/>
          <Snippet pro={ false }
                   title={ cons[i] ? cons[i].title : ""  }
                   confidence={ cons[i] ? cons[i].confidence : 0 }
                   modifyPath={ this.props.modifyPath }
                   index={ i } />
          <TableHeaderColumn colSpan={1}/>
        </TableRow>
      )
    }

    return rows
  }

  renderProgress = () => {
    return this.state.editing ? (
      <Slider value={ 0.5 } onChange={this.setConfidence}/>
    ) : (
      <LinearProgress mode="determinate" value={ this.props.confidence * 100 } color='#00c04A'/>
    )
  }

  render() {
    return (
      <div>
        <div className="App-header" style={{"padding" : "0px 15px"}}>
          <h1>
            <InlineEdit
              paramName="title"
              className="input-title"
              activeClassName="input-title"
              text={ this.props.title }
              change={ this.props.setTitle }
            />
            </h1>
            <p>
              <InlineEdit
                paramName="description"
                className="input-description"
                activeClassName="input-description"
                text={ this.props.description }
                change={ this.props.setDescription }
                />
            </p>
            <p>Source:
              <InlineEdit
                paramName="source"
                className="input-source"
                activeClassName="input-source"
                text={ " " + this.props.source }
                change={ this.props.setSource }
                />
            </p>
          { this.renderProgress() }
          <Toggle
            label="Edit Confidence"
            labelPosition="right"
            onToggle={ (e, v) => this.setState({editing: v}) }
            defaultToggled={ this.state.editing }
            style={{marginLeft : "auto", marginRight : "auto", width: "20%"}}
          />
        </div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn colSpan={6}>Pros</TableHeaderColumn>
              <TableHeaderColumn colSpan={6}>Cons</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            { this.renderTableBody() }
            <TableRow>
              <TableHeaderColumn colSpan={1}/>
              <TableHeaderColumn colSpan={5}>
                <AddCircle hoverColor="green" onClick={ () => this.addStatement(true) }/>
                <TextField hintText="Add a Pro"
  	                           style={{textAlign: 'right'}}
  	                           ref="addPro"/>
              </TableHeaderColumn>
              <TableHeaderColumn colSpan={5}>
                <TextField hintText="Add a Con" ref="addCon" />
                <AddCircle hoverColor="red" onClick={ () => this.addStatement(false) }/>
              </TableHeaderColumn>
              <TableHeaderColumn colSpan={1}/>
            </TableRow>
          </TableBody>
        </Table>
      </div>
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
