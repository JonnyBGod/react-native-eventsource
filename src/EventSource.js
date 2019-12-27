'use strict';

var React = require('react-native');
var {
  NativeModules,
  DeviceEventEmitter
} = React;

var RNEventSource = NativeModules.RNEventSource;

var EventSourceBase = require('./EventSourceBase');
var EventSourceEvent = require('./EventSourceEvent');

var EventSourceId = 0;
var CLOSE_NORMAL = 1000;

/**
 * Browser-compatible EventSources implementation.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/EventSource
 */
class EventSource extends EventSourceBase {
  _sourceId: number;
  _subs: any;

  connectToSourceImpl(url: string): void {
    this._sourceId = EventSourceId++;

    RNEventSource.connect(url, this._sourceId);

    this._registerEvents(this._sourceId);
  }

  closeConnectionImpl(): void {
    this._closeEventSource(this._sourceId);
  }

  cancelConnectionImpl(): void {
    this._closeEventSource(this._sourceId);
  }

  _closeEventSource(id: number): void {
    RNEventSource.close(id);
  }

  _unregisterEvents(): void {
    this._subs.forEach(e => e.remove());
    this._subs = [];
  }

  _registerEvents(id: number): void {
    this._subs = [
      DeviceEventEmitter.addListener('eventsourceEvent', ev => {
        if (ev.id !== id) {
          return;
        }
        var event = new EventSourceEvent(ev.type, {
          data: ev.message || ev.data
        });
        if( ev.type === 'message' && this.onmessage ) this.onmessage(event);
        this.dispatchEvent(event);
      }),
      DeviceEventEmitter.addListener('eventsourceOpen', ev => {
        if (ev.id !== id) {
          return;
        }
        this.readyState = this.OPEN;
        var event = new EventSourceEvent('open');
        this.onopen && this.onopen(event);
        this.dispatchEvent(event);
      }),
      DeviceEventEmitter.addListener('eventsourceFailed', ev => {
        if (ev.id !== id) {
          return;
        }
        var event = new EventSourceEvent('error');
        event.message = ev.message;
        this.onerror && this.onerror(event);
        this.dispatchEvent(event);
        this._unregisterEvents();
        this.close();
      })
    ];
  }
}

module.exports = EventSource;
