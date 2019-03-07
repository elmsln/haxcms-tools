// enable aliases https://gist.github.com/branneman/8048520
require('module-alias/register')
const { join, dirname } = require('path')
const { readFileSync, ensureDirSync, readdirSync, emptyDirSync } = require('fs-extra')
var assert = require('assert');
const elmsln = require('../../../../lib/convert/page/elmsln.js')
const tmpDir = join(__dirname, '../../../../tmp')

// ensure there is a tmp folder
ensureDirSync(tmpDir)
emptyDirSync(tmpDir)


describe('Convert ELMSLN tokens to HTML', function() {
  it('it should download images correctly', async function() {
    const testHTML = readFileSync(join(__dirname, 'test.html'), 'utf8')
    await elmsln(testHTML, tmpDir)
    // const downloadedImages = readdirSync(join(tmpDir, 'assets'))
    // assert.equal(downloadedImages.length, 2)
  });

  it('it should convert the tokens correctly', async function() {
    const testHTML = readFileSync(join(__dirname, 'test.html'), 'utf8')
    const result = await elmsln(testHTML, tmpDir)
  });
});