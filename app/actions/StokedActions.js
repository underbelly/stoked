'use strict';

import api from '../utils/api';

/*
 * Action Types
 */
export const INCREMENT_COUNT = 'INCREMENT_COUNT';
export const LOADED = 'LOADED';

/*
 * Action Creators
 */

export const incrementCount = (highScore) => {
  return { type: INCREMENT_COUNT, highScore: highScore }
};

export const loaded = () => {
  return { type: LOADED }
};

export const postScore = (username, score) => {
  return (dispatch) => {
    api.postStokedCount(username, score).then((data) => {
      dispatch(incrementCount(data));
    }).catch((error) => {
      console.log('Request failed', error);
    });
  }
};

export const getScore = (username) => {
  return (dispatch) => {
    api.getStokedCount(username).then((data) => {
      dispatch(incrementCount(data));
    }).catch((error) => {
      console.log('Request failed', error);
    });
  }
};
