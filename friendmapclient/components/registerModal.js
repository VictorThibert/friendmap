import React, { Component } from 'react';
import { AlertIOS, Modal, View, Text, TextInput} from 'react-native'
import Button from 'react-native-button';
import styles from '../styles.js'

import {signup} from '../database'

class RegisterModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  render(){
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.props.modalVisible}
        >
        <View>
        <View style={{padding:40}}>
        <Text style={styles.modalSubtitle}>Register</Text>
        <TextInput
          style={{height: 40, top: 80, backgroundColor: "#f4f4f4", padding: 8, borderRadius: 3}}
          placeholder="Username"
          onChangeText={(newtext) => this.setState({username: newtext})}
          autoCorrect = {false}
          autoCapitalize = {'none'}
          maxLength = {16}
          />
        <TextInput
          style={{height: 40, top: 110, backgroundColor: "#f4f4f4", padding: 8, borderRadius: 3}}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(newtext) => this.setState({password: newtext})}
          autoCorrect = {false}
          autoCapitalize = {'none'}
          maxLength = {16}
          />
        <TextInput
        style={{height: 40, top: 120, backgroundColor: "#f4f4f4", padding: 8, borderRadius: 3}}
        secureTextEntry={true}
        placeholder="Confirm Password"
        autoCorrect = {false}
        autoCapitalize = {'none'}
        maxLength = {16}
          />
        <Button
          onPress={() => {
            this.props.setModalVisible(false);
            signup(this.state.username, this.state.password, 'not provided')
            .then((response) => AlertIOS.alert('Account created'))
            .catch((error) => AlertIOS.alert("unable to create account"))
            .done();
          }}
          containerStyle={{padding:10, top: 150, height:35, borderRadius:4, backgroundColor: 'rgba(0,0,0,0)'}}
          style={{fontSize: 20, color: '#323232'}}>
          Confirm Registration
        </Button>
        <Button
        onPress={() => {
          this.props.setModalVisible(false)
        }}
        containerStyle={{padding:10, top: 160, height:35, overflow:'hidden', borderRadius:4, backgroundColor: 'rgba(0,0,0,0)'}}
        style={{fontSize: 20, color: '#b2b2b2'}}>
        Cancel
        </Button>
        </View>
        </View>
      </Modal>
    )
  }
}


export default RegisterModal;
