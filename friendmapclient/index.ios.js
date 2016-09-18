import React, { Component } from 'react';
import Button from 'react-native-button';
import Hr from 'react-native-hr';
import { AppRegistry, Text, Image, View, StyleSheet, TextInput, ScrollView, Navigator, AlertIOS } from 'react-native';

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


class loginView extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      username: '',
      password: '',
      title: 'login',
      auth: 'Unauthorized'
    };
  }
  
  sendLogin(username, password){
      console.log("INFO //////////////////////////////////////////////////////////////////////////////////////////: ", username, password)
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
            console.log("11111111111",response._bodyText)
            this.setState({auth: response});
            console.log("---------------------------------", response._bodyText.message)
      })
        .catch((error) => console.log("INFOERROR: ", error));  
      
//       this.goToNext();
    }
  
  goToNext() {
    console.log(58, this.state.auth)
    this.props.navigator.push({
      name: 'mapView',
      component: mapView
    });
  }
  
  _handlePress(event) {
    let username=this.state.username;
    let password=this.state.password;
    this.sendLogin(username, password, this);
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

class mapView extends Component {
  render() {
        return (
            <View style={{width: 100, backgroundColor: 'red'}}>
                <Text>
                    Feed View!
                </Text>
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

AppRegistry.registerComponent('friendmapclient', () => friendmapclient);
