import { ToolbarView } from '../../js';
import 'bootstrap-webpack';

window.toolbar = new ToolbarView({
  el: '.toolbar-container',
  toolbarId: 'demo-toolbar',
  items: [{
    type: 'button',
    classes: ['btn', 'btn-primary'],
    id: 'button-1st',
    text: 'A button',
    onClick: () => console.log('click button-1st'),
  }, {
    type: 'button',
    iconLeft: ['glyphicon', 'glyphicon-th-large'],
    text: 'The 2nd Button',
    id: 'button-2nd',
    onClick: () => console.log('click button-2nd'),
  }, {
    type: 'button',
    text: 'The 3rd Button (disabled)',
    iconRight: ['glyphicon', 'glyphicon-th-list'],
    id: 'button-3rd',
    disabled: true,
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
      }, {
        text: 'The 3rd DropdownItem',
        id: 'dropdown-item-3rd',
        disabled: true,
        onClick: () => console.log('click dropdown-item-3rd'),
      }, {
        type: 'dropdown-divider',
      }, {
        type: 'dropdown-submenu',
        button: {
          text: 'A submenu',
        },
        menu: {
          items: [{
            text: 'Submenu item 1',
            onClick: () => console.log('click submenu item 1'),
          }],
        },
      }, {
        type: 'dropdown-divider',
      }, {
        type: 'dropdown-radio-group',
        id: 'dropdown-radio-group-1st',
        onSelect: value => console.log(`select ${value}`),
        onRemove: value => console.log(`remove ${value}`),
        title: 'A simple radio group',
        items: [
          { text: 'foo', value: 'foo' },
          { text: 'bar', value: 'bar' },
        ],
      }],
    },
  }, {
    type: 'dropdown',
    button: {
      text: 'The 2nd Dropdown (disabled)',
      disabled: true,
    },
  }],
}).render();
