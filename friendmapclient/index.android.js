import React, { Component } from 'react';
import { AppRegistry, View, Text, Navigator, StyleSheet } from 'react-native';

class friendmapclient extends React.Component {
    render() {
        return (
            <Navigator
                initialRoute={{name: 'WelcomeView', component: WelcomeView}}
                configureScene={() => {
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                renderScene={(route, navigator) => {
                    // count the number of func calls
                    console.log(route, navigator); 

                    if (route.component) {
                        return React.createElement(route.component, { navigator });
                    }
                }}
             />
        );
    }
}

class FeedView extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Feed View!
                </Text>
            </View>
        );
    }
}

class WelcomeView extends React.Component {
    onPressFeed() {
        this.props.navigator.push({
            name: 'FeedView',
            component: FeedView
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome View!
                </Text>

                <Text onPress={this.onPressFeed.bind(this)}>
                    Go to feed!
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  welcome: {
    flex:1
  }
})

AppRegistry.registerComponent('friendmapclient', () => friendmapclient);