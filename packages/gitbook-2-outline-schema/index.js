const fs = require('fs');
const showdown = require('showdown');
const converter = new showdown.Converter({ smartIndentationFix: true, disableForced4SpacesIndentedSublists: true });
const cheerio = require('cheerio')
const randomstring = require("randomstring");

let tree = [];

const parseOutline = (outlinePath) => {
  const md = fs.readFileSync(outlinePath, 'utf8');
  const html = converter.makeHtml(md);
  const $ = cheerio.load(html);
  // add uuids to each item that doesn't have one.
  const uuidsAdded = addUuids($);
  const title = $('#summary').text();
  const firstUl = $('ul').first();
  let treeAssembled = assembleTree($, firstUl);
  let outline = Object.assign({}, { title: title, tree: tree });
  return outline;
}

assembleTree = ($, parent) => {
  $(parent).children('li').each((index, el) => {
    const parentID = $(el).parent('ul').parent('li').find('a').attr('id') || null;
    const a = $(el).children().closest('a');
    const title = $(a).text();
    const href = $(a).attr('href');
    const id = $(a).attr('id');
    const item = Object.assign({}, { id: id, location: href, title: title, parent: parentID, order: index });
    tree.push(item);
    // recursively find more ul's and keep building tree
    const ul = $(el).children('ul').each((i, childUl) => {
      assembleTree($, childUl);
    });
  });
  return;
}

/**
 * Add UUID's to anchors in html
 * @return void
 */
addUuids = ($) => {
  $('a').each((i, el) => {
    const id = $(el).attr('id');
    if (id === undefined) {
      const uuid = randomstring.generate();
      $(el).attr('id', uuid);
    }
  })
  return;
}

module.exports = parseOutline;
