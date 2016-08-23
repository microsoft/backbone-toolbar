import _ from 'underscore';
import buttonTemplate from './button.jade';

export function buildButtonItem(item) {
  const {
    classes = ['btn', 'btn-default'],
    id = _.uniqueId('button-'),
    text = '',
    iconLeft = null,
    iconRight = null,
    tabindex = -1,
    onClick = null,
  } = item;

  if (!_.contains(classes, 'btn')) {
    classes.push('btn');
  }

  const options = { classes, id, text, iconLeft, iconRight, tabindex };
  const html = buttonTemplate(options);
  const events = {};

  if (_.isFunction(onClick)) {
    events[`click button#${id}`] = onClick;
  }

  return { html, events };
}

