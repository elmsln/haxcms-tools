const fs = require('fs-extra')
const path = require('path')

module.exports = function buildNodeLoad () {
  return function nodeLoad({ id }) {
    if (!id) {
      throw new Error('You must provide an id.')
    }
  }
}