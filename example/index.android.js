/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var EventSource = require('react-native-eventsource');

var example = React.createClass({
  getInitialState() {
    return {
      source: null,
      url: 'https://rides.cloudtasks.io/api/cars/change-stream?_format=event-source&access_token=dcl2JYPPdgDqbGTkVesZ61qzP6AawMJz',
    };
  },

  componentDidMount() {
    this.source = new EventSource(this.state.url);

    this.source.onopen = function () {
      console.log('EventSource::onopen');
    }

    this.source.onmessage = function (e) {
      console.log('EventSource::onmessage: ', e);
    }

    this.source.onerror = function (e) {
      console.log('EventSource::onerror: ', e);
    }
  },

  componentWillUnmount() {
    this.source.close();
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('example', () => example);
