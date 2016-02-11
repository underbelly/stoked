'use strict';

import { combineReducers } from 'redux';

import stokedReducer from './StokedReducer';
import sessionReducer from './SessionReducer';

export default combineReducers({ stokedReducer, sessionReducer });
