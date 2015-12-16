import Ember from 'ember';


/** 
  A Promise-friendly wrapper around to WebSocket API.

  Handles initializing a WebSocket, ensuring that its open before sending, and
  serializing messages as JSON strings.

  Send messages with `send`. Handle responses by passing an `onMessage`
  callback to the constructor.
*/
export default class PromisedWebSocket {
  constructor(url, onMessage) {
    this._url = `ws:${location.host}${url}`;

    const identity = x => x;

    this._onMessage = onMessage || identity;
    this._ws = null;
    this._connectingPromise = null;
  }

  send(json) {
    const payload = JSON.stringify(json);

    return this._getWebSocket().then(socket => socket.send(payload));
  }

  initWebSocket() {
    this._connectingPromise = new Ember.RSVP.Promise((resolve, reject) => {
      const connectingTimeout = setTimeout(() => {
        reject('Web socket failed by timeout.');
      }, 4000);

      this._ws = new WebSocket(this._url);

      this._ws.onmessage = msg => this._onMessage(JSON.parse(msg.data));

      this._ws.onopen = () => {
        clearTimeout(connectingTimeout);
        resolve(this._ws);
      };

      this._ws.onerror = error => {
        reject(error);
      };
    });

    return this._connectingPromise.then(() => this);
  }

  _getWebSocket() {
    let readyState;

    if (this._ws) {
      readyState = this._ws.readyState;
    }

    if (readyState === WebSocket.OPEN) {
      return Ember.RSVP.Promise.resolve(this._ws);
    } else if (readyState === WebSocket.CONNECTING) {
      return this._connectingPromise;
    } else {
      this.initWebSocket();  // CLOSING, CLOSED, or null

      return this._connectingPromise;
    }
  }
}
