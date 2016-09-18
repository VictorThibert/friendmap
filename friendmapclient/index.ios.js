import React, { Component } from 'react';
import Button from 'react-native-button';
import Hr from 'react-native-hr';
import { AppRegistry, Text, Modal, TouchableHighlight, Image, View, StyleSheet, TextInput, ScrollView, Navigator, AlertIOS } from 'react-native';
import BackgroundImage from "./BackgroundImage";
import MapView from 'react-native-maps';
import { createMarker } from './database';

class friendmapclient extends Component {
  render() {
    return (
      <Navigator
      initialRoute={{name: 'loginView', component: loginView}}
      configureScene={() => {
        return Navigator.SceneConfigs.FloatFromRight;
      }}
      renderScene={(route, navigator) => {
        if (route.component) {
          return React.createElement(route.component, { navigator });
        }
      }}
        />
    );
  }
}

class mapView extends Component {
  state = {
    markers: [],
    i: 0
  };
  render() {
    return (
      <View style={styles.container}>
      <MapView
      style={styles.map}
      showsUserLocation={true}
      onPress={(event) => {
        var position = event.nativeEvent.coordinate;
        this.setState({markers: this.state.markers.concat([])});
        console.log(this.state.markers)
        createMarker(position, this.state.id);
      }}
      >
      {this.state.markers.map(marker=>(
        <MapView.Marker
        coordinate={marker}
        title={"-"}
        description={"_"}
          />
      ))}


      </MapView>
      </View>
    );
  }
}

function sendPlace(){

}


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
      console.log("this.props: ", this.props);
      this.props.navigator.push({
        name: 'mapView',
        component: mapView
      });
    }
    else AlertIOS.alert('Login failed');
  }

  setModalVisible(visible) {
    this.setState({
      text: '',
      username: '',
      password: '',
      modalVisible: visible
    });
  }

  sendLogin(username, password){
    console.log("sendLogin, username, password - ", username, password)

    fetch('http://45.55.166.191:3020/auth/signin', {
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
    .then((response) => {
      if(response._bodyText !== "Unauthorized")
        this.state.id = JSON.parse(response._bodyText).id;
      this.goToNext(response._bodyText);
    })
    .catch((error) => console.log(error))
    .done();
  }

  _handlePress(event) {
    let username=this.state.username;
    let password=this.state.password;
    this.sendLogin(username, password);
  }

  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <BackgroundImage source={ { uri: 'https://s-media-cache-ak0.pinimg.com/originals/76/4f/86/764f863306caae67a9f1ba245bde39df.jpg'}}>
      <View>
      <Modal
      animationType={"slide"}
      transparent={false}
      visible={this.state.modalVisible}
      >
      <View>
      <View style={{padding:40}}>
      <Text style={styles.modalSubtitle}>Register</Text>
      <TextInput
      style={{height: 40, top: 80, backgroundColor: "#f4f4f4", padding: 8, borderRadius: 3}}
      placeholder="Username"
      autoCorrect = {false}
      autoCapitalize = {'none'}
      maxLength = {16}
        />
      <TextInput
      style={{height: 40, top: 110, backgroundColor: "#f4f4f4", padding: 8, borderRadius: 3}}
      secureTextEntry={true}
      placeholder="Password"
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
        this.setModalVisible(true)
      }}
      containerStyle={{padding:10, top: 150, height:35, borderRadius:4, backgroundColor: 'rgba(0,0,0,0)'}}
      style={{fontSize: 20, color: '#323232'}}>
      Confirm Registration
      </Button>
      <Button
      onPress={() => {
        this.setModalVisible(false)
      }}
      containerStyle={{padding:10, top: 160, height:35, overflow:'hidden', borderRadius:4, backgroundColor: 'rgba(0,0,0,0)'}}
      style={{fontSize: 20, color: '#b2b2b2'}}>
      Cancel
      </Button>
      </View>
      </View>
      </Modal>
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
        this.setModalVisible(true)
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


const styles = StyleSheet.create({
  backgroundImage:{
    width: 100,
    height: 100,
  },
  title: {
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    top: 15,
  },
  subtitle: {
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    fontSize: 22,
    top: 70,
  },
  paragraph: {
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    fontSize: 15,
    top: 70,
  },
  regSubtitle: {
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    top: 180,
  },
  regParagraph: {
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    top: 140,
  },
  backgroundImage:{
    flex: 1,
    resizeMode: 'stretch',
  },
  modalSubtitle:{
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#4cdc94',
    fontWeight: 'bold',
    fontSize: 30,
    top: 40,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
    paddingTop: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button:{
    alignSelf: 'center',
    marginTop: 5,
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#777777',
  }
});

AppRegistry.registerComponent('friendmapclient', () => friendmapclient);
