import $ from 'jquery';
import _ from 'underscore';
import dropdownRadioGroupTemplate from './dropdown-radio-group.jade';
import './dropdown-radio-group.less';

function normalizeItem(item) {
  const dropdownRadioGroup = _.extend({
    classes: [],
    title: '',
    items: [],
    removeText: null,
    removeIcon: null,
  }, item);

  if (!dropdownRadioGroup.removeIcon && !dropdownRadioGroup.removeText) {
    dropdownRadioGroup.removeIcon = 'glyphicon-remove';
  }

  return dropdownRadioGroup;
}

export function renderDropdownRadioGroup(item, renderItem) {
  const dropdownRadioGroup = normalizeItem(item);
  const html = dropdownRadioGroupTemplate(dropdownRadioGroup);
  const {
    id,
    onSelect = _.noop,
    onRemove = _.noop,
  } = dropdownRadioGroup;

  function onClick(e) {
    const $el = $(e.target);
    const $li = $el.closest('li');
    const $remove = $el.closest('.remove', $li.get(0));
    const value = $li.attr('data-value');
    if ($remove.length > 0) {
      onRemove(value);
    } else {
      this.update({ id, value });
      onSelect(value);
    }
  }

  const events = {
    [`click #${id} .dropdown-radio-item`]: onClick,
  };

  return { html, events };
}

