import React, { Component } from 'react'

import Statement from './statement'

export default class Tree extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <Statement confidence={ 0.5 } />
    )
  }
}
