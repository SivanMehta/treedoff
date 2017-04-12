import React, { Component } from 'react'
import LinearProgress from 'material-ui/LinearProgress'

export default class Snippet extends Component {
  constructor (props) {
    super(props)

    this.advance = this.advance.bind(this)
  }

  advance (pro, index) {
    this.props.modifyPath(pro, index)
  }

  render () {
    const color = 'rgb(' +
    (this.props.pro ? 0 : parseInt(this.props.confidence * 255, 10)) + ',0,' +
    (this.props.pro ? parseInt(this.props.confidence * 255, 10) : 0) + ')'

    return (
      <span>
        {this.props.title}
        <LinearProgress mode='determinate' value={this.props.confidence * 100} color={color} />
      </span>
    )
  }
}

Snippet.propTypes = {
  pro: React.PropTypes.bool,
  title: React.PropTypes.string,
  confidence: React.PropTypes.number
}
