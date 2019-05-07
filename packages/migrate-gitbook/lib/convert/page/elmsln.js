const { writeFileSync, ensureDirSync } = require('fs-extra')
const { join, basename } = require('path')
const puppeteer = require('puppeteer')

const ELMS_MEDIA_SERVER_URL = 'https://media.ed.science.psu.edu'

module.exports = async (html, destination) => {

  let convertedHTML = html
  // regex for the tokens
  const ptrn = RegExp(/\[(.*)\]/g);
  let tokensFound = []
  let match;
  while ((match = ptrn.exec(html)) != null) {
    tokensFound.push(match)
  }

  // remove html from tokens
  tokensFound = tokensFound.map(tokenMatch => {
    // get the raw token found
    let newTokenMatch = Object.assign({}, tokenMatch)
    if (newTokenMatch[0].includes('<em>')) {
      newTokenMatch[0] = newTokenMatch[0].replace('<em>', '_')
      newTokenMatch[1] = newTokenMatch[1].replace('<em>', '_')
    }
    if (newTokenMatch[0].includes('</em>')) {
      newTokenMatch[0] = newTokenMatch[0].replace('</em>', '_')
      newTokenMatch[1] = newTokenMatch[1].replace('</em>', '_')
    }
    if (newTokenMatch[0].includes('<strong>')) {
      newTokenMatch[0] = newTokenMatch[0].replace('<strong>', '__')
      newTokenMatch[1] = newTokenMatch[1].replace('<strong>', '__')
    }
    if (newTokenMatch[0].includes('</strong>')) {
      newTokenMatch[0] = newTokenMatch[0].replace('</strong>', '__')
      newTokenMatch[1] = newTokenMatch[1].replace('</strong>', '__')
    }
    // update the convertedHTML document
    convertedHTML = convertedHTML.replace(tokenMatch[0], newTokenMatch[0])
    // return the new token match
    return newTokenMatch
  })

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

  for (let i in tokensContents) {
    const displayMode = tokensContents[i].display_mode 
    if (displayMode) {
      if (displayMode.includes('image')) {
        let newValue = await imagesScrape(tokensContents[i], destination)
        // make sure those tags are escaped
        newValue = escape(newValue)
        // save them back to the tokens object
        tokensContents[i] = Object.assign({}, i, { newValue })
      }
      if (displayMode.includes('video')) {
        let newValue = await videoScrape(tokensContents[i])
        // make sure those tags are escaped
        newValue = escape(newValue)
        // save them back to the tokens object
        tokensContents[i] = Object.assign({}, i, { newValue })
      }
    }
  }

  // loop through the tokens and update them
  // in the converted html
  for (let i in tokensFound) {
    const oldValue = tokensFound[i][0]
    const newValue = tokensContents[i].newValue
    // if we have a new value then replace it
    if (typeof newValue !== 'undefined') {
      convertedHTML = convertedHTML.replace(oldValue, unescape(newValue))
    }
  }

  return convertedHTML
}

const videoScrape = async (item) => {
  // start up a browser and get all of the
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`${ELMS_MEDIA_SERVER_URL}/node/${item.item}`)
  const videoPlayerTag = await page.evaluate(() => document.querySelector('.main-section video-player').outerHTML)
  return videoPlayerTag
}

const imagesScrape = async (item, destination) => {
  // start up a browser and get all of the
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`${ELMS_MEDIA_SERVER_URL}/node/${item.item}`)
  // grab the image src
  const imageUrl = await page.evaluate(() => document.querySelector('.main-section .field-name-field-image img').getAttribute('src'))

  // update the remote img tag and capture the output
  // first we will alter the image url to fit the destination
  const updatedImageUrl = join('assets', basename(imageUrl))
  const newHTML = await page.evaluate((updatedImageUrl) => {
    document
      .querySelector('.main-section .field-name-field-image img')
      .setAttribute('src', updatedImageUrl)
    return document.querySelector('.main-section .field-name-field-image img').parentElement.innerHTML
  }, updatedImageUrl)

  // travel to the image page
  const imageSource = await page.goto(imageUrl);
  // save the image locally to assets
  ensureDirSync(join(destination, 'assets'))
  writeFileSync(join(destination, 'assets', basename(imageUrl)), await imageSource.buffer());
  // close the browser
  await browser.close()
  // return the new HTML
  return newHTML
}