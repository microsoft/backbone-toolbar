import chai from 'chai';
import { parseSelector } from '../js/util.js';

const expect = chai.expect;

describe('parseSelector', function () {
  it('should parse classes correctly', function () {
    const selector = '.foo.foo-bar';
    const classes = ['foo', 'foo-bar'];

    expect(parseSelector(selector)).to.deep.equal({ classes });
  });

  it('should parse id correctly', function () {
    const selector = '#foo#foo-bar';
    const id = 'foo';

    expect(parseSelector(selector)).to.deep.equal({ classes: [], id });
  });

  it('shoul parse mixed selector correctly', function () {
    const selector = '.foo#bar.foo-bar';
    const classes = ['foo', 'foo-bar'];
    const id = 'bar';

    expect(parseSelector(selector)).to.deep.equal({ classes, id });
  });
});

