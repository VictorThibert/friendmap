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
      console.log("Hello World")
    return (
     <View style={styles.container}>
         <GoogleMap
             style={styles.map}
             cameraPosition={{auto: true, zoom: 10}}
             showsUserLocation={true}
             scrollGestures={true}
             zoomGestures={true}
             tiltGestures={true}
             rotateGestures={true}
             consumesGesturesInView={true}
             compassButton={true}
             myLocationButton={true}
             indoorPicker={true}
             allowScrollGesturesDuringRotateOrZoom={true}
             counter={23}
             markers={[
                 {
                    id: 'marker-102',
                    latitude: 21.7342,
                    longitude: -5.7350,
                    icon: require('./images/map-marker-5.png')
                },
             ]}

             didLongPressAtCoordinate={function(event){
                 console.log(event.data)
                 console.log("####", this.counter)
                //  this.markers.append({
                //      id:this.counter++,
                //      latitude: event.data.latitude,
                //      longitude: event.data.longitude
                //  })
             }}


         />
     </View>
    );
  }
}


const styles = StyleSheet.create({
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
