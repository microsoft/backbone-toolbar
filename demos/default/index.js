import { Toolbar } from '../../js';
import 'bootstrap-webpack';

const toolbar = new Toolbar({
  el: '.toolbar-container',
}).set({
  items: [{
    type: 'button',
    classes: ['btn', 'btn-primary'],
    title: 'A button',
    name: 'first-button',
    onClick: () => console.log('click first-button'),
  }],
}).render();
