'use strict';

import React, {
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  PropTypes,
  Animated,
  Component,
  Dimensions,
} from 'react-native';

import { Surface } from 'gl-react-native';

import numUtils from '../utils/num';
import AnimatedProgress from './AnimatedProgress';
import Explode from './Explode';

const {
  width: deviceWidth,
  height: deviceHeight,
} = Dimensions.get('window');

const BTN_SIZE = parseInt((deviceWidth*0.6).toFixed(0));
const BTN_RADIUS = BTN_SIZE / 2;
const EPIC_GREEN = 'rgb(0,199,117)';
const EPIC_BLACK = 'rgb(0,0,0)';
const ACTION_TIMER_MIN = 500;
const ACTION_TIMER_MAX = 1000;

class StokedBtn extends Component {
  static propTypes = {
    postScore: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
      actionTimer: numUtils.getRandomInt(ACTION_TIMER_MIN,ACTION_TIMER_MAX)
    };
  }

  componentWillUnMount() {
    clearTimeout(this.explodeTimer);
    this.setState({ explode: false });
  }

  onPressOut() {
    this.state.progress.stopAnimation((value) => console.log(value));
    this.state.progress.setValue(0);
    this.setState({
      actionTimer: numUtils.getRandomInt(ACTION_TIMER_MIN,ACTION_TIMER_MAX),
      explode: true,
    });

    this.explodeTimer = setTimeout(() => this.setState({ explode: false }), 1500);
  }

  onPressIn() {
    clearTimeout(this.explodeTimer);
    this.setState({ explode: false });

    Animated.sequence([
      Animated.timing(this.state.progress, { duration: this.state.actionTimer, toValue: 1 }),
      Animated.timing(this.state.progress, { duration: this.state.actionTimer, toValue: 0 }),
    ]).start((e) => {
      if (e.finished) this.onPressIn();
    })
  }

  getProgressStyles() {
    return this.state.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, BTN_RADIUS * 2]
    });
  }

  render() {
    return (
      <View style={ styles.container }>
        { this.state.explode && <Explode /> }
        <TouchableWithoutFeedback
          onPressIn={ () => this.onPressIn() }
          onPressOut={ () => this.onPressOut() }
        >
          <View style={ styles.btnContainer }>
            <View style={ styles.progressContainer }>
              <Surface
                width={ BTN_SIZE }
                height={ BTN_SIZE }
                backgroundColor="transparent"
                eventsThrough
              >
                <AnimatedProgress progress={ this.state.progress }/>
              </Surface>
            </View>

            <View style={ styles.circleInside }>
              <Text style={ styles.btnTxt }>STOKED</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  bgFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: BTN_RADIUS * 2,
    backgroundColor: EPIC_GREEN,
  },

  btnContainer: {
    alignItems: 'center',
    backgroundColor: '#000',
    justifyContent: 'center',
    overflow: 'hidden',
    height: BTN_SIZE,
    width: BTN_SIZE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.35,
    shadowRadius: 50,
    borderRadius: BTN_SIZE,
    position: 'absolute',
    left: (deviceWidth / 2) - BTN_RADIUS,
    top: (deviceHeight / 2) - BTN_RADIUS,
  },

  progressContainer: { transform: [{ rotate: '-90deg' }] },

  surface: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
  },

  btnTxt: {
    fontSize: deviceWidth <= 320 ? 21 : 32,
    letterSpacing: 3,
    color: '#fff',
    backgroundColor: 'transparent',
    fontFamily: 'Futura-Medium',
  },

  circleInside: {
    borderRadius: BTN_SIZE,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 7.5,
    left: 7.5,
    right: 7.5,
    bottom: 7.5,
  },
})

export default StokedBtn;
