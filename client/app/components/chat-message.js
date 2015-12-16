import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['chat-message'],
  classNameBindings: ['message.type'],

  showGif: Ember.computed('giphyMode', 'message.type', function() {
    return this.get('giphyMode') && this.get('message.type') !== 'info';
  })
});
