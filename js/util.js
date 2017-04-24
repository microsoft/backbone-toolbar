import _ from 'underscore';

/**
 * @typedef ParsedSelector
 * @type {Object}
 * @property {string[]} classes - The CSS classes
 * @property {string} id - The CSS id
 */

/**
 * A simple CSS selector parser recognizing classes and ID
 * @param {string} selector - The CSS selector
 * @return ParsedSelector
 */
export function parseSelector(selector) {
  const classes = [];
  const ids = [];
  const regex = /([#.])([^#.]+)/g;
  let match = null;

  while ((match = regex.exec(selector)) !== null) {
    if (match[1] === '#') {
      ids.push(match[2]);
    } else if (match[1] === '.') {
      classes.push(match[2]);
    }
  }

  const result = { classes };
  if (!_.isEmpty(ids)) {
    result.id = _.first(ids);
  }

  return result;
}

/**
 * Merge a list of callbacks into one which invokes them in sequence.
 * @param {function[]} funcs
 * @return {function}
 */
export function sequence(funcs) {
  return function (...args) {
    _.each(funcs, func => func.apply(this, args));
  };
}

