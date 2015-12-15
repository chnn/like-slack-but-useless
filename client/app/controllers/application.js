import Ember from 'ember';

export default Ember.Controller.extend({
  chat: Ember.inject.service(),

  actions: {
    sendMessage(msg) {
      return this.get('chat').sendMessage(msg);
    }
  }
});
