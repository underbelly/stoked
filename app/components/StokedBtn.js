'use strict';

import React, {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  PropTypes,
} from 'react-native';

const StokedBtn = ({ postCount }) => (
  <View style={ styles.container }>
    <View style={ styles.btnShadow }>
      <TouchableHighlight
        style={ styles.btn }
        underlayColor='#000'
        activeOpacity={ 0.75 }
        onPress={ postCount }
      >
        <Text style={ styles.btnTxt }>STOKED</Text>
      </TouchableHighlight>
    </View>
  </View>
)

StokedBtn.propTypes = {
  postCount: React.PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.35,
    shadowRadius: 50,
    borderRadius: 200,
  },

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
})

export default StokedBtn;
