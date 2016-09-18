
import React, { Component } from 'react';

import { View  } from 'react-native'
import styles from '../styles.js';
import MapView from 'react-native-maps';
import {createMarker} from '../database'

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
        this.setState({markers: this.state.markers.concat([position])});
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


export default mapView;
