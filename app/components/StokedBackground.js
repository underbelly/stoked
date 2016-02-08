'use strict';

import React, {
  Component,
  PropTypes,
  Image,
  DeviceEventEmitter,
  Animated,
  Easing,
  View,
  StyleSheet
} from 'react-native';

import { Gyroscope } from 'NativeModules';

Gyroscope.setGyroUpdateInterval(0.1);

class StokedBackground extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      mountainAnim: new Animated.ValueXY(),
      boarderAnim: new Animated.ValueXY(),
    }
  }

  componentDidMount() {
    Gyroscope.startGyroUpdates();

    DeviceEventEmitter.addListener('GyroData', (data) => {
      let y = data.rotationRate.y.toFixed(3) * 25;
      let x = data.rotationRate.x.toFixed(3) * 25;

      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.mountainAnim, { toValue: { y: x*0.75, x: y*0.75 }}),
          Animated.timing(this.state.boarderAnim, { toValue: { y: x*0.75, x: y*1.25 }})
        ])
      ]).start();
    });
  }

  render() {
    return (
      <View style={ styles.container }>
        <Animated.Image
          source={ require('image!mountains') }
          style={[ styles.images, {
            top: 100,
            transform: this.state.mountainAnim.getTranslateTransform()
          }]}
        />

        <Animated.Image
          source={ require('image!snowboarder') }
          style={[ styles.images, {
            bottom: 75,
            transform: this.state.boarderAnim.getTranslateTransform()
          }]}
        />
      </View>
    );
  }
}

const styles= StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  images: {
    position: 'absolute',
    left: -50,
  }
});

export default StokedBackground;
