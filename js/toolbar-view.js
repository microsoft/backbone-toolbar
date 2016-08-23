import _ from 'underscore';
import Backbone from 'backbone';
import { renderItem } from './item-register.js';
import './toolbar.less';

function defaultState() {
  return {
    items: [],
    classes: [],
    events: {},
  };
}

export class ToolbarView extends Backbone.View {
  initialize() {
    this._props = { type: 'toolbar' };
    this._state = defaultState();
  }

  set(state) {
    this._state = _.extend(defaultState(), state);
    this._redraw();
    return this;
  }

  get(attr) {
    return _.result(this._state, attr);
  }

  _redraw() {
    if (this._isRendered) {
      const events = _.clone(this._state.events, {});
      const html = renderItem(_.defaults({}, this._props, this._state), events);

      this.undelegateEvents();
      this.$el.html(html);
      this.delegateEvents(events);
    }
  }

  render() {
    this._isRendered = true;
    this._redraw();
    return this;
  }
}


