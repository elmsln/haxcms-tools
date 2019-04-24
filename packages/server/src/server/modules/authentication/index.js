const { gql } = require('apollo-server')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const GraphQLJSON = require('graphql-type-json');
const { JWT_SECRET } = require('../../../../lib/config/index.js')

const typeDefs = gql`
  scalar JSON

  extend type Query {
    hi: String!
  }

  extend type Mutation {
    signup(username: String!, email: String!, password: String!): JSON
    login(email: String!, password: String!): JSON
  }
`

const resolvers = {
  Query: {
    factory: () => 'hi'
  },
  Mutation: {
    // Handle user signup
    signup: (_, { username, email, password }) => {
      // // return json web token
      // return jsonwebtoken.sign(
      //   { id: user.id, email: user.email },
      //   process.env.JWT_SECRET,
      //   { expiresIn: '1y' }
      // )
    },

    // Handles user login
    login: (_, { email, password }) => {
      // const user = await User.findOne({ where: { email } })

      // if (!user) {
      //   throw new Error('No user with that email')
      // }

      // const valid = await bcrypt.compare(password, user.password)

      // if (!valid) {
      //   throw new Error('Incorrect password')
      // }

      // return json web token
      return jsonwebtoken.sign(
        { id: 1, email },
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