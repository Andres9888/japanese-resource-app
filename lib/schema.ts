import { makeExecutableSchema } from 'graphql-tools'
import {typeDefs} from '~server/graphql/types/clientType'
import {resolvers} from '~server/graphql/resolvers/clientResolver'

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})