import { ApolloServer } from 'apollo-server-express'

import typeDefs from '~server/graphql/typeDefs'
import resolvers from '~server/graphql/resolvers'
import { connectDatabase } from '~server/database'


const { PORT = 3000 } = process.env

const playground = {
  endpoint: `http://localhost:${PORT}/graphql`,
}

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  playground,
  context: async () => {
    const db = await connectDatabase()
    return {db}
  }
})




export default apollo
