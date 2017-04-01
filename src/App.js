import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';

import Statement from './components/statement.js'

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Treedoff" />
          <Statement confidence={0.5}/>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
