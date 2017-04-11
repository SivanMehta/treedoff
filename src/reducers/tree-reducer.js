import * as types from '../actions/action-types'

const defaultArgument = {
  title: 'Waiting for server response...',
  description: 'Patience, young padawan',
  confidence: 0.999,
  source: 'lol.not',
  pros: [],
  cons: []
}

export default (tree = defaultArgument, action) => {
  switch (action.type) {
    case types.UPDATE_TREE:
      return Object.assign({}, action.tree)
    default:
      return tree
  }
}
