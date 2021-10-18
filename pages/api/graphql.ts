import { ApolloServer } from 'apollo-server-micro';

import { schema } from '~lib/schema';
import { resolvers } from '~server/graphql/resolvers/clientResolver';
import { typeDefs } from '~server/graphql/types/clientType';

const playground = {
  endpoint: `/api/graphql`,
};

const apolloServerMicro = new ApolloServer({
  typeDefs,
  resolvers,
  schema,
  playground,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServerMicro.createHandler({ path: '/api/graphql' });
