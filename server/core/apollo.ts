import { ApolloServer } from 'apollo-server-express';
// import { ApolloServer } from 'apollo-server-micro'

import { schema } from '~lib/schema';
import { connectDatabase } from '~server/database';
import { resolvers } from '~server/graphql/resolvers/clientResolver';
import { typeDefs } from '~server/graphql/types/clientType';

const { PORT = 3000 } = process.env;

const playground = {
  endpoint: `http://localhost:${PORT}/graphql`,
};

let database;

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  schema,
  playground,
  context: async () => {
    if (!database) {
      try {
        database = await connectDatabase();
      } catch (error) {
        console.log('error no db', error);
      }
    }
    return { db: database };
  },
});

export default apollo;
