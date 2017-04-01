import React, { Component } from 'react'
import {TableRowColumn} from 'material-ui/Table'
import Slider from 'material-ui/Slider'


export default class Snippet extends Component {

  renderInnerContent() {
    const axis = this.props.pro ? "x-reverse" : "x"

    return this.props.title ? (
      <span>
        <p onClick={ (e) => this.props.modifyPath(this.props.pro, this.props.index) } >
          { this.props.title }
        </p>
        <Slider defaultValue={this.props.confidence} axis={ axis } />
      </span>
    ) : ""
  }

  render() {
    const alignment = this.props.pro ? "right" : "left"
    return(
      <TableRowColumn colSpan={5}
                      style={{textAlign: alignment}}>
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
