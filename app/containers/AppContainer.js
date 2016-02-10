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
      currentUser: React.PropTypes.obj
    }),
  };

  componentWillMount() {
    this.props.dispatch(getSession());
  }

  componentDidMount() {
    this.props.dispatch(getCount());
  }

  render() {
    const { dispatch, stoked, currentUser } = this.props;

    return (
      <View style={{ flex: 1 }}>
        { currentUser.username !== null && <Game
          count={ stoked.count }
          postCounter={ () => dispatch(postCount(stoked.count)) }
          destroySession={ () => dispatch(destroySession()) }
        /> }
        { currentUser.username === null && <Login
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
