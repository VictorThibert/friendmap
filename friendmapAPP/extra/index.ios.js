import React, { Component } from 'react';
import Button from 'react-native-button';
import { AppRegistry, Text, TextInput, View } from 'react-native';

class TestProject extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Username"
        />
         <TextInput
          style={{height: 40}}
          placeholder="Password"
        />
        <Button
        containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#5BC0BE'}}
        style={{fontSize: 20, color: '#ffffff'}}>
        Login
      </Button>
        <Button
        containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#5BC0BE'}}
        style={{fontSize: 20, color: '#ffffff'}}>
        Register
      </Button>
      </View>
    );
  }
}

AppRegistry.registerComponent('TestProject', () => TestProject);
