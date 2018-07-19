import React, { Component } from 'react'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';

class HomeTab extends Component {
  static navigationOptions = {
    title: 'Welcome',
  }
  state = {
    text: ''
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View>
        <Text>这是第HomeTab页</Text>
        <Button
          title="Go to home page"
          onPress={() =>
            navigate('Home', { name: 'Jane' })
          }
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Text>{this.state.text}</Text>
      </View>
    );
  }
}

export default HomeTab