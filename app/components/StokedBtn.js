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

const {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get('window');

const AnimatedShape = Animated.createAnimatedComponent(Shape);
const EPIC_GREEN = '#00c775';
const EPIC_BLACK = '#000000';

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

class StokedBtn extends Component {
  static propTypes = {
    postCount: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      animate: new Animated.Value(0),
      animating: false,
    };
  }

  explode() {
    if (this.state.animating) return;

    this.props.postCount();
    this.setState({ animating: true });

    Animated.timing(this.state.animate, {
      duration: 1500,
      toValue: 40,
    }).start(() => {
      this.state.animate.setValue(0);
      this.setState({ animating: false });
    });
  }

  render() {
    let buttonBG = this.state.animate.interpolate({
      inputRange: [0, 0.1, 40],
      outputRange: [EPIC_BLACK, EPIC_GREEN, EPIC_BLACK],
    });

    let circleOpacity = this.state.animate.interpolate({
      inputRange: [0, 0.1, 20],
      outputRange: [ 0, 0.2, 0 ],
    });

    let circleScale = this.state.animate.interpolate({
      inputRange: [0, 40],
      outputRange: [ 1, 200 ],
    });

    return (
      <View style={ styles.container }>
				<Surface style={ styles.surface } width={ deviceWidth } height={ deviceHeight }>
          <AnimatedCircle
            x={ deviceWidth / 2 }
            y={ deviceHeight / 2 }
            radius={ 100 }
            scale={ circleScale }
            fill={ EPIC_GREEN }
            opacity={ circleOpacity }
          />
				</Surface>
        <TouchableWithoutFeedback onPress={ () => this.explode() }>
          <Animated.View style={[{ backgroundColor: buttonBG }, styles.btnContainer ]}>
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

  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.35,
    shadowRadius: 50,
    borderRadius: 200,
    position: 'absolute',
    left: (deviceWidth / 2) - 100,
    top: (deviceHeight / 2) - 100,
  },

  surface: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
  },

  btnTxt: {
    fontSize: 32,
    letterSpacing: 3,
    color: '#fff',
    fontFamily: 'Futura-Medium',
  },
})

export default StokedBtn;
