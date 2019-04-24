const { gql } = require('apollo-server')
const GraphQLJSON = require('graphql-type-json');

const typeDefs = gql`
  extend type Query {
    appSettings: JSON!
  }
`

const resolvers = {
  Query: {
    appSettings: () => {
      return {
        "login": "dist\/dev\/login.json",
        "logout": "dist\/dev\/logout.json",
        "saveNodePath": "dist\/dev\/saveNode.json",
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
      }
    }
  }
}

module.exports = {
  typeDefs, resolvers
}