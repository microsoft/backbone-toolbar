define([
  'lib/underscore',
  'component/grid-toolbar/menuItem',
  'component/grid-toolbar/template/subMenuItem'
], function(_, MenuItem, menuItem) {

  /*
   options can be:
    * text: the text of menu bar

   */
  var SubMenuItem = MenuItem.extend({

    events: {
      'mouseenter': '_onMouseOver',
      'mouseleave': '_onMouseLeave'
    },

    _onMouseOver: function(event) {
      this.$('.dropdown-submenu').removeClass('hidden');
    },

    _onMouseLeave: function(event) {
      this.$('.dropdown-submenu').addClass('hidden');
    },

    render: function() {
      var options = this.options || {};
      this.$el.html(menuItem(options));
      var submenu = this.$('.dropdown-submenu');
      var children = options.children || [];
      _.each(children, function(child) {
        submenu.append(child.render().$el);
      }, this);
      return this;
    }
  });

  return SubMenuItem;
});
