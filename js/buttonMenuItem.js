define([
  'lib/underscore',
  'component/grid-toolbar/menuItem',
  'component/grid-toolbar/template/buttonMenuItem'
],
function(_, MenuItem, menuItem) {
  'use strict';

  // the menu item of dropdown button
  /*
    The options can contain the following properties:
      * text: the text of menu bar
      * linkText: the text that show on the right of text

    ## events
    * `click`: `function(MenuItem)` trigger when user click the menu item.
    * `click:link`: `function(MenuItem)` trigger when user click teh link item.
   */
  var ButtonMenuItem = MenuItem.extend({

    attributes: {
      role: 'presentation'
    },

    events: {
     'click'            :  '_onClick',
     'click .secondary' : '_onClickLink'
    },

    initialize: function(options) {
      this.options = _.defaults(options || {}, {
        text: '',
        linkText: ''
      });
    },

    setText: function(text) {
      if (this.options.linkText != null) {
        this.$el.find('.primary').text(text);
      } else {
        this.$el.find('.anchor').text(text);
      }
    },

    setLinkText: function(text) {
      this.$el.find('.secondary').text(text);
    },

    _onClick: function(event) {
      this.trigger('click', this);
    },

    _onClickLink: function(event) {
      this.trigger('click:link', this);
      event.stopPropagation();
    },

    render: function() {
      this.$el.html(menuItem(this.options));
      return this;
    }
  });

  return ButtonMenuItem;
});
