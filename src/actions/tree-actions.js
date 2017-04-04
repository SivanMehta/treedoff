import * as types from './action-types';

export const updateTree = (tree) => {
  return {
    type: types.UPDATE_TREE,
    tree
  };
};

export const regressPath = (amt) => {
  return {
    type: types.REGRESS_PATH,
    amt
  };
};

export const advancePath = (pro, index) => {
  return {
    type: types.ADVANCE_PATH,
    pro,
    index
  };
};

export const setConfidence = (statement, confidence) => {
  return {
    type: types.SET_CONFIDENCE,
    statement,
    confidence
  };
};

export const setDescription = (statement, text) => {
  return {
    type: types.SET_DESCRIPTION,
    statement,
    text
  };
};

export const setSource = (statement, source) => {
  return {
    type: types.SET_SOURCE,
    statement,
    source
  };
};

export const setTitle = (statement, title) => {
  return {
    type: types.SET_TITLE,
    statement,
    title
  };
};

export const addStatement = (statement) => {
  return {
    type: types.ADD_STATEMENT,
    statement
  };
};

export const removeStatement = (statement) => {
  return {
    type: types.REMOVE_STATEMENT,
    statement
  };
};


