const { writeFileSync, ensureDirSync } = require('fs-extra')
const { join, basename } = require('path')
var { flatMap } = require('lodash');
const puppeteer = require('puppeteer')

const ELMS_MEDIA_SERVER_URL = 'https://media.ed.science.psu.edu'

module.exports = async (html, destination) => {
  let convertedHTML = ''
  // regex for the tokens
  const ptrn = RegExp(/\[(.*)\]/g);
  let tokensFound = []
  let match;
  while ((match = ptrn.exec(html)) != null) {
    tokensFound.push(match)
  }
  // make an array that is just the tokens found
  const tokensContents = tokensFound
    // get the inside of the token
    .map(i => i[1])
    // split each param
    .map(i => i.split('|'))
    // split the params into their own sub array
    .map(i => i.map(ii => ii.split('=')))
    // convert nested arrays into a single object
    // and return as an array of objects
    .map(i => {
      const obj = {}
      i.forEach(ii => {
        const key = ii[0]
        const value = ii[1]
        obj[key] = value
      })
      return obj
    })

  for (let i of tokensContents) {
    switch (i.display_mode) {
      case 'image':
        await imagesScrape(i.item, destination)
        break;
    
      default:
        break;
    }
  }

  return convertedHTML
}

const imagesScrape = async (nid, destination) => {
  // start up a browser and get all of the
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  // navigate to the node page
  await page.goto(`${ELMS_MEDIA_SERVER_URL}/node/${nid}`)
  // grab the image src
  const imageUrl = await page.evaluate(() => document.querySelector('.main-section .field-name-field-image img').getAttribute('src'))
  // travel to the image page
  const imageSource = await page.goto(imageUrl);
  // save the image locally to assets
  ensureDirSync(join(destination, 'assets'))
  writeFileSync(join(destination, 'assets', basename(imageUrl)), await imageSource.buffer());
  // close the browser
  await browser.close()
  return 'asdf'
}