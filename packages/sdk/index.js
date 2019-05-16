const path = require('path')
const Case = require('case')

/**
 * Get the unique location of this file
 * @param {string} id Unique item id in a valid JOS file
 * @param {object} jos Valid JOS file
 * @return {string} location
 */
const getLocation = (id, jos) => {
  let location = ''
  const activeItem = jos.items.find(i => i.id === id)
  const tree = getTree(id, jos)
    .map(i => Case.kebab(i.title))
  if (tree.length > 0) {
    location = path.join('pages', ...tree.reverse(), 'index.html')
  }
  else {
    location = path.join('pages', Case.kebab(activeItem.title), 'index.html')
  }

  return generateUniqueLocation(location, jos)
}

/**
 * Recursively comes up with a new location based on the
 * jos file.
 * @param {location} location 
 * @param {object} jos 
 * @return {string}
 */
const generateUniqueLocation = (location, jos) => {
  // ensure that get location is unique
  const duplicate = jos.items.find(i => i.location === location)
  if (duplicate) {
    console.log('duplicate:', duplicate)
    process.exit(1)
    const locationDirName = path.parse(location).dir.split('/').pop()
    const newLocation = i.location
  }
  return location
}

/**
 * Get an array of tree parents of a JOS item
 * @param {string} id Unique item id in a valid JOS file
 * @param {object} jos Valid JOS file
 * @return {array} List of items
 */
const getTree = (id, jos) => {
  let tree = []

  const assembleParent = (_id) => {
    let activeItem = jos.items.find(i => i.id === _id)
    tree = [...tree, activeItem]
    if (typeof activeItem.parent !== 'undefined' && activeItem.parent !== null && activeItem.parent !== '') {
      assembleParent(activeItem.parent)
    }
    else {
      return
    }
  }

  // kick off assemble parent
  assembleParent(id)
  return tree
}

module.exports.getLocation = getLocation
module.exports.getTree = getTree