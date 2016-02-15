'use strict';

import {
  INCREMENT_COUNT,
  LOADED
} from '../actions/StokedActions';

let StokedState = {
  highScore: 0,
  loaded: false,
}

export default (state = StokedState, action) => {
  switch(action.type) {
    case INCREMENT_COUNT:
      return { ...state, highScore: action.highScore }
    case LOADED:
      return { ...state, loaded: true }
    default:
      return state;
  }
};
