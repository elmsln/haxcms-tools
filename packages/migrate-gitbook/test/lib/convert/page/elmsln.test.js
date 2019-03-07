// enable aliases https://gist.github.com/branneman/8048520
require('module-alias/register')
const { join, dirname } = require('path')
const { readFileSync, ensureDirSync } = require('fs-extra')
var assert = require('assert');
const elmsln = require('../../../../lib/convert/page/elmsln.js')
const tmpDir = join(__dirname, '../../../../.tmp')

// ensure there is a tmp folder
ensureDirSync(tmpDir)

describe('Convert ELMSLN tokens to HTML', function() {
  it('should correctly process media tokens', function() {
    const testHTML = readFileSync(join(__dirname, 'test.html'), 'utf8')
    const result = elmsln(testHTML, tmpDir)
  });
});