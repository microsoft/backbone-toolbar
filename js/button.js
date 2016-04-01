define([
  'lib/underscore',
  'lib/backbone',
  'component/grid-toolbar/template/button'
],
function(_, Backbone, buttonTmpl) {
  'use strict';

  // the button toolbar menu.
  /*
    The options can contain the following properties:
      * text: the text of menu bar
      * leftIconClass: the left icon class of the menu

    ## events
    * `click`: `function(MenuItem)` trigger when user click the toolbar menu.
   */
  var Button = Backbone.View.extend({

    className: 'grid-menu-container',

    events: {
     'click':  '_onClick'
    },

    initialize: function(options) {
      this.options = _.defaults(options || {}, {
        text: '',
        leftIconClass: null
      });
    },

    _onClick: function(event) {
      this.trigger('click', this);
    },

    render: function() {
      this.$el.html(buttonTmpl(this.options));
      return this;
    }
  });

  return Button;
});
