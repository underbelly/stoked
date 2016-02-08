'use strict';

import React, {
  Text,
  StyleSheet,
  PropTypes,
  View,
} from 'react-native';

const StokedCount = ({ count }) => (
  <View style={ styles.container }>
    <Text style={[ styles.stokedTxt, { fontSize: 40 }]}>{ count }</Text>
    <Text style={ styles.stokedTxt }>STOKED LEVEL</Text>
  </View>
)

StokedCount.propTypes = {
  count: React.PropTypes.number,
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    backgroundColor: 'transparent',
  },

  stokedTxt: {
    fontFamily: 'Futura-Medium',
    textAlign: 'center',
  },
});

export default StokedCount;
