
import React, { Component } from 'react';

import { View  } from 'react-native'
import styles from '../styles.js';
import MapView from 'react-native-maps';
import {createMarker, getAllMarkers} from '../database'

class mapView extends Component {
  constructor(props){
    super(props);
    this.state = {
      markers: [],
      i: 0,
      token:this.props.navigator.navigationContext.currentRoute.passProps.token
    };
    getAllMarkers(this.props.navigator.navigationContext.currentRoute.passProps.token)
      .then((response) => {
        this.setState({markers : JSON.parse(response._bodyText)});
      })
      .catch((error) => { console.error(error); })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          onPress={(event) => {
            const id = `${event.nativeEvent.coordinate.longitude}:${event.nativeEvent.coordinate.longtiude}`;
            const newMarkerObject = {
              id: id,
              longitude: event.nativeEvent.coordinate.longitude,
              latitude: event.nativeEvent.coordinate.latitude,
              name: 'name',
              review: 'review',
              code:'code'
            }
            console.log("state: ", this.state);
            this.setState({markers: this.state.markers.concat([newMarkerObject])});
            createMarker(newMarkerObject, this.state.token);
          }}
          >
          {this.state.markers.map(marker=>(
            <MapView.Marker
              key={marker.id}
              coordinate={{longitude:marker.longitude, latitude:marker.latitude}}
              title={marker.name}
              description={marker.review}
              />
          ))}
        </MapView>
      </View>
    );
  }
}


export default mapView;
