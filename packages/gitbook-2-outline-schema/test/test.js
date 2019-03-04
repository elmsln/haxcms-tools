const fs = require('fs');
const assert = require('assert');
const parseOutline = require('../index');


describe('Parser', function() {
  it('should convert markdown to json', function() {
    const outline = parseOutline(`${__dirname}/SUMMARY.md`);
  });
  it('it should have a title', function() {
    const outline = parseOutline(`${__dirname}/SUMMARY.md`);
    assert(outline.title === 'Summary');
  });
});