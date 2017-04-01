import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin'

// Material UI
injectTapEventPlugin()
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';

// react-router

import {
    BrowserRouter as Router,
    IndexRoute,
    Route
} from 'react-router-dom'

// custom components
import Tree from './components/tree.js'

const treePath = ({ match }) => (
    <Tree path={match.params.path} />
)

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Treedoff" />
          <Router>
            <div>
              <Route path="/:path" component={ treePath } />
              <Route path="/" exact={ true } component={ treePath } />
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
