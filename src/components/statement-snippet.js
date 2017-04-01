import React, { Component } from 'react'
import {TableRowColumn} from 'material-ui/Table'
import Slider from 'material-ui/Slider'

export default class Snippet extends Component {
  render() {
    const alignment = this.props.pro ? "right" : "left"
    const axis = this.props.pro ? "x-reverse" : "x"
    return(
      <TableRowColumn colSpan={5} style={{textAlign: alignment}}>
        { this.props.title }
        <Slider defaultValue={this.props.confidence} axis={ axis } />
      </TableRowColumn>
    )
  }
}

Snippet.propTypes = {
  pro: React.PropTypes.bool,
  title: React.PropTypes.string,
  confidence: React.PropTypes.number
}
