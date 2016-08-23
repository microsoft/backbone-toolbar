import { register } from './item-register.js';
import { renderButton } from './button.js';
import { renderToolbar } from './toolbar.js';

register('button', renderButton);
register('toolbar', renderToolbar);

export { register } from './item-register.js';
export { ToolbarView } from './toolbar-view.js';

