import * as types from '../actions/action-types';

const defaultArgument = {
  title: "Waiting for server response...",
  description: "Patience, young padawan",
  confidence: .999,
  source: "lol.not",
  pros: [],
  cons: []
}

// DEFAULT STATE IS []
export default (tree = defaultArgument, action) => {
  switch (action.type) {
    case types.UPDATE_TREE:
      return [...tree, Object.assign({}, action.tree)];
    default:
      return tree;
  }
};