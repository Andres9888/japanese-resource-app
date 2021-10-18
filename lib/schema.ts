/* eslint-disable import/no-extraneous-dependencies */
import { makeExecutableSchema } from 'graphql-tools';

import { resolvers } from '~server/graphql/resolvers/clientResolver';
import { typeDefs } from '~server/graphql/types/clientType';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
