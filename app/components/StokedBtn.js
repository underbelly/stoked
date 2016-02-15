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

import Art, {
  Surface,
  Group,
  Shape,
  Path,
} from 'ReactNativeART';

import AnimatedCircle from './AnimatedCircle.js';
import numUtils from '../utils/num';

const {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get('window');

const BTN_SIZE = parseInt((deviceWidth*0.6).toFixed(0));
const BTN_RADIUS = BTN_SIZE / 2;
const EPIC_GREEN = 'rgb(0,199,117)';
const EPIC_BLACK = 'rgb(0,0,0)';
const ACTION_TIMER_MIN = 250;
const ACTION_TIMER_MAX = 1000;

class StokedBtn extends Component {
  static propTypes = {
    postScore: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      animate: new Animated.Value(0),
      pressAction: new Animated.Value(0),
      actionTimer: numUtils.getRandomInt(ACTION_TIMER_MIN,ACTION_TIMER_MAX)
    };
  }

  explode() {
    // Set the press animation back to 0 (could be 0-1)
    this.state.pressAction.setValue(0);

    // When we explode reset the action timer to a random number.
    this.setState({ actionTimer: numUtils.getRandomInt(ACTION_TIMER_MIN,ACTION_TIMER_MAX) });

    // Animate!
    // Animation lasts 1500s and has 40 frames, when animation is done reset to 0.
    Animated.timing(this.state.animate, {
      duration: 1500,
      toValue: 40,
    }).start(() => {
      this.state.animate.setValue(0);
    });
  }

  onPressIn() {
    // Animate!
    // Duration: is random based on the action timer so that it isn't the same every time,
    // ToValue: goes from 0-1 (for percentage calculation)
    // onEnd: post the high score if the animation didn't finish

    // TODO: if animation did finish show some type of youve busted feedback
    // TODO: if it is a high score show some kind of new highschore feedback and update the stoked level
    // TODO: post the high score
    Animated.timing(this.state.pressAction, {
      duration: this.state.actionTimer,
      toValue: 1
    }).start((e) => {
      if (!e.finished) {
        let score = (this.state.pressAction._value * 100).toFixed(2);
        this.props.postScore(parseFloat(score));
      };
    });
  }

  getExplodeStyles() {
    let circleOpacity = this.state.animate.interpolate({
      inputRange: [0, 0.1, 20],
      outputRange: [ 0, 0.2, 0 ],
    });

    let circleScale = this.state.animate.interpolate({
      inputRange: [0, 40],
      outputRange: [ 1, 20 ],
    });
    return {
      circleScale: circleScale,
      circleOpacity: circleOpacity,
    }
  }

  getBtnStyles() {
    return this.state.animate.interpolate({
      inputRange: [0, 0.1, 40],
      outputRange: [EPIC_BLACK, EPIC_GREEN, EPIC_BLACK],
    });
  }

  getProgressStyles() {
    return this.state.pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: [0, BTN_RADIUS * 2]
    });
  }

  renderRandomCircles(num) {
    let circleAnim = {
      moveX: this.state.animate.interpolate({
        inputRange: [0, numUtils.getRandomInt(1,20), 40],
        outputRange: [ (deviceWidth/2), (deviceWidth/numUtils.getRandomFloat(1.75,2.25)), (deviceWidth/2)
      ]}),
      moveY: this.state.animate.interpolate({
        inputRange: [0, numUtils.getRandomInt(1,20), 40],
        outputRange: [ (deviceHeight/2), (deviceHeight/numUtils.getRandomFloat(1.75,2.25)), (deviceHeight/2)
      ]}),
      stroke: this.state.animate.interpolate({
        inputRange: [ 0, 0.1, 20, 40 ],
        outputRange: [ 0, 2, 0, 0 ]
      }),
    };

    return (
      <AnimatedCircle
        key={ num }
        x={ circleAnim.moveX }
        y={ circleAnim.moveY }
        radius={ BTN_RADIUS }
        scale={ 1 }
        strokeWidth={ circleAnim.stroke }
        stroke={ EPIC_GREEN }
        opacity={ 1 }
      />
    );
  }

  render() {
    return (
      <View style={ styles.container }>
				<Surface style={ styles.surface } width={ deviceWidth } height={ deviceHeight }>
          <AnimatedCircle
            x={ deviceWidth / 2 }
            y={ deviceHeight / 2 }
            radius={ BTN_RADIUS }
            scale={ this.getExplodeStyles().circleScale }
            fill={ EPIC_GREEN }
            opacity={ this.getExplodeStyles().circleOpacity }
          />
          { [...Array(6).keys()].map((num) => this.renderRandomCircles(num)) }
				</Surface>
        <TouchableWithoutFeedback
          onPressIn={ () => this.onPressIn() }
          onPressOut={ () => this.explode() }
        >
          <Animated.View style={[{ backgroundColor: this.getBtnStyles() }, styles.btnContainer ]}>
            <Animated.View style={[ styles.bgFill, {  height: this.getProgressStyles() }]}/>
            <Text style={ styles.btnTxt }>STOKED</Text>
          </Animated.View>
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
})

export default StokedBtn;
