import _ from 'underscore';

const itemBuilders = {};

export function register(name, builder) {
  if (_.has(itemBuilders, name)) {
    throw new Error('Duplicated registration');
  }

  if (!_.isFunction(builder)) {
    throw new Error('Item builder has to be a function');
  }

  itemBuilders[name] = builder;
}

export function getItemBuilder(name) {
  if (!_.isFunction(itemBuilders[name])) {
    throw new Error('Unknown item type');
  }

  return itemBuilders[name];
}

