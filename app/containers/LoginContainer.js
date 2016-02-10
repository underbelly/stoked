'use strict';

import React, {
  View,
  Text,
  Component,
  StyleSheet,
  PropTypes,
  TouchableHighlight
} from 'react-native';

import simpleAuthClient from 'react-native-simple-auth';
import secrets from '../../secrets';

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
        <TouchableHighlight
          onPress={ () => this.login() }
        >
          <Text>Twitter</Text>
        </TouchableHighlight>
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
