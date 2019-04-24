const { ApolloServer } = require('apollo-server')

const server = new ApolloServer({
  modules: [
    require('./modules/authentication'),
    require('./modules/app-settings')
  ]
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})