import _ from 'underscore';
import { parseSelector } from './util.js';
import toolbarTemplate from './toolbar.jade';

function normalizeItem(item) {
  if (_.isString(item)) {
    return _.extend({ type: 'stub' }, parseSelector(item));
  }
  return item;
}

export function renderToolbar(toolbar, renderItem) {
  const events = {};

  const options = _.defaults({
    items: _.map(toolbar.items, (item, index) => ({
      html: renderItem(_.defaults({
        tabindex: index === 0 ? 0 : -1,
      }, normalizeItem(item)), events),
    })),
  }, toolbar, {
    classes: [],
    id: _.uniqueId('toolbar-'),
  });
  const html = toolbarTemplate(options);

  return { html, events };
}

