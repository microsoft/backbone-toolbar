import _ from 'underscore';
import menuItemTemplate from './menu-item.jade';

export function renderMenuItem(menuItem) {
  const options = _.extend({
    classes: [],
    id:  _.uniqueId('menu-item-'),
    text: '',
    iconLeft: null,
    iconRight: null,
    tabindex: -1,
    onClick: null,
  }, menuItem);
  const html = menuItemTemplate(options);
  const events = {};

  const { id, onClick } = options;

  if (_.isFunction(onClick)) {
    events[`click .menu-item#${id}`] = onClick;
  }

  return { html, events };
}

