'use strict';

import React, {
  View,
  Text,
  Component,
  StyleSheet,
  PropTypes
} from 'react-native';

import simpleAuthClient from 'react-native-simple-auth';
import secrets from '../../secrets';

class Login extends Component {
  static propTypes = {};

  componentWillMount() {
    simpleAuthClient.configure(secrets);
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text>Login</Text>
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
});

export default Login;
