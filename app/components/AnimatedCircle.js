'use strict';

import React, { Animated } from 'react-native';
import Art, { Path, Shape } from 'ReactNativeART';

const AnimatedShape = Animated.createAnimatedComponent(Shape);

const AnimatedCircle = React.createClass({displayName: "Circle",
  render() {
    let radius = this.props.radius;
    let path = Path().moveTo(0, -radius)
        .arc(0, radius * 2, radius)
        .arc(0, radius * -2, radius)
        .close();
    return React.createElement(AnimatedShape, React.__spread({},  this.props, {d: path}));
  }
});

export default AnimatedCircle;
