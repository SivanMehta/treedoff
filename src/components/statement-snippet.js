import React, { Component } from 'react'
import {TableRowColumn} from 'material-ui/Table'
import LinearProgress from 'material-ui/LinearProgress'

export default class Snippet extends Component {

  renderInnerContent() {

    const color = "rgb(" +
      (this.props.pro ? 0 : parseInt(this.props.confidence * 255, 10)) + ",0," +
      (this.props.pro ? parseInt(this.props.confidence * 255, 10) : 0) + ")"

    return this.props.title ? (
      <span>
        <p onClick={ (e) => this.props.modifyPath(this.props.pro, this.props.index) } >
          { this.props.title }
        </p>
        <LinearProgress mode="determinate" value={ this.props.confidence * 100 } color={ color }/>
      </span>
    ) : ""

  }

  render() {
    const alignment = this.props.pro ? "right" : "left"
    return(
      <TableRowColumn colSpan={5} style={{textAlign: alignment}}>
        { this.renderInnerContent() }
      </TableRowColumn>
    )
  }
}

Snippet.propTypes = {
  pro: React.PropTypes.bool,
  title: React.PropTypes.string,
  confidence: React.PropTypes.number
}
