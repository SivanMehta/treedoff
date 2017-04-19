/* global window */

// Adapated from https://github.com/romseguy/d3-state-visualizer/tree/master/examples/react-tree

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { tree } from 'd3-state-visualizer'

export default class Tree extends Component {
  constructor (props) {
    super(props)

    this.state = {
      state: this.props.tree,
      size: window.innerWidth
    }
  }

  componentDidMount () {
    this.renderChart = tree(findDOMNode(this), this.state)
    this.renderChart()
  }

  componentWillReceiveProps (nextProps) {
    this.renderChart(nextProps.tree || nextProps.state)
  }

  render () {
    return <div />
  }
}
