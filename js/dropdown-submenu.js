import _ from 'underscore';
import dropdownSubmenuTemplate from './dropdown-submenu.jade';
import './dropdown-submenu.less';

export function renderDropdownSubmenu(dropdownSubmenu, renderItem) {
  const { button = {}, menu = {} } = dropdownSubmenu;
  const events = {};
  const options = _.defaults({
    button: _.defaults({
      tabindex: dropdownSubmenu.tabindex,
      attributes: _.defaults({
        'data-toggle': 'dropdown',
        'aria-haspopup': 'true',
        'aria-expanded': 'false',
      }, button.attributes),
      classes: _.union(button.classes, ['dropdown-toggle']),
    }, button, {
      id: _.uniqueId('dropdown-submenu-button-'),
      text: '',
      iconLeft: null,
      iconRight: ['glyphicon', 'glyphicon-triangle-right', 'pull-right'],
    }),
    menu: _.defaults({
      items: _.map(menu.items, (item, index) => ({
        html: renderItem(_.defaults({
          tabindex: index === 0 ? 0 : -1,
        }, item, {
          type: 'dropdown-item',
        }), events),
      })),
    }, menu, {
      classes: [],
      id: _.uniqueId('menu-'),
    }),
  }, dropdownSubmenu);

  const html = dropdownSubmenuTemplate(options);
  const selector = `li#${options.id}`;

  events[`mouseover ${selector}`] = function () {
    this.$(`#${options.menu.id}`).show();
  };

  events[`mouseover ul:has(> ${selector}) > li:not(${selector})`] = function () {
    this.$(`#${options.menu.id}`).hide();
  };

  return { html, events };
}

