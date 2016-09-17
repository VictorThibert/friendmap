  import React, { Component, LA } from 'react';
  import { AppRegistry, Text, Image, View, StyleSheet, TextInput, ScrollView, Navigator, AlertIOS } from 'react-native';
  import Button from 'react-native-button';




  class Greeting extends Component {
    render() {
      return (
        <Text>Hello {this.props.name}!</Text>
      );
    }
  }


  class friendmapclient extends Component {
    render() {
      let pic = {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
      };
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
          <TextInput style={[styles.bigblue, {height: 40, width: 200}]} placeholder="Type here to translate!" onChangeText={sendText}/>
        </View>


      );
    }

  }




  function sendText(text){
    fetch('http://45.55.166.191:3020/test', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstParam: 'hello AHMED;',
      secondParam: text,
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
