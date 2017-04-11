import tree from './tree-reducer.js'
import path from './path-reducer.js'

import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  path,
  tree
})

export default rootReducer
