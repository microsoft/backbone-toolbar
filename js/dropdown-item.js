import _ from 'underscore';
import dropdownItemTemplate from './dropdown-item.jade';

export function renderDropdownItem(dropdownItem) {
  const options = _.extend({
    classes: [],
    id: _.uniqueId('dropdown-item-'),
    text: '',
    disabled: false,
    iconLeft: null,
    iconRight: null,
    tabindex: -1,
    onClick: null,
  }, dropdownItem);

  if (options.disabled) {
    options.classes = _.union(options.classes, ['disabled']);
  }

  const html = dropdownItemTemplate(options);
  const events = {};

  const { id, onClick } = options;

  if (_.isFunction(onClick) && !options.disabled) {
    events[`click .dropdown-item#${id}`] = onClick;
  }

  return { html, events };
}
