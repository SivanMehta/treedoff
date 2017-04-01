import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin'

// Material UI
injectTapEventPlugin()
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';

// custom components
import Tree from './components/tree.js'

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Treedoff" />
          <Tree />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
