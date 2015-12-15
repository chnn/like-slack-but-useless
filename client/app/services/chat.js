import Ember from 'ember';
import PromisedWebSocket from '../utils/promised-websocket';


export default Ember.Service.extend({
  messages: null,

  sendMessage(msg) {
    // TODO: Identify sender
    this.get('_ws').send({ msg });
  },

  _ws: null,

  init() {
    const _ws = new PromisedWebSocket('/ws', m => this.get('messages').pushObject(m));

    this.setProperties({ messages: [], _ws });
  }
});
