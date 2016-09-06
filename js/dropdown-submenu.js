import $ from 'jquery';
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
      iconRight: ['glyphicon', 'glyphicon-triangle-right'],
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

  events[`click #${options.button.id}`] = function (e) {
    const $menu = this.$(`#${options.menu.id}`);
    const hideMenu = () => {
      $menu.hide();
      $(document).off('click', hideMenu);
    };
    const showMenu = () => {
      $menu.show();
      $(document).on('click', hideMenu);
    };

    if ($menu.is(':visible')) {
      hideMenu();
    } else {
      showMenu();
    }

    e.stopPropagation();
    e.preventDefault();
  };

  return { html, events };
}

