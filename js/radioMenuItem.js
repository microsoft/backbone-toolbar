define([
  'lib/underscore',
  'lib/backbone',
  'component/grid-toolbar/buttonMenuItem',
  'component/grid-toolbar/template/radioMenuItem'
],
function(_, Backbone, ButtonMenuItem, menuItem) {
  'use strict';

  // the menu item of dropdown button
  /*
    The options can contain the following properties:
      * text: the text of menu bar
      * linkText: the text that show on the right of text
      * checked: it's valid only if isRadio is true.
   */
  var checkedClassName = 'glyphicon-ok';

  var RadioMenuItem = ButtonMenuItem.extend({
    initialize: function(options) {
     this.options = _.defaults(options || {}, {
       text    : '',
       checked : false,
       linkText: null
     });
     this.checked = this.options.checked;
    },

    getText: function() {
      return this.options.text;
    },

    setGroup: function(groupItem) {
      this.groupItem = groupItem;
    },

    getGroup: function() {
      return this.groupItem;
    },

    check: function(checked) {
      this.checked = true;
      this.$icon.addClass(checkedClassName);
    },

    uncheck: function() {
      this.checked = false;
      this.$icon.removeClass(checkedClassName);
    },

    render: function() {
      this.options.checked = this.checked;
      this.$el.html(menuItem(this.options));
      this.$icon = this.$el.find('.glyphicon');
      return this;
    }
  });

  return RadioMenuItem;
});
