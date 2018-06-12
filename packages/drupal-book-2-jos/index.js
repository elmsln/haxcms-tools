const fs = require('fs-extra')
const parseString = require('xml2js').parseString;
const _ = require('lodash');

// get the file
module.exports = async (xml) => {
  const json = await xml2Json(xml)
  if (_.has(json, 'nodes.node')) {
    const jsonRawOutline = json.nodes.node
    // find top level book item
    const topLevelItem = jsonRawOutline.find(item => item.parent[0] === '')
    if (!topLevelItem) throw new Error('Top level item not found.')
    const jsonFormattedItems = jsonRawOutline
    // format the props
    .map(item => {
      let _i = Object.assign({})
      // deconstruct all of the nested arrays
      for (let prop in item) {
        _i[prop] = item[prop][0]
      }
      // move uuid to id
      _i['id'] = _i['uuid']
      delete _i['uuid']
      // move weight to order
      _i['order'] = _i['weight']
      delete _i['weight']
      // return the new item
      return _i
    })
    // remove the top level item
    .filter(item => item.id !== topLevelItem.uuid[0])

    // return the new jos
    return Object.assign({}, {title: topLevelItem.title, items: jsonFormattedItems})
  }
  else {
    throw new Error('Invalid xml structure.')
  }
}

const xml2Json = (xml) => {
  return new Promise(resolve => {
    return parseString(xml, (err,result) => {
      resolve(result)
    })
  })
}