'use strict';

import React, {
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  PropTypes,
  Animated,
  Component,
} from 'react-native';

const EPIC_GREEN = '#00c775';
const EPIC_BLACK = '#000000';

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
      toValue: 34,
    }).start(() => {
      this.state.animate.setValue(0);
      this.setState({ animating: false });
    });
  }

  render() {
    let buttonBG = this.state.animate.interpolate({
      inputRange: [0, 19, 34],
      outputRange: [EPIC_BLACK, EPIC_GREEN, EPIC_BLACK],
      extrapolate: 'clamp'
    });

    return (
      <View style={ styles.container }>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },

  btnTxt: {
    fontSize: 32,
    letterSpacing: 3,
    color: '#fff',
    fontFamily: 'Futura-Medium',
  },
})

export default StokedBtn;
