import React, { Component } from 'react'
import faker from 'faker'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import Slider from 'material-ui/Slider'

export default class Statement extends Component {

  constructor(props) {
    super(props)

    this.state = {
      stripedRows: false,
      showRowHover: false,
      deselectOnClickaway: true
    }
  }

  getCons() {
    var statements = []
    for(var i = 0; i < 3; i++) {
      statements.push(faker.hacker.phrase())
    }

    return statements
  }

  getPros() {
    return this.getCons()
  }

  getArguments() {
    var pros = this.getPros()
    var cons = this.getCons()
    var rows = []
    const num_arguments = Math.min(pros.length, cons.length)
    for(var i = 0; i < num_arguments; i++) {
      rows.push(
        <TableRow key={i}>
          <TableHeaderColumn colSpan={1}/>
          <TableRowColumn colSpan={5} style={{textAlign: 'right'}}>
            { pros[i] }
            <Slider defaultValue={(num_arguments - i) / num_arguments} axis="x-reverse" />
          </TableRowColumn>
          <TableRowColumn colSpan={5}>
            { cons[i] }
            <Slider defaultValue={(num_arguments - i) / num_arguments}/>
          </TableRowColumn>
          <TableHeaderColumn colSpan={1}/>
        </TableRow>
      )
    }

    return rows
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <h1>{ this.props.text }</h1>
          <i>{ this.props.description }</i>
        </div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn colSpan={5} style={{textAlign: 'right'}}>Pros</TableHeaderColumn>
              <TableHeaderColumn colSpan={5}>Cons</TableHeaderColumn>
              <TableHeaderColumn colSpan={1}/>
            </TableRow>
          </TableHeader>
          <TableBody  displayRowCheckbox={false}>
            { this.getArguments() }
          </TableBody>
        </Table>
      </div>
    )
  }
}
