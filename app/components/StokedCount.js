'use strict';

import React, {
  Text,
  StyleSheet,
  PropTypes,
  View,
} from 'react-native';

const StokedCount = ({ count }) => (
  <View style={ styles.container }>
    <Text style={ styles.stokeCount }>STOKED COUNT: { count }</Text>
  </View>
)

StokedCount.propTypes = {
  count: React.PropTypes.number,
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingVertical: 20,
    backgroundColor: 'transparent'
  },

  stokeCount: {
    fontFamily: 'Futura-Medium',
    lineHeight: 20,
  }
});

export default StokedCount;
