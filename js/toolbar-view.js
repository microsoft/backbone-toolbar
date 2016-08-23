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

function renderItemTree(root) {
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
    _.extend(context, renderer(_.defaults({ id }, item), renderItem));
    stack.pop();

    return context.html;
  };

  renderItem(root);

  return contexts;
}

export class ToolbarView extends Backbone.View {
  initialize({
    id = _.uniqueId('toolbar-'),
    classes = [],
    items = [],
    events = {},
  }) {
    this._root = { type: 'toolbar', id, classes, items };
    this._events = events;
    this._contexts = renderItemTree(this._root);
  }

  get id() {
    return this._root.id;
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
    mergeEvents(this._events || {});
    _.each(this._contexts || {}, context => mergeEvents(context.events));

    return _.mapObject(handlerHash, sequence);
  }

  _removeContext(id) {
    _.each(this._contexts[id].children, this._removeContext, this);
    delete this._contexts[id];
  }

  get(id) {
    return _.chain(this._contexts).result(id).result('item').value();
  }

  update(item) {
    const id = item.id || this.id;
    const itemNew = _.defaults({ id }, item, this.get(id));

    if (id === this.id) {
      if (!itemNew.type !== 'toolbar') {
        throw new Error('The root item must be a toolbar');
      }
      this._root = itemNew;
    }

    if (_.has(this._contexts, id)) {
      const contexts = renderItemTree(itemNew);
      this._removeContext(id);
      _.each(contexts, (context, id) => {
        if (_.has(this._contexts, id)) {
          throw new Error('duplicated item id');
        }
        this._contexts[id] = context;
      });
      if (this._isRendered) {
        this.undelegateEvents();
        this.$(`#${id}`).replaceWith(contexts[id].html);
        this.delegateEvents();
      }
    } else {
      console.warn(`Trying to update invalid item with id '${id}'`);
    }
  }

  render() {
    this._isRendered = true;
    this.undelegateEvents();
    this.$el.html(this._contexts[this.id].html);
    this.delegateEvents();
    return this;
  }
}


