define([
  'lib/underscore',
  'lib/backbone',
  'component/grid-toolbar/template/dropdown',
  'lib/bootstrap'
],
function(_, Backbone, buttonTmpl) {
  'use strict';

  // The toolbar view implement the grid toolbar such as filter or select action

  /*
    ## props

    * text: `string` the button text
    * isShowRightIcon: `boolean` if the right icon needs to show.
    * leftIconClass/rightIconClass: `string` the class name of button's left/right icon.
    * menuItems: `Array` the menu items

    ## events

    * `click:item`: ``function(Dropdown, MenuItem)``
    * `click:link`: `function(Dropdown, MenuItem)`
   */
  var Dropdown = Backbone.View.extend({

    className: 'grid-groupmenu-container dropdown',

    initialize: function(options) {
      this.options = _.defaults(options || {}, {
        isShowRightIcon: true,
        menuItems: []
      });
      this.menuItems = this.options.menuItems.slice(0);
      _.each(this.menuItems, this._initMenuItem.bind(this));
    },

    getMenuItem: function(index) {
      return this.menuItems[index];
    },

    getMenuItems: function() {
      return this.menuItems;
    },

    // Add one menu item(Backbone.View instance) into the menu items.
    pushMenuItem: function(item) {
      this.menuItems.push(item);
      this._initMenuItem(item);
      this._renderMenuItem(item);
    },

    pushMenuItems: function(items) {
      if (!_.isArray(items)) {
        items = [items];
      }
      _.each(items, this.pushMenuItem, this);
    },

    removeMenuItem: function(item) {
      if (item.getGroup) {
        return this.removeRadioItem(item);
      }
      var index = this.menuItems.indexOf(item);
      if (index !== -1) {
        this.menuItems.splice(index, 1);
      }
      item.isGroup ? item.remove() : item.$el.remove();
    },

    removeMenuItems: function(items) {
      if (!_.isArray(items)) items = [items];
      _.each(items, this.removeMenuItem, this);
    },

    removeRadioItem: function(item) {
      var groupItem = item.getGroup && item.getGroup();
      groupItem && groupItem.removeItem(item);
    },

    _applyItemEvents: function(item) {
      item.on('click', function(item) {
        this.trigger('click:item', this, item);
      }, this);

      item.on('click:link', function(item) {
        this.trigger('click:link', this, item);
      }, this);
    },

    _initMenuItem: function(item) {
      if (item.isGroup) {
        _.each(item.items, this._applyItemEvents, this);
      } else {
        this._applyItemEvents(item);
      }
    },

    _renderMenuItem: function(item) {
      this.$itemList.append(item.render().$el);
    },

    render: function() {
      this.$el.html(buttonTmpl(this.options));
      this.$itemList = this.$el.children('.dropdown-menu');
      // Add all the menu items into the button
      _.each(this.menuItems, this._renderMenuItem, this);
      return this;
    }
  });

  return Dropdown;
});
