import chai from 'chai';
import { parseSelector } from '../js/util.js';

const expect = chai.expect;

describe('parseSelector', function () {
  it('should parse classes correctly', function () {
    const selector = '.foo.foo-bar';
    const classes = ['foo', 'foo-bar'];

    expect(parseSelector(selector)).to.deep.equal({ classes });
  });
});
