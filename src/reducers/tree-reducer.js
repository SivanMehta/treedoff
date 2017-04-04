// const defaultArgument = {
//   title: "Waiting for server response...",
//   description: "Patience, young padawan",
//   confidence: .999,
//   source: "lol.not",
//   pros: [],
//   cons: []
// }

import * as types from '../actions/action-types';

export default (state = [], action) => {
  switch (action.type) {
    case types.UPDATE_TREE:
      return [...state, Object.assign({}, action.tree)];
    default:
      return state;
  }
};