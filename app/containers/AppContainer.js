'use strict';

import React, {
  Component,
  PropTypes,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import { connect } from 'react-redux/native';
import { bindActionCreators } from 'redux';
import stokedActions, { postCount, getCount } from '../actions/StokedActions';

import sessionActions, {
  getSession,
  setSession,
  destroySession,
} from '../actions/SessionActions';

import Game from './GameContainer';
import Login from './LoginContainer';

class App extends Component {
  static propTypes = {
    stoked: React.PropTypes.shape({
      count: React.PropTypes.number,
      loaded: React.PropTypes.bool,
    }),
    currentUser: React.PropTypes.shape({
      username: React.PropTypes.string
    })
  };

  componentWillMount() {
    this.props.dispatch(getSession());
  }

  render() {
    const { dispatch, stoked, currentUser } = this.props;

    return (
      <View style={{ flex: 1 }}>
        { currentUser.username !== null && stoked.loaded && <Game
          highScore={ stoked.highScore }
          postScore={ (score) => dispatch(postScore(currentUser.username, score)) }
          destroySession={ () => dispatch(destroySession()) }
        /> }
        { currentUser.username === null && stoked.loaded && <Login
          setSession={ (twitterData) => dispatch(setSession(twitterData)) }
        /> }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stoked: state.stokedReducer,
    currentUser: state.sessionReducer
  };
};

export default connect(mapStateToProps)(App);
