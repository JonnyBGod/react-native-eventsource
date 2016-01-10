'use strict';

/**
 * Event object passed to the `onopen`, `onmessage`, `onerror`
 * callbacks of `EventSource`.
 *
 * The `type` property is "open", "message", "error" respectively.
 *
 * In case of "message", the `data` property contains the incoming data.
 */
class EventSourceEvent {
  constructor(type, eventInitDict) {
    this.type = type.toString();
    Object.assign(this, eventInitDict);
  }
}

module.exports = EventSourceEvent;