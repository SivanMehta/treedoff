import * as types from '../actions/action-types';

// export const regressPath = () => {
//   return {
//     type: types.REGRESS_PATH,
//   };
// };

// export const advancePath = (statement, pro) => {
//   return {
//     type: types.ADVANCE_PATH,
//     statement
//   };
// };

export default (path = [], action) => {
	// change this to use statement not pro and index
  switch (action.type) {
    case types.ADVANCE_PATH:
      return [...path, ((action.pro ? "pros" : "cons") + action.index)]
    case types.REGRESS_PATH:
      // delete last element
      path = path.slice(0, action.amt);
      path = [...path]
      return path;
    default:
      return path;
  }
};