'use strict';

import {
  SET_CURRENT_USER
} from '../actions/SessionActions';

let SessionState = {
  username: null,
  highscore: null,
}

export default (state = SessionState, action) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return { ...state, username: action.username }
    default:
      return state;
  }
};
