'use strict';

import api from '../utils/api';

/*
 * Action Types
 */
export const INCREMENT_COUNT = 'INCREMENT_COUNT';

/*
 * Action Creators
 */

export const incrementCount = (count) => {
  return { type: INCREMENT_COUNT, count: count }
};

export const postCount = (count) => {
  return (dispatch) => {
    api.postStokedCount(++count).then((data) => {
      dispatch(incrementCount(data));
    }).catch((error) => {
      console.log('Request failed', error);
    });
  }
};

export const getCount = () => {
  return (dispatch) => {
    api.getStokedCount().then((data) => {
      dispatch(incrementCount(data));
    }).catch((error) => {
      console.log('Request failed', error);
    });
  }
};
