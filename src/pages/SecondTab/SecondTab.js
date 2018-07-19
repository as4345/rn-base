import React, { Component } from 'react'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

class SecondTab extends Component {
  constructor (props) {
    super(props)
  }
    static navigationOptions = {
      title: 'Welcome',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View>
          <Text>这是第SecondTab页</Text>
          <Button
            title="Go to second page"
            onPress={() =>
              navigate('Second', { name: 'Jane' })
            }
          />
        </View>
      );
    }
  }

  export default SecondTab