define([
  'lib/underscore',
  'lib/backbone',
  'component/grid-toolbar/template/filterInput'
],
function(_, Backbone, buttonTmpl) {
  'use strict';

  /*
    ## props
    * placeholder: `string` the placeholder for the text input.

    ## events
    * `change`: `function(FilterInput, String)` when the button is clicked.
  */
  var FilterInput = Backbone.View.extend({

    className: 'grid-filter-container',

    events: {
      'click button': '_onClickButton',
      'keypress': '_onKeypress',
    },

    setValue: function(val) {
      this.$input.val(val);
    },

    getValue: function() {
      return this.$input.val();
    },

    _onClickButton: function(event) {
      this.trigger('change', this, this.$input.val());
    },

    _onKeypress: function(event) {
      var RETURN_CODE = 13;
      if (event.which === RETURN_CODE) {
        this.trigger('change', this, this.$input.val());
      }
    },

    render: function() {
      var props = _.defaults(this.options || {}, {
        placeholder: ''
      });
      this.$el.html(buttonTmpl(props));
      this.$input = this.$('input');
      return this;
    }
  });

  return FilterInput;
});
