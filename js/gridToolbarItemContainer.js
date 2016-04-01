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

  var GridToolbarItemContainer = Backbone.View.extend({
    className: 'grid-toolbar-item-container',

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

  return GridToolbarItemContainer;
});
