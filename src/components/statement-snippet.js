import React, { Component } from 'react'
import {TableRowColumn} from 'material-ui/Table'
import LinearProgress from 'material-ui/LinearProgress'

export default class Snippet extends Component {

  render() {
    const alignment = this.props.pro ? "right" : "left"
    const color = "rgb(" +
    (this.props.pro ? 0 : parseInt(this.props.confidence * 255, 10)) + ",0," +
    (this.props.pro ? parseInt(this.props.confidence * 255, 10) : 0) + ")"

    return(
      <span>
        <span onClick={ (e) => this.props.modifyPath(this.props.pro, this.props.index) } >
          { this.props.title }
        </span>
        <LinearProgress mode="determinate" value={ this.props.confidence * 100 } color={ color }/>
      </span>
    )
  }
}

Snippet.propTypes = {
  pro: React.PropTypes.bool,
  title: React.PropTypes.string,
  confidence: React.PropTypes.number
}
