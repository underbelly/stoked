'use strict';

import api from '../utils/api';

/*
 * Action Types
 */
export const SET_HIGH_SCORE = 'SET_HIGH_SCORE';
export const LOADED = 'LOADED';

/*
 * Action Creators
 */

export const setHighScore = (highScore) => {
  return { type: SET_HIGH_SCORE, highScore: highScore }
};

export const loaded = () => {
  return { type: LOADED }
};

export const postScore = (score) => {
  return (dispatch, getState) => {
    let { sessionReducer, stokedReducer } = getState();
    score = score * 100;

    if (score > stokedReducer.highScore) {
      api.postStokedCount(sessionReducer.username, score)
      .then((data) => {
        data = parseFloat(data.toFixed(2))
        dispatch(setHighScore(data))
      })
      .catch((error) => console.log('Request failed', error));
    }
  }
};

export const getScore = (username) => {
  return (dispatch) => {
    api.getStokedCount(username)
    .then((data) => {
      let highScore = parseFloat(data.toFixed(2));

      dispatch(setHighScore(highScore));
    }).catch((error) => {
      console.log('Request failed', error);
    });
  }
};
