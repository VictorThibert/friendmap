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

import GoogleMap  from 'react-native-maps-google';

class friendmapclient extends Component {
  render() {
    return (
     //<MapView style={styles.map}/>
     <GoogleMap
         style={styles.map}
         showsUserLocation={true}
         scrollGestures={true}
         zoomGestures={true}
         tiltGestures={true}
         rotateGestures={true}
         consumesGesturesInView={true}
         compassButton={true}
         myLocationButton={true}
     />
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

AppRegistry.registerComponent('friendmapclient', () => friendmapclient);
