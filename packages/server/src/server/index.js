const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const { JWT_SECRET } = require('../../lib/config/index.js')
const jsonwebtoken = require('jsonwebtoken')
const hax = require('../../lib/haxcms')

/**
 * Middlewares
 */
// cors
app.use(cors())
// json body parser
app.use(express.json())

/**
 * Router
 */
app.get('/login', (req, res) => res.send(jsonwebtoken.sign({}, JWT_SECRET, { expiresIn: '1d' })))

app.get('/app-settings', (req, res) => {
  const endpoint = `${req.protocol}://${req.get('host')}`
  return res.json({
    "login": `${endpoint}/login`,
    "logout": `${endpoint}/logout`,
    "saveNodePath": `${endpoint}/node/update`,
    "saveManifestPath": "dist\/dev\/saveManifestPath.json",
    "createNodePath": "dist\/dev\/saveNode.json",
    "deleteNodePath": "dist\/dev\/saveNode.json",
    "saveOutlinePath": "dist\/dev\/saveNode.json",
    "publishSitePath": "dist\/dev\/saveNode.json",
    "getNodeFieldsPath": "dist\/dev\/getNodeFieldsPath.json",
    "getSiteFieldsPath": "dist\/dev\/getSiteFieldsPath.json",
    "getFieldsToken": "adskjadshjudfu823u823u8fu8fij",
    "appStore": {
      "url": "dist\/dev\/appstore.json"
    },
    // add your custom theme here if testing locally and wanting to emulate the theme selector
    // this isn't really nessecary though
    "themes": { 
      "haxcms-dev-theme": { 
        "element": "haxcms-dev-theme", 
        "path": "@lrnwebcomponents/haxcms-elements/lib/haxcms-dev-theme.js", 
        "name": "Developer theme"
      }
    }
  })
})

app.post('/node/update', (req, res) => {
  const node = hax.Node.load({ id: req.body.nodeId })
})

/**
 * Start Server
 */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))