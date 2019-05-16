const fs = require('fs-extra')
const path = require('path')
const parseString = require('xml2js').parseString;
const moment = require('moment')
const _ = require('lodash');
const HAXgetLocation = require('@haxcms/sdk').getLocation

/**
 * Converts an xml document to HAXcms
 * @todo
 *  only supports updating the items array.
 *  need to make it configurable
 * 
 * @param {string} xml 
 * @param {string} dest 
 */
const convert = async (xml, dest) => {
  // make the jos file
  const jos = await convertJOS(xml)
  // loop over the items and convert the body field to a file
  jos.items = jos.items.map(item => {
    try {
      // make a new location
      const location = HAXgetLocation(item.id, jos)
      const locationAbsolute = path.join(dest, location)
      fs.ensureDirSync(path.dirname(locationAbsolute))
      fs.writeFileSync(location, item.body, 'utf8')
      delete _item['body']
      return _item
    } catch (error) {
      throw error
    }
  });

  // load existing site.json
  const siteJOSPath = path.join(dest, 'site.json')
  let siteJOS = {}
  try {
    siteJOS = fs.readJSONSync(siteJOSPath)
  } catch (error) {}
  // merge the two jos
  const newJOS = Object.assign({}, siteJOS, { items: jos.items })
  return fs.writeFileSync(path.join(dest, 'site.json'), JSON.stringify(newJOS, null, 4))
}

// get the xml file to JOS
const convertJOS = async (xml) => {
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
      // ensure parent is null if empty
      if (_i['parent'] === '') {
        _i['parent'] = null
      }
      // move weight to order
      _i['order'] = Number(_i['weight'])
      delete _i['weight']
      _i['body'] = _i['body'] || ''
      // add indent
      _i['indent'] = Number(_i['indent']) || 0
      // add metadata
      _i['description'] = _i['description'] || ''
      // add metadata
      _i['metadata'] = _i['metadata'] || {}
      // add metadata
      _i['metadata']['created'] = _i['created'] || new Date().getTime()
      delete _i['created']
      _i['metadata']['updated'] = _i['updated'] || new Date().getTime()
      delete _i['updated']
      // move uid
      if (typeof _i['uid'] !== 'undefined') {
        _i['metadata']['uid'] = _i['uid']
        delete _i['uid']
      }
      // return the new item
      return _i
    })

    // return the new jos
    return Object.assign({}, {title: topLevelItem.title[0], items: jsonFormattedItems})
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

module.exports.convert = convert
module.exports.convertJOS = convertJOS
module.exports.xml2Json = xml2Json