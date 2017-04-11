import * as types from '../actions/action-types'

export default (path = [], action) => {
  // change this to use statement not pro and index
  switch (action.type) {
    case types.ADVANCE_PATH:
      return [...path, ((action.pro ? 'pros' : 'cons') + action.index)]
    case types.REGRESS_PATH:
      // delete last element
      path = path.slice(0, action.amt)
      path = [...path]
      return path
    default:
      return path
  }
}
