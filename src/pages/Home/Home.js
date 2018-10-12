import React, { Component } from 'react'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

class Home extends Component {
    static navigationOptions = {
      title: 'Welcome',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View>
          <Text>这是第一一页</Text>
          <Button
            title="Go to HomeTab page"
            onPress={() =>{navigate('HomeTab', { name: 'Jane' })}}
          />
        </View>
      );
    }
  }

  export default Home