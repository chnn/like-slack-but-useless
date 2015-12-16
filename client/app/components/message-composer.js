import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['message-composer'],

  unsentMessage: '',

  messageInvalid: Ember.computed.empty('unsentMessage'),

  actions: {
    sendIfValid() {
      if (this.get('messageInvalid')) {
        return;
      }

      this.attrs.sendMessage(this.get('unsentMessage'));
      this.set('unsentMessage', '');
    }
  }
});
