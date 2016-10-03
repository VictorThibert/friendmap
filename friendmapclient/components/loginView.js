
import BackgroundImage from "./BackgroundImage";
import React, { Component } from 'react';
import { AlertIOS, Modal, View, Text, TextInput} from 'react-native'
import Button from 'react-native-button';
import styles from '../styles.js'

import mapView from './mapView'
import {signIn} from '../database'
import RegisterModal from './registerModal'


class loginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      username: '',
      password: '',
      modalVisible: false,
      access: 'none',
      id: ''
    };
  }

  goToNext(access) {
    if(access !== "Unauthorized"){
      console.log("inside going to switch page");
      this.props.navigator.push({
        name: 'mapView',
        component: mapView,
        passProps: {
          token: this.state.token
        }
      });
      console.log("this.state.token: ", this.state.token);
      this.props.token = this.state.token;
    }
    else AlertIOS.alert('Login failed');
  }

  setModalVisible(visible) {
    console.log("this.setState: ", this.setState);
    console.log("this.state: ", this.state)
    this.setState({
      modalVisible: visible
    });
  }

  sendLogin(username, password){
    console.log("sendLogin, username, password - ", username, password)
    signIn(username, password)
    .then((response) => {
      if(response._bodyText !== "Unauthorized"){
        console.log("response._bodyText: ", response._bodyText);
        this.state.token = JSON.parse(response._bodyText).token;
        console.log("the token is: ", this.state.token);
      }
      this.goToNext(response._bodyText);
    })
    .catch((error) => console.log(error))
    .done();
  }

  _handlePress(event) {
    this.sendLogin(this.state.username, this.state.password);
  }

  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <BackgroundImage source={ { uri: 'https://s-media-cache-ak0.pinimg.com/originals/76/4f/86/764f863306caae67a9f1ba245bde39df.jpg'}}>

      <View>

      <RegisterModal
        modalVisible={this.state.modalVisible}
        setModalVisible={this.setModalVisible.bind(this)}
        />

      <View style={{padding:40, paddingTop: 100}}>
      <Text style={styles.title}>Friendmap</Text>
      <Text style={styles.subtitle}>Welcome</Text>
      <TextInput
        style={{height: 40, top: 80, backgroundColor: "#f4f4f4", padding: 8, borderRadius: 3}}
        placeholder="Username"
        autoCorrect = {false}
        autoCapitalize = {'none'}
        maxLength = {16}
        onChangeText={(newtext) => this.setState({username: newtext})}
        />
      <TextInput
        style={{height: 40, top: 90, backgroundColor: "#f4f4f4", padding: 8, borderRadius: 3}}
        secureTextEntry={true}
        placeholder="Password"
        autoCorrect = {false}
        autoCapitalize = {'none'}
        maxLength = {16}
        onChangeText={(newtext) => this.setState({password: newtext})}
        />
      <Button
        containerStyle={{padding:10, top: 100, height:45, borderRadius:4, backgroundColor: '#4cdc94'}}
        style={{fontSize: 20, color: '#ffffff'}}
        onPress={() => this._handlePress()}
        >
        Login
      </Button>
      <Text style={styles.regSubtitle}>New to Friendmap?</Text>
      <Button
        onPress={() => {
          this.setModalVisible(true);
        }}
        containerStyle={{padding:10, top: 200, height:35, borderRadius:4, backgroundColor: 'rgba(0,0,0,0)'}}
        style={{fontSize: 20, color: 'white'}}>
        Register
      </Button>
      </View>
      </View>
      </BackgroundImage>
    );
  }
}


export default loginView;
