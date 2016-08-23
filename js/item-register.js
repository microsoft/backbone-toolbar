import _ from 'underscore';

const renderers = {};

export function register(name, builder) {
  if (_.has(renderers, name)) {
    throw new Error('Duplicated registration');
  }

  if (!_.isFunction(builder)) {
    throw new Error('Item builder has to be a function');
  }

  renderers[name] = builder;
}

export function getRenderer(type) {
  if (!_.isFunction(renderers[type])) {
    throw new Error('Unknown item type');
  }

  return renderers[type];
}

