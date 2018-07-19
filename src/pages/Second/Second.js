import React, { Component } from 'react'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

class Second extends Component {
    static navigationOptions = {
      title: 'Welcome',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View>
          <Text>这是第二页</Text>
          <Button
            title="Go to SecondTab page"
            onPress={() =>
              navigate('SecondTab', { name: 'Jane' })
            }
          />
        </View>
        
      );
    }
  }

  export default Second