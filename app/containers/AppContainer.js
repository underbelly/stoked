'use strict';

import React, {
  Component,
  PropTypes,
  Text,
  View,
  StyleSheet,
  Image,
	DeviceEventEmitter,
  Animated,
  Easing
} from 'react-native';

import { connect } from 'react-redux/native';
import { bindActionCreators } from 'redux';
import { Gyroscope } from 'NativeModules';

import stokedActions, { postCount, getCount } from '../actions/StokedActions';
import StokedBtn from '../components/StokedBtn';
import StokedCount from '../components/StokedCount';
import StokedBackground from '../components/StokedBackground';

Gyroscope.setGyroUpdateInterval(0.1);

class App extends Component {
  static propTypes = {
    stoked: React.PropTypes.shape({
      count: React.PropTypes.number
    }),
  };

  componentDidMount() {
    this.props.dispatch(getCount());
  }

  render() {
    const { dispatch, stoked } = this.props;

    return (
      <View style={ styles.container }>
        <StokedBackground />
        <StokedBtn postCount={ () => dispatch(postCount(stoked.count)) }/>
        <StokedCount count={ stoked.count } />
        <Image source={ require('image!badge') } style={ styles.badge }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  badge: {
    height: 75,
    width: 75,
    position: 'absolute',
    top: 36,
    left: 16,
  },
});

const mapStateToProps = (state) => {
  return {
    stoked: state.stokedReducer
  };
};

export default connect(mapStateToProps)(App);
