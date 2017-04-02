import React, { Component } from 'react'

// Material UI
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'
import Slider from 'material-ui/Slider'

// custom components
import Snippet from './statement-snippet.js'

export default class Statement extends Component {

  constructor(props) {
    super(props)

    this.state = {
      confidence: this.props.confidence
    }
  }

  setConfidence = (event, value) => {
    this.setState({confidence: value})
  };


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

  render() {

    return (
      <div>
        <div className="App-header">
          <h1>{ this.props.title }</h1>
          <i>{ this.props.description }</i>
          <Slider value={ this.state.confidence } onChange={this.setConfidence}/>
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
  pros: React.PropTypes.array,
  cons: React.PropTypes.array,
}
