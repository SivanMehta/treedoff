import React, { Component } from 'react'
import faker from 'faker'

// Material UI
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'
import Slider from 'material-ui/Slider'
import TextField from 'material-ui/TextField'
import AddCircle from 'material-ui/svg-icons/content/add-circle';

// custom components
import Snippet from './statement-snippet.js'

export default class Statement extends Component {

  constructor(props) {
    super(props)

    this.state = {
      text: this.props.text || faker.company.catchPhrase(),
      description: this.props.description || faker.hacker.phrase(),
      confidence: this.props.confidence || Math.random(),
      pros: [],
      cons: []
    }
  }

  componentDidMount() {
    this.setState({
      pros: this.getPros(),
      cons: this.getCons()
    })
  }

  getCons() {
    var statements = []
    for(var i = 0; i < 3; i++) {
      statements.push(faker.company.catchPhrase())
    }

    return statements
  }

  getPros() {
    return this.getCons()
  }

  getArguments() {
    var rows = []
    const num_arguments = Math.max(this.state.pros.length, this.state.cons.length)
    for(var i = 0; i < num_arguments; i++) {
      rows.push(
        <TableRow key={i}>
          <TableHeaderColumn colSpan={1}/>
          <Snippet pro={ true } title={ this.state.pros[i] ? this.state.pros[i] : "" } confidence={ 0.5 } />
          <Snippet pro={ false } title={ this.state.cons[i] ? this.state.cons[i] : ""  } confidence={ 0.5 } />
          <TableHeaderColumn colSpan={1}/>
        </TableRow>
      )
    }

    return rows
  }

  addPro() {
    this.setState({
      pros: this.state.pros.concat(this.refs.addPro.input.value)
    })
  }

  addCon() {
    this.setState({
      cons: this.state.cons.concat(this.refs.addCon.input.value)
    })
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <h1>{ this.state.text }</h1>
          <i>{ this.state.description }</i>
          <Slider defaultValue={ this.state.confidence }/>
        </div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn colSpan={1}/>
              <TableHeaderColumn colSpan={5} style={{textAlign: 'right'}}>Pros</TableHeaderColumn>
              <TableHeaderColumn colSpan={5}>Cons</TableHeaderColumn>
              <TableHeaderColumn colSpan={1}/>
            </TableRow>
          </TableHeader>
          <TableBody  displayRowCheckbox={false}>
            { this.getArguments() }
            <TableRow>
              <TableHeaderColumn colSpan={1}/>
              <TableHeaderColumn colSpan={5}>
                <AddCircle hoverColor="green" onClick={ this.addPro.bind(this) }/>
                <TextField hintText="Add a Pro"
                           style={{textAlign: 'right'}}
                           ref="addPro"/>
              </TableHeaderColumn>
              <TableHeaderColumn colSpan={5}>
                <TextField hintText="Add a Con" ref="addCon" />
                <AddCircle hoverColor="green" onClick={ this.addCon.bind(this) }/>
              </TableHeaderColumn>
              <TableHeaderColumn colSpan={1}/>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }
}
