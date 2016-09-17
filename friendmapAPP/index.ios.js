import React, { Component, LA } from 'react';
import { AppRegistry, Text, Image, View, StyleSheet, TextInput, ScrollView, Navigator, AlertIOS } from 'react-native';
var Button = require('react-native-button');




class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}


class friendmapAPP extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (


      <ScrollView>
        

        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
          
          <Image source={pic} style={{width: 193, height: 110}}/>
          <Text style={[styles.bigblue, styles.red]}> YOOOOO</Text>
          <Text style={[styles.red, styles.bigblue]}> YOOOOO</Text>
          <Greeting name='Valeera' />
          
        
          <TextInput style={[styles.bigblue, {height: 40, width: 200}]} placeholder="Type here to translate!" onChangeText={sendText}/>
        
        </View>
      </ScrollView>
     
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
}).catch((error) => {
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

AppRegistry.registerComponent('friendmapAPP', () => friendmapAPP);