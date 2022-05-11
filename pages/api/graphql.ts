// @ts-nocheck

import { ApolloServer } from 'apollo-server-micro';
// import { makeSchema, queryType } from 'nexus';

import { schema } from '~server/graphql/nexus/schema';
// import { resolvers } from '~server/graphql/resolvers/clientResolver';
// import { typeDefs } from '~server/graphql/types/clientType';

const playground = {
  endpoint: `/api/graphql`,
};

// const Query = queryType({
//   definition(t) {
//     t.string('hello', { resolve: () => 'hello world!' });
//   },
// });
// const schema = makeSchema({
//   types: [Query],
// });

const apolloServerMicro = new ApolloServer({
  // typeDefs,
  // resolvers,
  schema,
  playground,
  context: async ({ req, res }) => ({ req, res }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServerMicro.createHandler({ path: '/api/graphql' });
