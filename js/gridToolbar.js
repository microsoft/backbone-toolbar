define([
  'lib/underscore',
  'lib/backbone'
],
function(_, Backbone) {
  'use strict';

  // the container for the menu buttons

  /*
   ## props
   * items: `Array` the list of toolbar menus.
   */
  var GridToolbar = Backbone.View.extend({
    className: 'grid-toolbar',

    initialize: function(options) {
      this.items = (options || {}).items || [];
    },

    render: function() {
      _.each(this.items, function(item) {
        this.$el.append(item.render().$el);
      }, this);
      return this;
    }
  });

  return GridToolbar;
});
