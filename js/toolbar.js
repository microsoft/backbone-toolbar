import _ from 'underscore';
import Backbone from 'backbone';
import toolbarTemplate from './toolbar.jade';
import { buildButtonItem } from './button.js';
import './toolbar.less';

const builders = {
  button: buildButtonItem,
};

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

function normalizeItem(item) {
  if (_.isString(item)) {
    const { classes, id } = parseSelector(item);
    return {
      type: 'stub',
      classes,
      id,
    };
  } else if (!_.has(item, 'type')) {
    const error = new Error('Invalid toolbar item');
    error.item = item;
    throw error;
  } else if (!_.isFunction(builders[item.type])) {
    const error = new Error('Unknown item type');
    error.type = item.type;
    throw error;
  }

  return item;
}

export class Toolbar extends Backbone.View {
  initialize() {
    this._props = {};
    this._state = {
      items: [],
      events: {},
    };
  }

  set(state) {
    this._state = state;
    this._redraw();
    return this;
  }

  get(attr) {
    return this._state.get(attr);
  }

  _buildItems() {
    return _.reduce(this._state.items, (memo, item, index) => {
      const toolbarItemBuilder = builders[normalizeItem(item).type];
      const { events, html } = toolbarItemBuilder(_.defaults({
        tabindex: index === 0 ? 0 : -1,
      }, item));

      memo.items.push({ html });
      memo.events = mergeEvents(memo.events, events);
      return memo;
    }, {
      items: [],
      events: this._state.events,
    });
  }

  _redraw() {
    if (this._isRendered) {
      const { items, events } = this._buildItems();
      this.undelegateEvents();
      this.$el.html(toolbarTemplate({ items }));
      this.delegateEvents(events);
    }
  }

  render() {
    this._isRendered = true;
    this._redraw();
    return this;
  }
}


