import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';

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
