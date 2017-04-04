import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import App from './App';
import './index.css';
import AddArg from './components/add-arg.js';
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import configureStore from './store/configure-store';
import {Provider} from 'react-redux';
const store = configureStore();

// Material UI
injectTapEventPlugin();

const palleteColor = '#00c04A';

const muiTheme = getMuiTheme({
  appBar: {
    height: 50,
    color: palleteColor
  },
  slider: {
    selectionColor: palleteColor,
    rippleColor: palleteColor,
    trackSize: 5
  },
  toggle: {
    thumbOnColor: palleteColor,
    trackOnColor: palleteColor,
  }

});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Route exact path='/' component={AddArg}/>
          <Route exact path='/trav/:arg_name' component={App}/>
          <Route exact path='/trav'component={App}/>
        </div>
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
