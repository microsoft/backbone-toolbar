define([
  'lib/backbone'
],
function(Backbone) {
  'use strict';

  // the base class of menu item
  var MenuItem = Backbone.View.extend({
    tagName: 'li',
  });

  return MenuItem;
});
