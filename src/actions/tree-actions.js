import * as types from './action-types';

export const updateTree = (tree) => {
  return {
    type: types.UPDATE_TREE,
    tree
  }
}

export const regressPath = (amt) => {
  return {
    type: types.REGRESS_PATH,
    amt
  }
}

export const advancePath = (pro, index) => {
  return {
    type: types.ADVANCE_PATH,
    pro,
    index
  }
}
