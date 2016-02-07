'use strict';

import React, {
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

const StokedBtn = ({ postCount }) => {
  return (
    <TouchableHighlight
      style={ styles.btn }
      underlayColor='#000'
      activeOpacity={ 0.75 }
      onPress={ postCount }
    >
      <Text style={ styles.btnTxt }>STOKED</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 200,
    height: 200,
    width: 200,
    justifyContent: 'center',
  },

  btnTxt: {
    fontSize: 32,
    letterSpacing: 3,
    color: '#fff',
    fontFamily: 'Futura-Medium',
  },
});

export default StokedBtn;
