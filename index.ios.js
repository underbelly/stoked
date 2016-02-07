'use strict';

import React, { AppRegistry, Component } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux/native';
import thunk from 'redux-thunk';

import App from './app/containers/AppContainer';
import reducers from './app/reducers';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(reducers);

class stoked extends Component {
  render() {
    return (
      <Provider store={ store }>
        { () => <App /> }
      </Provider>
    );
  }
}

AppRegistry.registerComponent('stoked', () => stoked);
