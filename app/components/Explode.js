/* @flow */
'use strict';

import React, {
  Component,
  PropTypes,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Art, {
  Surface,
  Group,
  Shape,
  Path,
} from 'ReactNativeART';

const {
  width: deviceWidth,
  height: deviceHeight,
} = Dimensions.get('window');

const BTN_SIZE = parseInt((deviceWidth*0.6).toFixed(0));
const BTN_RADIUS = BTN_SIZE / 2;
const EPIC_GREEN = 'rgb(0,199,117)';
const EPIC_BLACK = 'rgb(0,0,0)';

import numUtils from '../utils/num';
import AnimatedCircle from './AnimatedCircle.js';

class Explode extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = { animate: new Animated.Value(0) };
  }

  componentDidMount() {
    Animated.timing(this.state.animate, {
      duration: 1500,
      toValue: 40,
    }).start(() => {
      this.state.animate.setValue(0);
    });
  }

  getBtnStyles() {
    return this.state.animate.interpolate({
      inputRange: [0, 0.1, 40],
      outputRange: [EPIC_BLACK, EPIC_GREEN, EPIC_BLACK],
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
    );
  }
}

const styles = StyleSheet.create({
  surface: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
})

export default Explode;
