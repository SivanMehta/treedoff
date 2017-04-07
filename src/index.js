import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import App from './App'
import AddArg from './components/add-arg.js'
import Signup from './components/accounts/sign-up-container.js'
import Login from './components/accounts/login-container.js'

import './index.css'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import configureStore from './store/configure-store'
import {Provider} from 'react-redux'

import Auth from './modules/Auth';

const store = configureStore()

// Material UI
injectTapEventPlugin()

const palleteColor = '#00c04A'

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

})

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {Auth.isUserAuthenticated() ? (
            <Route exact path='/' component={AddArg}/> 
          ) : (
            <Route exact path='/' component={Login}/>
          )}
          <Route exact path='/trav/:arg_name' component={App}/>
          <Route exact path='/trav' component={App}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={Signup}/>

          
        </div>
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
)

// make logout route