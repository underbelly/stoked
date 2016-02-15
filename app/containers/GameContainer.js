'use strict';

import React, {
  Component,
  PropTypes,
  View,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';

import StokedBtn from '../components/StokedBtn';
import StokedCount from '../components/StokedCount';
import StokedBackground from '../components/StokedBackground';
import Snowflakes from '../components/Snowflakes';

class Game extends Component {
  static propTypes = {
    highScore: React.PropTypes.number,
    postScore: React.PropTypes.func.isRequired,
    destroySession: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <View style={ styles.container }>
        <StokedBackground />
        <StokedBtn postScore={ (score) => this.props.postScore(score) }/>
        <StokedCount highScore={ this.props.highScore } />
        <TouchableHighlight
          underlayColor='transparent'
          style={ styles.badge }
          onPress={ () => this.props.destroySession() }
        >
          <Image source={ require('image!badge') } style={ styles.img } />
        </TouchableHighlight>
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

  img: {
    height: 75,
    width: 75,
  }
});

export default Game;
