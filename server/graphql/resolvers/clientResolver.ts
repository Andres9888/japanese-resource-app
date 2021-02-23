import { ObjectId } from "mongodb";


export default {
  // Query
  Query: {
    listings: async (_root: undefined, _args: {}, { db }) => {
      return await db.listings.find({}).toArray();
    }
  },
  // Mutation
  Mutation: {
    increment: async (_root: undefined, { id }: { id: string }, { db }) => {
     return await db.listings.updateOne({  _id: new ObjectId(id) },
       {$inc: { count: 1 } })
    
  }
},
Listing: {
  id: (listing): string => listing._id.toString()
}
}