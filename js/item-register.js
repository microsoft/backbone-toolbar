import _ from 'underscore';

const renderers = {};

function mergeEvents(dest, src) {
  const result = dest || {};

  _.each(src, (handler, key) => {
    const handlerCur = result[key];
    if (_.isFunction(handlerCur)) {
      result[key] = function (...args) {
        handlerCur.apply(this, args);
        handler.apply(this, args);
      };
    } else {
      result[key] = handler;
    }
  });

  return result;
}

export function register(name, builder) {
  if (_.has(renderers, name)) {
    throw new Error('Duplicated registration');
  }

  if (!_.isFunction(builder)) {
    throw new Error('Item builder has to be a function');
  }

  renderers[name] = builder;
}

export function getItemBuilder(name) {
  if (!_.isFunction(renderers[name])) {
    throw new Error('Unknown item type');
  }

  return renderers[name];
}

export function renderItem(item, events) {
  if (!_.has(item, 'type')) {
    throw new Error('Invalid toolbar item');
  }

  const renderer = renderers[item.type];

  if (!_.isFunction(renderer)) {
    throw new Error('Unknown item type');
  }

  const result = renderer(item, renderItem);

  mergeEvents(events, result.events || {});

  return result.html;
}

