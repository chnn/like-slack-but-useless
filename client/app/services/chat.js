import Ember from 'ember';
import PromisedWebSocket from '../utils/promised-websocket';


export default Ember.Service.extend({
  messages: null,

  sendMessage(msg) {
    this.get('_ws').send({ msg });
  },

  _ws: null,

  init() {
    const _ws = new PromisedWebSocket('/ws', m => this.get('messages').pushObject(m));
    const messages =  [
      {type: 'info', body: `Connected at ${(new Date()).toLocaleString()}`},
      {type: 'other', body: 'i am a lemon'},
      {type: 'self', body: 'you are a lemon'}
    ];

    _ws.initWebSocket();

    this.setProperties({ messages, _ws });
  }
});
