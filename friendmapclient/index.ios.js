import React, { Component } from 'react';
import Button from 'react-native-button';
import Hr from 'react-native-hr';
import { AppRegistry, Text, Image, View, StyleSheet, TextInput, ScrollView, Navigator, AlertIOS } from 'react-native';


class friendmapclient extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      username: '',
      password: ''
    };
  }
  
  _handlePress(event) {
    let username=this.state.username;
    let password=this.state.password;
    sendLogin(username, password);
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
          autoCorrect = {false}
          autoCapitalize = {'none'}
          maxLength = {16}
          onChangeText={(newtext) => this.setState({username: newtext})}
        />
        <TextInput
          style={{height: 40, top: 90, backgroundColor: "#f4f4f4", padding: 8}}
          secureTextEntry={true}
          placeholder="Password"
          autoCorrect = {false}
          autoCapitalize = {'none'}
          maxLength = {16}
          onChangeText={(newtext) => this.setState({password: newtext})}
        />
        <Button
          containerStyle={{padding:10, top: 100, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#4cdc94'}}
          style={{fontSize: 20, color: '#ffffff'}}
          onPress={() => this._handlePress()}
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

function sendLogin(username, password){
    console.log(username, password)
    fetch('http://45.55.166.191:3020/test', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));   
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

AppRegistry.registerComponent('friendmapclient', () => friendmapclient);
