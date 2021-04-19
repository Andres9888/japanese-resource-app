
import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from '~server/graphql/types/clientType'
import { resolvers } from '~server/graphql/resolvers/clientResolver'
import { schema } from '~lib/schema'


const playground = {
  endpoint: `/api/graphql`,
}


const apolloServerMicro = new ApolloServer({
  typeDefs,
  resolvers,
  schema,
  playground,
})


export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServerMicro.createHandler({ path: '/api/graphql' })