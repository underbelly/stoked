'use strict';

import React, {
  AsyncStorage
} from 'react-native';

const SESSION_KEY = '@SessionStorage:key'

/*
 * Action Types
 */
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

/*
 * Action Creators
 */
export const setCurrentUser = (username) => {
  return { type: SET_CURRENT_USER, username: username }
};

export const setSession = (twitterData) => {
  let username = twitterData.screen_name;
  return (dispatch) => {
    AsyncStorage.setItem(SESSION_KEY, username)
    .then((data) => {
      dispatch(setCurrentUser(username));
    }).catch((error) => { console.log(error); });
  }
};

export const getSession = () => {
  return (dispatch) => {
    AsyncStorage.getItem(SESSION_KEY).then((data) => {
      if (data === null) return;
      dispatch(setCurrentUser(data));
    }).catch((error) => { console.log(error); });
  }
};

export const destroySession = () => {
  return (dispatch) => {
    AsyncStorage.removeItem(SESSION_KEY).then((data) => {
      dispatch(setCurrentUser(null));
    }).catch((error) => { console.log(error); });
  }
};
