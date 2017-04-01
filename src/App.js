import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin'

// Material UI
injectTapEventPlugin()
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
