import { register } from './item-register.js';
import { renderToolbar } from './toolbar.js';
import { renderButton } from './button.js';
import { renderDropdown } from './dropdown.js';
import { renderDropdownItem } from './dropdown-item.js';
import { renderDropdownHeader } from './dropdown-header.js';
import { renderDropdownDivider } from './dropdown-divider.js';
import { renderDropdownRadioGroup } from './dropdown-radio-group.js';
import { renderDropdownSubmenu } from './dropdown-submenu.js';

register('toolbar', renderToolbar);
register('button', renderButton);
register('dropdown', renderDropdown);
register('dropdown-item', renderDropdownItem);
register('dropdown-header', renderDropdownHeader);
register('dropdown-divider', renderDropdownDivider);
register('dropdown-radio-group', renderDropdownRadioGroup);
register('dropdown-submenu', renderDropdownSubmenu);

export { register } from './item-register.js';
export { ToolbarView } from './toolbar-view.js';

