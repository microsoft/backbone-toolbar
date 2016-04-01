define([
  'lib/underscore',
  'component/grid-toolbar/menuItem'
],
function(_, MenuItem) {
  'use strict';

  // the container for the menu buttons

  /*
   ## props
    * `Array` the list of radio menus.

   ## events
    * `change:selection` the event will be triggered when the selection has changed.
    * `click:item` the event will be triggered when this item is clicked
    * `click:link` the event will be triggered when item's link text is clicked.
   */
  var RadioGroupMenuItem = MenuItem.extend({

    initialize: function(options) {
      this.items = (options || {}).items || [];
      this.isGroup = true;
      this.checkedItem = null;
      this._findCheckedItem();
      _.each(this.items, this._initItem, this);
    },

    addItem: function(item) {
      this.items.push(item);
      this.$el.append(item.render().$el);
      this._initItem(item);
    },

    removeItem: function(item) {
      item.$el.remove();
      var index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
      // if delete the checked menu item, switch the checked state to other radio menu item.
      if (item === this.checkedItem) {
        this.checkedItem = this.items[0] || null;
        this.checkedItem && this.checkedItem.check();
        this.trigger('change:selection', this, this.checkedItem);
      }
    },

    getItems: function() {
      return this.items;
    },

    getItemCount: function() {
      return this.items.length;
    },

    checkItem: function(item) {
      if (item !== this.checkedItem) {
        this.checkedItem && this.checkedItem.uncheck(); // Uncheck the original menu item
        this.checkedItem = item;
        item.check();
        this.trigger('change:selection', this, item);
      }
    },

    remove: function() {
      _.each(this.items, function(item) {
        item.$el.remove();
      });
      this.items = [];
    },

    _initItem: function(item) {
      item.setGroup(this);
      this._applyEvents(item);
    },

    _applyEvents: function(item) {
      item.on('click', this._onClickItem, this);
      item.on('click:link', function(item) {
        this.trigger('click:link', this, item);
      }, this);
    },

    _onClickItem: function(item) {
      this.checkItem(item);
      this.trigger('click:item', this, item);
    },

    _findCheckedItem: function() {
      var items = this.items;
      // Get the checked menu item index
      var checkedItem = this.checkedItem = _.find(items, function(item) {
        return item.checked;
      }) || items[0];

      if (!checkedItem) return ;
      checkedItem.checked = true;
      this.trigger('change:selection', this, checkedItem);

      // Make other menu items's checked property false
      _.each(items, function(item) {
        item.checked = (item === checkedItem);
      }, this);
    },

    render: function() {
      var $ul = $('<ul/>');
      _.each(this.items, function(item) {
        $ul.append(item.render().$el);
      });
      this.$el.append($ul);
      return this;
    }
  });

  return RadioGroupMenuItem;
});
