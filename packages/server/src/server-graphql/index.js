const { ApolloServer } = require('apollo-server')

const server = new ApolloServer({
  modules: [
    require('./modules/authentication'),
    require('./modules/app-settings')
  ],
  // pass request headers to the resolvers
  context: ({req}) => ({
    request: req
  })
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})