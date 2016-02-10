'use strict';

import {
  INCREMENT_COUNT
} from '../actions/StokedActions';

let StokedState = { count: 0 }

export default (state = StokedState, action) => {
  switch(action.type) {
    case INCREMENT_COUNT:
      return { ...state, count: action.count }
    default:
      return state;
  }
};
