import React, { Component } from 'react';
import Hr from 'react-native-hr';
import { AppRegistry, TouchableHighlight, Navigator } from 'react-native';

import styles from './styles.js';

import { createMarker } from './database';

import loginView from './components/loginView';
import mapView from './components/mapView'

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

AppRegistry.registerComponent('friendmapclient', () => friendmapclient);
