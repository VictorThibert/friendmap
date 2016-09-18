import React, { Component } from 'react';
import { View, Text } from 'react-native';

class App extends React.Component {
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