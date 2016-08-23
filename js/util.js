import _ from 'underscore';

export function parseSelector(selector) {
  const classes = [];
  const ids = [];
  const regex = /([#\.])([^#\.]+)/g;
  let match = null;

  while ((match = regex.exec(selector)) !== null) {
    if (match[1] === '#') {
      ids.push(match[2]);
    } else if (match[1] === '.') {
      classes.push(match[2]);
    }
  }

  return { classes, id: _.first(ids) };
}
