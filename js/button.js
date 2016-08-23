import _ from 'underscore';
import buttonTemplate from './button.jade';

export function renderButton(button) {
  const options = _.defaults({}, button, {
    classes: ['btn', 'btn-default'],
    id:  _.uniqueId('button-'),
    text: '',
    iconLeft: null,
    iconRight: null,
    tabindex: -1,
    onClick: null,
  });
  const html = buttonTemplate(options);
  const events = {};

  const { id, onClick } = options;

  if (_.isFunction(onClick)) {
    events[`click button#${id}`] = onClick;
  }

  return { html, events };
}

