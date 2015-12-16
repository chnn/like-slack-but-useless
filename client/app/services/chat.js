import Ember from 'ember';
import PromisedWebSocket from '../utils/promised-websocket';


export default Ember.Service.extend({
  messages: null,

  sendMessage(msg) {
    this.get('_ws').send(msg);
  },

  _ws: null,

  init() {
    const onMessage = m => this.get('messages').pushObject(m);
    const _ws = new PromisedWebSocket('/ws', onMessage);
    const messages =  [
      { type: 'info', body: `Connected at ${(new Date()).toLocaleString()}` }
    ];

    _ws.initWebSocket();

    this.setProperties({ messages, _ws });
  }
});
