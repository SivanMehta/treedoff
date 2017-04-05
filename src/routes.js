import React from 'react'
import { Router, Route } from 'react-router'

import App from './App'

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'


const Routes = (props) => (
    <Router {...props}>
        <Route path="*" component={App} />
    </Router>
)

export default Routes
