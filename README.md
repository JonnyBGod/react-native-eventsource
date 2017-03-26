[![npm version](https://img.shields.io/npm/v/react-native-eventsource.svg?style=flat)](https://www.npmjs.com/package/react-native-eventsource)

react-native EventSource
=========================

Server-Sent Events for your React Native apps!

EventSource implementation following the W3C EventSource specification.

_NOTE_: This is my first time playing with Obj-C and Java and the iOS and Android ecosystems. If you
see something that makes you go :frowning: please let me know. PRs are always welcome!

## Installing

```bash
npm install react-native-eventsource --save

react-native link react-native-eventsource
```

## Usage

Full example that subscribes to a SSE stream and writes the results to `console.log`

```js
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
      url: 'YOUR_ENDPOINT',
    };
  },

  componentDidMount() {
    this.source = new EventSource(this.state.url);

    this.source.onopen = function () {
      console.log('EventSource::onopen');
    };

    this.source.onmessage = function (e) {
      console.log('EventSource::onmessage: ', e);
    };

    this.source.onerror = function (e) {
      console.log('EventSource::onerror: ', e);
    };

    this.source.addEventListener("custom_event", function(e) {
      console.log('EventSource::custom_event: ', e);
    };
  },

  componentWillUnmount() {
    this.source.close();
  },

  render: function() {
    return (<View><Text>SSE in React!</Text></View>);
  }
});
```

## Thanks

@jordanbyron for the [EventSource](https://github.com/jordanbyron/react-native-event-source) for react-native for iOS inspiration.

@neilco for the [EventSource](https://github.com/neilco/EventSource) for iOS.
@kaazing for the [EventSource](https://github.com/kaazing/java.client) for Android.

## License

See [EventSource](https://github.com/neilco/EventSource/blob/master/LICENSE.txt)
for additional license details.

See [kaazing/java.client](https://github.com/kaazing/java.client/blob/master/LICENSE.txt)
for additional license details.

Copyright (c) 2015 João Ribeiro (http://github.com/JonnyBGod/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
