'use strict';

import React, {
  Text,
  StyleSheet,
  PropTypes,
  View,
} from 'react-native';

const StokedCount = ({ count }) => (
  <View style={ styles.container }>
    <Text style={ styles.stokeCount }>Stoked Count: { count }</Text>
  </View>
)

StokedCount.propTypes = {
  count: React.PropTypes.number,
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingVertical: 20
  },

  stokeCount: {
    fontFamily: 'Futura-Medium',
    lineHeight: 20,
  }
});

export default StokedCount;
