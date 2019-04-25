const { gql } = require('apollo-server')
const GraphQLJSON = require('graphql-type-json');

const typeDefs = gql`
  extend type Query {
    appSettings: JSON!
  }
`

const resolvers = {
  Query: {
    appSettings: async (_, __, context, info) => {
      const endpoint = `${context.request.protocol}://${context.request.get('host')}${context.request.originalUrl}`
      return {
        "login": endpoint,
        "logout": endpoint,
        "saveNodePath": endpoint,
        "saveManifestPath": endpoint,
        "createNodePath": endpoint,
        "deleteNodePath": endpoint,
        "saveOutlinePath": endpoint,
        "publishSitePath": endpoint,
        "getNodeFieldsPath": endpoint,
        "getSiteFieldsPath": endpoint,
        "getFieldsToken": endpoint,
        "appStore": {
          "url": endpoint
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