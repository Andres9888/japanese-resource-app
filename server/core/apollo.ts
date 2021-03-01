import { ApolloServer } from 'apollo-server-express'
//import { ApolloServer } from 'apollo-server-micro'

import {typeDefs} from '~server/graphql/types/clientType'
import {resolvers} from '~server/graphql/resolvers/clientResolver'
import { connectDatabase } from '~server/database'
import {schema} from '~lib/schema'

const { PORT = 3000 } = process.env

const playground = {
  endpoint: `http://localhost:${PORT}/graphql`,
}

let db

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  schema,
  playground,
  context: async () => {
    if (!db) {
      try {
        db = await connectDatabase()}
      catch (e) {
        console.log('error no db', e)
      }
    }
    return { db }
  }
}

)






export default apollo
