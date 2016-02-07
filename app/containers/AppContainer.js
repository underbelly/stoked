'use strict';

import React, {
  Component,
  PropTypes,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux/native';
import { bindActionCreators } from 'redux';

import stokedActions, { postCount, getCount } from '../actions/StokedActions';
import StokedBtn from '../components/StokedBtn';

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
        <StokedBtn postCount={ () => dispatch(postCount(stoked.count)) }/>
        <Text style={ styles.stokeCount }>Stoked Count: { stoked.count }</Text>
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

  stokeCount: {
    fontFamily: 'Futura-Medium',
  },
});

const mapStateToProps = (state) => {
  return {
    stoked: state.stokedReducer
  };
};

export default connect(mapStateToProps)(App);
