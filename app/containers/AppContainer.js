'use strict';

import React, {
  Component,
  PropTypes,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import { connect } from 'react-redux/native';
import { postCount, getCount } from '../actions/StokedActions';
import { getSession, setSession, destroySession } from '../actions/SessionActions';

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
    this.props.getSession();
  }

  render() {
    const { stoked, currentUser } = this.props;

    return (
      <View style={{ flex: 1 }}>
        { currentUser.username !== null && stoked.loaded && <Game
          highScore={ stoked.highScore }
          destroySession={ () => this.props.destroySession() }
        /> }
        { currentUser.username === null && stoked.loaded && <Login
          setSession={ (twitterData) => this.props.setSession(twitterData) }
        /> }
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  stoked: state.stokedReducer,
  currentUser: state.sessionReducer
})

const mapActionsToProps = (dispatch) => ({
  setSession: (twitterData) => dispatch(setSession(twitterData)),
  destroySession: () => dispatch(destroySession()),
  getSession: () => dispatch(getSession()),
})

export default connect(mapStateToProps, mapActionsToProps)(App);
