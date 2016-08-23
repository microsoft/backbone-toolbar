import { Toolbar } from '../../js';
import 'bootstrap-webpack';

const toolbar = new Toolbar({
  el: '.toolbar-container',
}).set({
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
  }],
}).render();