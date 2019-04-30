const { gql } = require('apollo-server')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const GraphQLJSON = require('graphql-type-json');
const { JWT_SECRET } = require('../../../../lib/config/index.js')

const typeDefs = gql`
  scalar JSON

  extend type Mutation {
    login: JSON
  }
`

const resolvers = {
  Mutation: {
    // Handles user login
    login: () => {
      return jsonwebtoken.sign(
        {},
        JWT_SECRET,
        { expiresIn: '1d' }
      )
    }
  },

  JSON: GraphQLJSON
}

module.exports = {
  typeDefs, resolvers
}