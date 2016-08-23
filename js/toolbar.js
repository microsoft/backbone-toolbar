import _ from 'underscore';
import Backbone from 'backbone';
import toolbarTemplate from './toolbar.jade';
import { buildButtonViewModel } from './button.js';

const builders = {
  button: buildButtonViewModel,
};

function convertToViewModel({ items, events }) {
  const viewModel = _.reduce(items, (memo, item) => {
    const builder = builders[item.type] || _.identity;
    return builder(memo, item);
  }, { items: [], events });
  return viewModel;
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


