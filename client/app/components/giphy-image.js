import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['giphy-image'],

  ajax: Ember.inject.service(),

  didReceiveAttrs() {
    const search = this.get('search');

    if (!search) {
      return;
    }

    this.getGiphyImage(search)
      .then(url => {
        if (!this.$()) {
          return;
        }

        this.$().append(`<img src="${url}">`);
      });
  },

  getGiphyImage(searchTerm) {
    const urlSearchTerm = encodeURIComponent(searchTerm);
    const resultsCount = 20;
    const randomIndex = Math.floor(Math.random() * resultsCount);

    return this.get('ajax')
      .request(`http://api.giphy.com/v1/gifs/search?q=${urlSearchTerm}&api_key=dc6zaTOxFJmzC&limit=${resultsCount}&rating=pg-13`)
      .then(resp => resp.data[randomIndex].images.fixed_width.url);
  }
});
