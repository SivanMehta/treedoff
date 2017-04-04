import * as types from './action-types';

export const updateTree = (tree) => {
  return {
    type: types.UPDATE_TREE,
    tree
  };
};