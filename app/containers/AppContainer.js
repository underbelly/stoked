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

import Game from './GameContainer';
import Login from './LoginContainer';

class App extends Component {
  static propTypes = {
    stoked: React.PropTypes.shape({
      count: React.PropTypes.number,
      currentUser: React.PropTypes.obj
    }),
  };

  componentDidMount() {
    this.props.dispatch(getCount());
  }

  render() {
    const { dispatch, stoked } = this.props;

    return (
      <View style={{ flex: 1 }}>
        { stoked.currentUser && <Game
          count={ stoked.count }
          postCounter={ () => dispatch(postCount(stoked.count)) }
        /> }
        { !stoked.currentUser && <Login /> }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stoked: state.stokedReducer
  };
};

export default connect(mapStateToProps)(App);
