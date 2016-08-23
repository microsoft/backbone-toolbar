import _ from 'underscore';
import dropdownItemTemplate from './dropdown-item.jade';

export function renderDropdownItem(dropdownItem) {
  const options = _.extend({
    classes: [],
    id:  _.uniqueId('dropdown-item-'),
    text: '',
    iconLeft: null,
    iconRight: null,
    tabindex: -1,
    onClick: null,
  }, dropdownItem);
  const html = dropdownItemTemplate(options);
  const events = {};

  const { id, onClick } = options;

  if (_.isFunction(onClick)) {
    events[`click .dropdown-item#${id}`] = onClick;
  }

  return { html, events };
}

