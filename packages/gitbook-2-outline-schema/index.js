const fs = require('fs-extra');
const converter = require('markdown-it')();
const cheerio = require('cheerio')
const randomstring = require("randomstring");
const Case = require('case')
const path = require('path')

let tree = [];
let $

const parseOutline = (outlinePath) => {
  const md = fs.readFileSync(outlinePath, 'utf8');
  const html = converter.render(md);
  $ = cheerio.load(html);
  // add uuids to each item that doesn't have one.
  const uuidsAdded = addUuids();
  const locationAdded = addLocation();
  const title = $('#summary').text();
  const firstUl = $('ul').first();
  let treeAssembled = assembleTree(firstUl);
  let outline = Object.assign({}, { title: title, items: tree });
  return outline;
}

assembleTree = (parent) => {
  $(parent).children('li').each((index, el) => {
    const parentEl = $(el).parent('ul').parent('li')
    const parentID = $(parentEl).attr('id') || null;
    // trick to get the immediate text without the children()
    const title = $(el).children('a').text() || $(el).clone().children().remove().end().text();
    let location = $(el).attr('data-location') || undefined;
    // if we don't have a defined location then make one based on the parent
    if (typeof location === 'undefined' || location === undefined || location === '' || !location) {
      location = `${randomstring.generate()}.md`
      // store in the
      $(el).attr('data-location', location)
    }
    const id = $(el).attr('id');
    let item = Object.assign({}, { id, title, location, parent: parentID, order: index, metadata: {} });
    // if we have a location then add it
    item = Object.assign({}, item, { location })
    tree.push(item);
    // recursively find more ul's and keep building tree
    const ul = $(el).children('ul').each((i, childUl) => {
      assembleTree(childUl);
    });
  });
  return;
}

/**
 * Add UUID's to anchors in html
 * @return void
 */
addUuids = () => {
  $('li').each((i, el) => {
    const id = $(el).attr('id');
    if (id === undefined) {
      const uuid = randomstring.generate();
      $(el).attr('id', uuid);
    }
  })
  return;
}

/**
 * Adds appropriate location data based on anchor tags
 */
addLocation = () => {
  $('li').each((i, el) => {
    const location = $(el).children().closest('a').attr('href');
    if (location) {
      $(el).attr('data-location', location);
    }
  })
  return;
}

module.exports = parseOutline;
