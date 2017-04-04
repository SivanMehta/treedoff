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

export default (path = [test], action) => {
	// change this to use statement not pro and index
  switch (action.type) {
    case types.ADVANCE_PATH:
    	layer = path.concat((action.pro ? "pros" : "cons") + action.index);
      return path;
    case types.REGRESS_PATH:
      // delete last element
      // path.splice(-1);
      // deep copy to make sure change gets picked up
      // return path.map(a => Object.assign({}, a));
      console.log('here')
      return path
    default:
      return path;
  }
};