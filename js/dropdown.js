import _ from 'underscore';
import dropdownTemplate from './dropdown.jade';

export function renderDropdown(dropdown, renderItem) {
  const { button = {}, menu = {} } = dropdown;

  const events = {};
  const options = _.defaults({
    button: _.defaults({
      tabindex: dropdown.tabindex,
      attributes: _.defaults({
        'data-toggle': 'dropdown',
        'aria-haspopup': 'true',
        'aria-expanded': 'false',
      }, button.attributes),
      classes: _.union(button.classes || [
        'btn',
        'btn-default',
      ], [
        'dropdown-toggle',
      ]),
    }, button, {
      id: _.uniqueId('dropdown-button-'),
      disabled: false,
      text: '',
      iconLeft: null,
      iconRight: ['glyphicon', 'glyphicon-triangle-bottom'],
    }),
    menu: _.defaults({
      items: _.map(menu.items, (item, index) => ({
        html: renderItem(_.defaults({
          tabindex: index === 0 ? 0 : -1,
        }, item, { type: 'dropdown-item' }), events),
      })),
    }, menu, {
      classes: [],
      id: _.uniqueId('menu-'),
    }),
  }, dropdown, {
    classes: [],
    id: _.uniqueId('dropdown-'),
    attributes: {},
  });
  const html = dropdownTemplate(options);

  return { html, events };
}

