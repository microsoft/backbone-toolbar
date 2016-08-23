import { register } from './item-register.js';
import { renderToolbar } from './toolbar.js';
import { renderButton } from './button.js';
import { renderDropdown } from './dropdown.js';
import { renderMenuItem } from './menu-item.js';

register('toolbar', renderToolbar);
register('button', renderButton);
register('dropdown', renderDropdown);
register('menu-item', renderMenuItem);

export { register } from './item-register.js';
export { ToolbarView } from './toolbar-view.js';

