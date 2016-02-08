'use strict';

import React, {
  Component,
  Animated,
  Easing,
  Dimensions,
  StyleSheet
} from 'react-native';

import Art, {
  Surface,
  Group,
  Shape,
  Path,
} from 'ReactNativeART';

import AnimatedCircle from './AnimatedCircle.js';

const {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get('window');

const NUM_SNOWFLAKES = 50;
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

class Snowflakes extends Component {
  shouldComponentUpdate() { return false; }

  translateSnowflake(y, x, translate) {
    const move = () => {
      const newY = getRandomInt(y-50, y+50);
      const newX = getRandomInt(x-50, x+50);

      Animated.timing(translate, {
        toValue: {
          x: getRandomInt(x, newX),
          y: getRandomInt(y, newY)
        },
        duration: 8000,
        easing: Easing.elastic(1),
      }).start();

      setTimeout(move, 8000);
    }

    return move();
  }

  renderFlakes() {
    return [...Array(NUM_SNOWFLAKES).keys()].map((v, i, t) => {
      const size = getRandomInt(0, 10);
      const y = getRandomInt(0, deviceHeight);
      const x = parseInt(getRandomInt(0, deviceWidth));
      const translate = new Animated.ValueXY({x: x, y: y});

      this.translateSnowflake(y, x, translate);

      return (
        <AnimatedCircle
          key={ i }
          x={ translate.x }
          y={ translate.y }
          radius={ size }
          scale={ 0.3 }
          fill={ 'rgba(0,0,0,0.1)' }
          opacity={ 1 }
        />
      );
    })
  }

  render() {
    return (
      <Surface style={ styles.surface } width={ deviceWidth } height={ deviceHeight }>
        { this.renderFlakes() }
      </Surface>
    );
  }
}

const styles= StyleSheet.create({
  surface: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
});

export default Snowflakes;
