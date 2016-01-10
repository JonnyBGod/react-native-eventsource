'use strict';

var EventTarget = require('event-target-shim');

/**
 * Shared base for platform-specific EventSource implementations.
 */
class EventSourceBase extends EventTarget {
  CONNECTING: number;
  OPEN: number;
  CLOSED: number;

  onerror: ?Function;
  onmessage: ?Function;
  onopen: ?Function;

  binaryType: ?string;
  readyState: number;
  url: ?string;

  constructor(url: string) {
    super();
    this.CONNECTING = 0;
    this.OPEN = 1;
    this.CLOSED = 3;

    this.url = url;
    this.readyState = this.CONNECTING;
    this.connectToSourceImpl(url);
  }

  close(): void {
    if (this.readyState === this.CLOSED) {
      return;
    }

    if (this.readyState === this.CONNECTING) {
      this.cancelConnectionImpl();
    }

    this.closeConnectionImpl();
  }

  closeConnectionImpl(): void {
    throw new Error('Subclass must define closeConnectionImpl method');
  }

  connectToSourceImpl(): void {
    throw new Error('Subclass must define connectToSourceImpl method');
  }

  cancelConnectionImpl(): void {
    throw new Error('Subclass must define cancelConnectionImpl method');
  }
}

EventSourceBase.CONNECTING = 0;
EventSourceBase.OPEN = 1;
EventSourceBase.CLOSED = 3;

module.exports = EventSourceBase;