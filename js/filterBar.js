define([
  'lib/underscore',
  'lib/backbone',
  'component/grid-toolbar/template/filterBar',
  '$/i18n!component/grid-toolbar'
],
function(_, Backbone, filterBarTmpl, i18n) {
  'use strict';

  // the base class of menu item
  /**
    ## Options:
      *columnName: the column name that want to apply to quick filter
      *filterOperator: the quick filter operator, such as 'Contains'
      *filterValue: the quick filter value
      *i18n: i18n module that to localize the string

    ## Events
      *`edit`: triggered when the Edit button is clicked
      *`remove`: triggered when the Remove button is clicked
   */
  var FilterBar = Backbone.View.extend({
    className: 'filter-bar',

    events: {
     'click a.editFilterLink'   :  '_onClickEdit',
     'click a.removeFilterLink' :  '_onClickRemove'
    },

    initialize: function(options) {
      this.options = _.extend({
        title: i18n.get('GridToolbar_FilterBar_Title'),
        editText: i18n.get('GridToolbar_FilterBar_Edit'),
        removeText: i18n.get('GridToolbar_FilterBar_Remove')
      }, options || {});
    },

    _onClickEdit: function(event) {
      this.trigger('edit', this);
    },

    _onClickRemove: function(event) {
      this.trigger('remove', this);
    },

    render: function() {
      this.$el.html(filterBarTmpl(this.options));
      return this;
    },
  });

  return FilterBar;
});
