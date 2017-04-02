import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


// custom components
import Tree from './components/tree.js'

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <Tree />
      </MuiThemeProvider>
    )
  }
}

export default App
