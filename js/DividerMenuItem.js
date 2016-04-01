define([
  'component/grid-toolbar/menuItem'
],
function(MenuItem) {
  'use strict';

  // the divider menu item of dropdown button

  var DividerMenuItem = MenuItem.extend({

    className: 'divider',

    attributes: {
      role: 'presentation'
    }
  });

  return DividerMenuItem;
});
