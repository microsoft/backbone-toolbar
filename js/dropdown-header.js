import _ from 'underscore';
import dropdownHeaderTemplate from './dropdown-header.jade';

export function renderDropdownHeader(dropdownHeader) {
  return {
    html: dropdownHeaderTemplate(_.defaults(dropdownHeader, { text: '' })),
  };
}

