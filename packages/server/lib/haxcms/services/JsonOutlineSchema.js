const fs = require('fs-extra')
const path = require('path')

const getOutline = () => {
  console.log(path.join(process.cwd(), 'site.json'))
  return fs.readJSONSync(path.join(process.cwd(), 'site.json'))
}

const getItem = ({ id }) => {
  return getOutline().items.find(i => i.id === id)
}

module.exports = Object.freeze({
  getOutline,
  getItem
})