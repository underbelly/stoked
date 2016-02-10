'use strict';

import React, {
  View,
  Text,
  Component,
  StyleSheet,
  PropTypes,
  Dimensions,
  Image,
  TouchableHighlight
} from 'react-native';

import simpleAuthClient from 'react-native-simple-auth';
import secrets from '../../secrets';

const {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get('window');

class Login extends Component {
  static propTypes = {};

  componentWillMount() {
    simpleAuthClient.configure(secrets);
  }

  login() {
    simpleAuthClient.authorize('twitter')
    .then((data) => this.props.setSession(data) )
    .catch((error) => { console.log(error) })
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.badge }>
          <Image source={ require('image!badge') } />
        </View>

        <View style={ styles.btnContainer }>
          <TouchableHighlight
            style={ styles.btn }
            onPress={ () => this.login() }
          >
            <Text style={ styles.btnTxt }>FACEBOOK</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={ styles.btn }
            onPress={ () => this.login() }
          >
            <Text style={ styles.btnTxt }>TWITTER</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
  },

  badge: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnContainer: {
    paddingBottom: 22,
    paddingHorizontal: 30,
    width: deviceWidth,
  },

  btn: {
    marginBottom: 8,
    backgroundColor: '#000',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.35,
    shadowRadius: 13,
  },

  btnTxt: {
    color: '#fff',
    fontFamily: 'Futura-Medium',
  },
});

export default Login;
