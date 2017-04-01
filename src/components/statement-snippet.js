import React, { Component } from 'react'
import {TableRowColumn} from 'material-ui/Table'
import Slider from 'material-ui/Slider'
import { Link } from 'react-router-dom'


export default class Snippet extends Component {

  renderInnerContent() {
    const axis = this.props.pro ? "x-reverse" : "x"

    return this.props.title ? (
      <span>
        { this.props.title }
        <Slider defaultValue={this.props.confidence} axis={ axis } />
      </span>
    ) : ""
  }

  render() {
    const alignment = this.props.pro ? "right" : "left"
    return(
      <TableRowColumn colSpan={5} style={{textAlign: alignment}} >
        <Link to={ this.props.path }>
          { this.renderInnerContent() }
        </Link>
      </TableRowColumn>
    )
  }
}

Snippet.propTypes = {
  pro: React.PropTypes.bool,
  title: React.PropTypes.string,
  confidence: React.PropTypes.number
}
