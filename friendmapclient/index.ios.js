import React, { Component } from 'react';
import Button from 'react-native-button';
import Hr from 'react-native-hr';
import { AppRegistry, StyleSheet, Text, TextInput, View } from 'react-native';

class TestProject extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <Text style={styles.title}>Friendmap</Text>
        <Text style={styles.subtitle}>Welcome</Text>
        <Text style={styles.paragraph}>Existing users sign in below</Text>
        <TextInput
          style={{height: 40, top: 80, backgroundColor: "#f4f4f4", padding: 8}}
          placeholder="Username"
        />
         <TextInput
          style={{height: 40, top: 90, backgroundColor: "#f4f4f4", padding: 8}}
          secureTextEntry={true}
          placeholder="Password"
        />
        <Button
        containerStyle={{padding:10, top: 100, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#4cdc94'}}
        style={{fontSize: 20, color: '#ffffff'}}
        >
        Login
      </Button>
        <Text style={styles.regSubtitle}>New to Friendmap?</Text>
        <Text style={styles.regParagraph}>Click below to register</Text>
        <Button
        containerStyle={{padding:10, top: 130, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#4cdc94'}}
        style={{fontSize: 20, color: '#ffffff'}}>
        Register
      </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#666666',
    fontSize: 30,
    top: 15,
  },
  subtitle: {
    color: '#666666',
    fontSize: 22,
    top: 70,
  },
  paragraph: {
    color: '#b2b2b2',
    fontSize: 15,
    top: 70,
  },
  regSubtitle: {
    color: '#666666',
    fontSize: 18,
    top: 120,
  },
  regParagraph: {
    color: '#b2b2b2',
    fontSize: 15,
    top: 120,
  },
  backgroundImage:{
    flex: 1,
    resizeMode: 'cover',
  }
});

AppRegistry.registerComponent('TestProject', () => TestProject);
