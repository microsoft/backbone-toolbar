import _ from 'underscore';
import Backbone from 'backbone';
import { sequence } from './util.js';
import { getRenderer } from './item-register.js';
import './toolbar.less';

function defaultState() {
  return {
    items: [],
    classes: [],
    events: {},
  };
}

function getItemContext(item) {
  if (!_.isString(item.type)) {
    throw new Error('Invalie item');
  }

  const id = item.id || _.uniqueId(`${item.type}-`);
  const renderer = getRenderer(item.type);

  return { id, item, renderer, children: [] };
}

function renderItemTree(item) {
  const contexts = {};
  const stack = [];

  const renderItem = item => {
    const context = getItemContext(item);
    const { renderer, id } = context;

    contexts[id] = context;
    if (stack.length > 0) {
      _.last(stack).children.push(id);
    }
    stack.push(context);
    const {
      events = {},
      html = '',
    } = renderer(_.defaults({ id }, item), renderItem);
    stack.pop();

    context.events = events;
    return html;
  };

  const html = renderItem(item);
  return { html, contexts };
}

export class ToolbarView extends Backbone.View {
  initialize() {
    this._props = { type: 'toolbar' };
    this._state = defaultState();
    this._context = {};
  }

  set(state) {
    this._state = _.extend(defaultState(), state);
    this._redraw();
    return this;
  }

  events() {
    const handlerHash = {};
    const mergeEvents = events => {
      _.each(events, (handler, key) => {
        if (!_.has(handlerHash, key)) {
          handlerHash[key] = [];
        }
        handlerHash[key].push(handler);
      });
    };
    mergeEvents(_.result(this._state, 'events', {}));
    _.each(this._contexts || {}, context => mergeEvents(context.events));

    return _.mapObject(handlerHash, sequence);
  }

  _redraw() {
    if (this._isRendered) {
      const {
        contexts = {},
        html = '',
      } = renderItemTree(_.defaults({}, this._props, this._state));

      this._contexts = contexts;

      this.undelegateEvents();
      this.$el.html(html);
      this.delegateEvents(this.events());
    }
  }

  render() {
    this._isRendered = true;
    this._redraw();
    return this;
  }
}


