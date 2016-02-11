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

export const incrementCount = (count) => {
  return { type: INCREMENT_COUNT, count: count }
};

export const loaded = () => {
  return { type: LOADED }
};

export const postCount = (username, count) => {
  return (dispatch) => {
    api.postStokedCount(username, ++count).then((data) => {
      dispatch(incrementCount(data));
    }).catch((error) => {
      console.log('Request failed', error);
    });
  }
};

export const getCount = (username) => {
  return (dispatch) => {
    api.getStokedCount(username).then((data) => {
      dispatch(incrementCount(data));
    }).catch((error) => {
      console.log('Request failed', error);
    });
  }
};
