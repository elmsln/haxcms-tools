const fs = require('fs-extra')
const path = require('path')
const parseString = require('xml2js').parseString;
const _ = require('lodash');

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
      const location = path.join(dest, 'pages', item.id, 'index.html')
      fs.ensureDirSync(path.dirname(location))
      fs.writeFileSync(location, item.body, 'utf8')
      const _item = Object.assign({}, item, { location })
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
  return fs.writeJSONSync(path.join(dest, 'site.json'), newJOS)
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
      // move weight to order
      _i['order'] = _i['weight']
      delete _i['weight']
      // move uuid to id
      _i['body'] = _i['body'] || ''
      // add indent
      _i['indent'] = _i['indent'] || 0
      // add metadata
      _i['description'] = _i['description'] || ''
      // add metadata
      _i['metadata'] = _i['metadata'] || {}
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