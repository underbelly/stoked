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
  Easing,
} from 'react-native';

import { Surface } from 'gl-react-native';
import { connect } from 'react-redux/native';

import numUtils from '../utils/num';
import AnimatedProgress from './AnimatedProgress';
import Explode from './Explode';
import { postScore, getCount } from '../actions/StokedActions';

const {
  width: deviceWidth,
  height: deviceHeight,
} = Dimensions.get('window');

const BTN_SIZE = parseInt((deviceWidth*0.6).toFixed(0));
const BTN_RADIUS = BTN_SIZE / 2;
const EPIC_GREEN = 'rgb(0,199,117)';
const EPIC_BLACK = 'rgb(0,0,0)';
const ACTION_TIMER_MIN = 250;
const ACTION_TIMER_MAX = 500;

class StokedBtn extends Component {
  static propTypes = {
    postScore: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
      lastScoreAnimation: new Animated.Value(1),
      actionTimer: numUtils.getRandomInt(ACTION_TIMER_MIN,ACTION_TIMER_MAX),
      showScore: false,
      lastScore: 0,
    }
  }

  componentWillUnMount() {
    clearTimeout(this.explodeTimer)
    this.setState({ explode: false })
  }

  onPressOut() {
    this.state.progress.stopAnimation((value) => {
      let displayValue = (value * 100).toFixed(2)
      this.props.postScore(value)

      this.setState({
        lastScore: displayValue,
        showScore: true,
        actionTimer: numUtils.getRandomInt(ACTION_TIMER_MIN,ACTION_TIMER_MAX),
        explode: true,
      })
    })

    this.state.progress.setValue(0)
    this.lastScoreAnimation()
    this.explodeTimer = setTimeout(() => this.setState({ explode: false, showScore: false }), 1000)
  }

  onPressIn() {
    clearTimeout(this.explodeTimer)
    this.state.lastScoreAnimation.setValue(1)
    this.setState({ explode: false, showScore: false, })
    this.progressAnimation()
  }

  progressAnimation() {
    Animated.sequence([
      Animated.timing(this.state.progress, { duration: this.state.actionTimer, toValue: 1 }),
      Animated.timing(this.state.progress, { duration: this.state.actionTimer, toValue: 0 }),
    ]).start((e) => {
      if (e.finished) this.progressAnimation()
    })
  }

  lastScoreAnimatedSize() {
    return this.state.lastScoreAnimation.interpolate({
      inputRange: [0, 0.15, 0.5],
      outputRange: [1, 1.1, 1.15],
    })
  }

  lastScoreAnimation() {
    Animated.timing(this.state.lastScoreAnimation, {
      duration: 1000,
      easing: Easing.easeIn,
      toValue: 0
    }).start()
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
              { !this.state.showScore && <Text style={ styles.btnTxt }>STOKED</Text> }
              { this.state.showScore &&
                <Animated.Text style={[
                  styles.btnTxt,
                  {
                    opacity: this.state.lastScoreAnimation,
                    transform: [{ scale: this.lastScoreAnimatedSize() }]
                  }
                ]} >
                  { `${this.state.lastScore}%` }
                </Animated.Text>
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnContainer: {
    backgroundColor: '#000',
    height: BTN_SIZE,
    width: BTN_SIZE,
    borderRadius: BTN_SIZE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },

  progressContainer: {
    transform: [{ rotate: '-90deg' }],
    borderRadius: BTN_SIZE,
    overflow: 'hidden',
  },

  btnTxt: {
    fontSize: deviceWidth <= 320 ? 21 : 32,
    letterSpacing: 3,
    color: '#fff',
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

const mapStateToProps = (state) => ({
  stoked: state.stokedReducer,
  currentUser: state.sessionReducer,
})

const mapActionsToProps = (dispatch) => ({
  postScore: (score) => dispatch(postScore(score)),
})

export default connect(mapStateToProps, mapActionsToProps)(StokedBtn)
