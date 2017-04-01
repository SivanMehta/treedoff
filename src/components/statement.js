import React, { Component } from 'react'

// Material UI
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'
import Slider from 'material-ui/Slider'

// custom components
import Snippet from './statement-snippet.js'

export default class Statement extends Component {

  renderTableBody() {
    var rows = []
    const num_arguments = Math.max(this.props.pros.length, this.props.cons.length)
    for(var i = 0; i < num_arguments; i++) {
      rows.push(
        <TableRow key={i}>
          <TableHeaderColumn colSpan={1}/>
          <Snippet pro={ true } title={ this.props.pros[i] ? this.props.pros[i].title : "" } confidence={ 0.5 } />
          <Snippet pro={ false } title={ this.props.cons[i] ? this.props.cons[i].title : ""  } confidence={ 0.5 } />
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
          <h1>{ this.props.title }</h1>
          <i>{ this.props.description }</i>
          <Slider defaultValue={ this.props.confidence }/>
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
          <TableBody displayRowCheckbox={false}>
            { this.renderTableBody() }
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
  pros: React.PropTypes.array,
  cons: React.PropTypes.array
}
