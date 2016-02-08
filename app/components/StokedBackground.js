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

var AnimatedCircle = React.createClass({displayName: "Circle",
  render: function() {
    var radius = this.props.radius;
    var path = Path().moveTo(0, -radius)
        .arc(0, radius * 2, radius)
        .arc(0, radius * -2, radius)
        .close();
    return React.createElement(AnimatedShape, React.__spread({},  this.props, {d: path}));
  }
});

class StokedBackground extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      mountainAnim: new Animated.Value(0),
      boarderAnim: new Animated.Value(0),
    }
  }

  componentDidMount() {
    Gyroscope.startGyroUpdates();

    DeviceEventEmitter.addListener('GyroData', (data) => {
      let y = data.rotationRate.y.toFixed(3) * 25;

      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.mountainAnim, { toValue: y * 0.5 }),
          Animated.timing(this.state.boarderAnim, { toValue: y * 2 })
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
            top: 125,
            transform: [{
              translateX: this.state.mountainAnim
            }]
          }]}
        />

        <Animated.Image
          source={ require('image!snowboarder') }
          style={[ styles.images, {
            bottom: 75,
            transform: [{
              translateX: this.state.boarderAnim
            }]
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
