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

const {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get('window');

const BTN_SIZE = parseInt((deviceWidth*0.6).toFixed(0));
const BTN_RADIUS = BTN_SIZE / 2;
const EPIC_GREEN = '#00c775';
const EPIC_BLACK = '#000000';

const getRandomFloat = () => parseFloat((Math.random() * (1.75 - 2.25) + 2.25).toFixed(2));
const getRandomInt = () => Math.floor(Math.random() * (20 - 1)) + 1;

class StokedBtn extends Component {
  static propTypes = {
    postCount: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      animate: new Animated.Value(0),
    };
  }

  explode() {
    this.props.postCount();

    Animated.timing(this.state.animate, {
      duration: 1500,
      toValue: 40,
    }).start(() => {
      this.state.animate.setValue(0);
    });
  }

  renderRandomCircles(num) {
    let circleAnim = {
      moveX: this.state.animate.interpolate({
        inputRange: [0, getRandomInt(), 40],
        outputRange: [ (deviceWidth/2), (deviceWidth/getRandomFloat()), (deviceWidth/2)
      ]}),
      moveY: this.state.animate.interpolate({
        inputRange: [0, getRandomInt(), 40],
        outputRange: [ (deviceHeight/2), (deviceHeight/getRandomFloat()), (deviceHeight/2)
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
      outputRange: [ 1, 20 ],
    });

    return (
      <View style={ styles.container }>
				<Surface style={ styles.surface } width={ deviceWidth } height={ deviceHeight }>
          <AnimatedCircle
            x={ deviceWidth / 2 }
            y={ deviceHeight / 2 }
            radius={ BTN_RADIUS }
            scale={ circleScale }
            fill={ EPIC_GREEN }
            opacity={ circleOpacity }
          />
          { [...Array(6).keys()].map((num) => this.renderRandomCircles(num)) }
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
    fontFamily: 'Futura-Medium',
  },
})

export default StokedBtn;
