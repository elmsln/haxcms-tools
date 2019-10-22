const { writeFileSync, ensureDirSync } = require('fs-extra')
const { join, basename } = require('path')
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

module.exports = async ({ html, destination, url, download, targets }) => {
  let convertedHTML = html

  // convert all <img> tags
  if (targets.images) {
    convertedHTML = await downloadImgTags({ html: convertedHTML, destination, url, download });
  }
  // convert all media tokens
  if (targets.tokens) {
    convertedHTML = await convertTokens({ html: convertedHTML, destination, url, download });
  }

  return convertedHTML
}

/**
 * Convert ELMSLN media tokens
 */
const convertTokens = async ({ html, destination, url, download }) => {

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

  // if the download option is set then lets scrap some assests
  if (download) {
    for (let i in tokensContents) {
      const displayMode = tokensContents[i].display_mode
      if (displayMode) {
        if (displayMode.includes('image')) {
          let newValue = await imagesScrape(tokensContents[i], destination, url)
          // make sure those tags are escaped
          newValue = escape(newValue)
          // save them back to the tokens object
          tokensContents[i] = Object.assign({}, i, { newValue })
        }
        if (displayMode.includes('video')) {
          let newValue = await videoScrape(tokensContents[i], url)
          // make sure those tags are escaped
          newValue = escape(newValue)
          // save them back to the tokens object
          tokensContents[i] = Object.assign({}, i, { newValue })
        }
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

const videoScrape = async (item, url) => {
  // start up a browser and get all of the
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`${url}/node/${item.item}`)
  const videoPlayerTag = await page.evaluate(() => document.querySelector('.main-section video-player').outerHTML)
  return videoPlayerTag
}

const imagesScrape = async (item, destination, url) => {
  // start up a browser and get all of the
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`${url}/node/${item.item}`)
  // grab the image src
  const imageUrl = await page.evaluate(() => document.querySelector('.main-section .field-name-field-image img').getAttribute('src'))

  // update the remote img tag and capture the output
  // first we will alter the image url to fit the destination
  const updatedImageUrl = join('files', basename(imageUrl))
  const newHTML = await page.evaluate((updatedImageUrl) => {
    document
      .querySelector('.main-section .field-name-field-image img')
      .setAttribute('src', updatedImageUrl)
    return document.querySelector('.main-section .field-name-field-image img').parentElement.innerHTML
  }, updatedImageUrl)

  // travel to the image page
  const imageSource = await page.goto(imageUrl);
  // save the image locally to assets
  ensureDirSync(join(destination, 'files'))
  writeFileSync(join(destination, 'files', basename(imageUrl)), await imageSource.buffer());
  // close the browser
  await browser.close()
  // return the new HTML
  return newHTML
}

/**
 * Finds all image tags on 
 * @param {string} html 
 * @return {string} html
 */
const downloadImgTags = async ({ html, destination, url }) => {
  let convertedHTML = html
  const $ = cheerio.load(convertedHTML, {
    decodeEntities: false
  })
  let downloadQueue = []

  // find out if we have images to get
  const images = $('body').find('img')
  if (images.length > 0) {
    // find all images with cheerio
    $('img').each((i, el) => {
      // get the src attribute
      const src = $(el).attr('src')
      // find out if the image url is on our media server
      if (src.includes(url)) {
        downloadQueue = [...downloadQueue, src]
        // update the src in the html
        $(el).attr('src', join('files', basename(src)))
      }
    })

    // process the downloads
    const finished = await Promise.all(downloadQueue.map(async src => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      // navigate to the image on the interwebs
      const imageSource = await page.goto(src)
      // save the image locally to files
      ensureDirSync(join(destination, 'files'))
      writeFileSync(join(destination, 'files', basename(src)), await imageSource.buffer());
      await browser.close()
    }))

    return $('body').html()
  }

  // if we don't then return the html without touching it.
  return convertedHTML
}