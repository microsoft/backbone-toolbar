define([
  'component/grid-toolbar/menuItem'
],
function(MenuItem) {
  'use strict';

  // the menu item of dropdown button
  /*
    The options can contain the following properties:
      * text: the text of menu bar
   */
  var HeaderMenuItem = MenuItem.extend({

    tagName: 'li',

    className: 'dropdown-header',

    attributes: {
      role: 'presentation'
    },

    render: function() {
      var text = this.options ? this.options.text : '';
      this.$el.text(text);
      return this;
    }
  });

  return HeaderMenuItem;
});
