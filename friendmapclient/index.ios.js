  import React, { Component, LA } from 'react';
  import { AppRegistry, Text, Image, View, StyleSheet, TextInput, ScrollView, Navigator, AlertIOS } from 'react-native';
  import Button from 'react-native-button';

  class friendmapclient extends Component {
    _handlePress(event) {
      let username=this.state.username;
      let password=this.state.password;
      console.log(username, password)
    }
    render() {
      return (
          <View style={{padding: 10}}>
            <TextInput
              style={{height: 40}}
              onChangeText={(newtext) => this.setState({username: newtext})}
              placeholder="Username"
              autoCorrect = {false}
              autoCapitalize = {false}
            />
            <TextInput
              style={{height: 40}}
              onChangeText={(newtext) => this.setState({password: newtext})}
              placeholder="Password"
              autoCorrect = {false}
              autoCapitalize = {false}
            />
            <Button
              containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#5BC0BE'}}
              style={{fontSize: 20, color: '#ffffff'}}
              onPress={() => this._handlePress()}>
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

  function sendLogin(){
    
  }

  function sendText(text){
    fetch('http://45.55.166.191:3020/test', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'hello AHMED;',
        password: text,
    })
    }).then((response) => console.log(response)).catch((error) => {
      console.log(error);
    })
  }

  const styles = StyleSheet.create({
    bigblue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    red: {
      color: 'red',
      fontSize: 20,
    },
    size1: {
      width: 400,
      height: 400
    }
  });

  AppRegistry.registerComponent('friendmapclient', () => friendmapclient);
