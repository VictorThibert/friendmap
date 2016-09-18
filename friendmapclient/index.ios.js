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
  View
} from 'react-native';

import MapView from 'react-native-maps';

class friendmapclient extends Component {
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
                    this.setState({markers: this.state.markers.concat([event.nativeEvent.coordinate])});
                    //this.state.markers.push(event.nativeEvent.coordinate)
                    console.log(this.state.markers)
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
