import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import App from './App';
import './index.css';
import AddArg from './components/add-arg.js';
import TreeVis from './components/tree-vis.js'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Material UI
injectTapEventPlugin()


ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={AddArg}/>
      <Route exact path='/trav' component={App}/>
      <Route path='/tree' component={TreeVis}/>
    </div>
  </Router>,
  document.getElementById('root')
);
