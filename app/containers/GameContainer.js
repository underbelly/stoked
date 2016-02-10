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

import StokedBtn from '../components/StokedBtn';
import StokedCount from '../components/StokedCount';
import StokedBackground from '../components/StokedBackground';
import Snowflakes from '../components/Snowflakes';

class Game extends Component {
  static propTypes = {
    count: React.PropTypes.number,
    postCounter: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <View style={ styles.container }>
        <StokedBackground />
        <StokedBtn postCount={ () => this.props.postCounter() }/>
        <StokedCount count={ this.props.count } />
        <Image source={ require('image!badge') } style={ styles.badge }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  badge: {
    height: 75,
    width: 75,
    position: 'absolute',
    top: 36,
    left: 16,
  },
});

export default Game;
