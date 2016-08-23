import { ToolbarView } from '../../js';
import 'bootstrap-webpack';

window.toolbar = new ToolbarView({
  el: '.toolbar-container',
  id: 'demo-toolbar',
  items: [{
    type: 'button',
    classes: ['btn', 'btn-primary'],
    id: 'button-1st',
    text: 'A button',
    onClick: () => console.log('click button-1st'),
  }, {
    type: 'button',
    iconLeft: 'glyphicon-th-large',
    text: 'The 2nd Button',
    id: 'button-2nd',
    onClick: () => console.log('click button-2nd'),
  }, {
    type: 'button',
    text: 'The 3rd Button',
    iconRight: 'glyphicon-th-list',
    id: 'button-3rd',
    onClick: () => console.log('click button-3rd'),
  }, {
    type: 'dropdown',
    button: {
      text: 'Dropdown',
    },
    menu: {
      items: [{
        text: 'The 1st DropdownItem',
        id: 'dropdown-item-1st',
        onClick: () => console.log('click dropdown-item-1st'),
      }, {
        type: 'dropdown-divider',
      }, {
        type: 'dropdown-header',
        text: 'Hello world!',
      }, {
        text: 'The 2nd DropdownItem',
        id: 'dropdown-item-2nd',
        onClick: () => console.log('click dropdown-item-2nd'),
      }],
    },
  }],
}).render();

