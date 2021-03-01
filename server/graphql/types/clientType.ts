//scalar IsoDate #declered for all .graphql files
import { gql } from '@apollo/client'

export const typeDefs = gql`
type Listing {
    id: ID!
    image: String!
    url: String!
    title: String!
    description: String!
    tags:[String!]!
    count: Int!
  }

  type Query {
    listings: [Listing!]!
  }
  type CountResult {
  acknowledged: Boolean
  }
 type Mutation {
    increment(id: ID!): CountResult
  }
`



  
  
