'use strict';

import {
  SET_HIGH_SCORE,
  LOADED
} from '../actions/StokedActions';

let StokedState = {
  highScore: 0,
  loaded: false,
}

export default (state = StokedState, action) => {
  switch(action.type) {
    case SET_HIGH_SCORE:
      return { ...state, highScore: action.highScore }
    case LOADED:
      return { ...state, loaded: true }
    default:
      return state;
  }
};
