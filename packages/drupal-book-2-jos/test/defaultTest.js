const fs = require('fs')
const path = require('path')
const assert = require('assert')
const book2Jos = require('../index')
const _ = require('lodash')

module.exports = async () => {
  describe('defaultTest', async () => {
    it('it should have a title', async function () {
      const xml = fs.readFileSync(path.join(__dirname, 'test.xml'), 'utf8')
      const jos = await book2Jos(xml)
      assert(jos.title)
    })
    it('it should have the correct amount of items', async function () {
      const xml = fs.readFileSync(path.join(__dirname, 'test.xml'), 'utf8')
      const jos = await book2Jos(xml)
      assert(jos.items.length === 415)
    })
    it('it should contain a title', async function () {
      const xml = fs.readFileSync(path.join(__dirname, 'test.xml'), 'utf8')
      const jos = await book2Jos(xml)
      assert(jos.title === 'Outline')
    })
    it('an item should be formatted properly', async function () {
      const xml = fs.readFileSync(path.join(__dirname, 'test.xml'), 'utf8')
      const jos = await book2Jos(xml)
      assert(_.has(jos, 'items[10]'))
      assert(jos.items[10].title === 'More About Water')
      assert(jos.items[10].id === '25fc3f22-1df1-48f2-96b8-0e443e5081aa')
      assert(jos.items[10].parent === 'da747b4f-210f-49a7-8d44-cd80f2f74210')
    })
  })
}