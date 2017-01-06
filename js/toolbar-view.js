import _ from 'underscore';
import Backbone from 'backbone';
import { sequence } from './util.js';
import { getRenderer } from './item-register.js';
import './toolbar.less';

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

/**
 * The Backbone View of configurable toolbar
 * @class ToolbarView
 *
 * @param {Object} options
 * @param {string} [options.toolbarId]
 *    The id of the toolbar.
 * @param {string[]} [options.classes=[]]
 *    The classes of the toolbar.
 * @param {ToolbarItemConfig[]} [options.items=[]]
 *    The list of the toolbar items.
 */
export class ToolbarView extends Backbone.View {
  initialize({
    toolbarId = _.uniqueId('toolbar-'),
    classes = [],
    items = [],
  }) {
    this._root = { type: 'toolbar', id: toolbarId, classes, items };
    this._contexts = renderItemTree(this._root);
  }

  /**
   * Get the Backbone View event hash.
   * @return BackboneViewEventHash
   */
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
    _.each(this._contexts || {}, context => mergeEvents(context.events));

    return _.mapObject(handlerHash, sequence);
  }

  _removeContext(id) {
    _.each(this._contexts[id].children, this._removeContext, this);
    delete this._contexts[id];
  }

  /**
   * The ID of the root toolbar item.
   * @type {string}
   */
  get rootId() {
    return this._root.id;
  }

  /**
   * Get the configuration of a toolbar item.
   * @param {string} id - The ID of the item.
   * @return {ToolbarItemConfig}
   */
  get(id) {
    return _.chain(this._contexts)
      .result(id || this.rootId)
      .result('item')
      .value();
  }

  /**
   * Set the configuration of a toolbar item.
   * @param {string} id
   *    The ID of the item.
   * @param {(ToolbarItemConfig|ToolbarSetCallback)} options
   *    Describe the new configuration of the toolbar item.
   */
  set(id, options) {
    /**
     * @callback ToolbarSetCallback
     * @param {ToolbarItemConfig} config - The current configuration.
     * @return {ToolbarItemConfig} - The new configuration.
     */
    const item = _.isFunction(options) ? options(this.get(id)) : options;

    this.update(_.defaults({
      id: id || this.rootId,
    }, item));
  }

  /**
   * Update a toolbar item.
   * @param {ToolbarItemConfig} item - The updated toolbar item configuration.
   */
  update(item) {
    const id = item.id || this.rootId;
    const itemNew = _.defaults({ id }, item, this.get(id));

    if (id === this.rootId) {
      if (itemNew.type !== 'toolbar') {
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

  /**
   * Render the toolbar as a Backbone View.
   */
  render() {
    this._isRendered = true;
    this.undelegateEvents();
    this.$el.html(this._contexts[this.rootId].html);
    this.delegateEvents();
    return this;
  }
}

