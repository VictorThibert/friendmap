/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  MapView,
  Button
} from 'react-native';

class friendmap extends Component {
  render() {
    return (
     <View style={styles.container}>
       <Text style={styles.welcome}>
        friendmap
       </Text>

       <MapView
         style={styles.map}
         showsUserLocation={true}
         rotateEnabled={true}
         showCompass={true}
       />
     </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
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
  map:{
    flex: 1,
    height: 200,
    margin: 10,
  },
  button:{
   alignSelf: 'center',
   marginTop: 5,
   padding: 3,
   borderWidth: 0.5,
   borderColor: '#777777',
  }
});

AppRegistry.registerComponent('friendmap', () => friendmap);
