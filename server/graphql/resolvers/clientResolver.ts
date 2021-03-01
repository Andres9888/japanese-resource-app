import { ObjectId } from "mongodb";
import { connectDatabase } from '~server/database'

const dbPromise = connectDatabase();

const getCollection = async () => {
  const db = await dbPromise;
  return db;
};


export const resolvers = {
  
  // Query
  Query: {
    listings: async (_root: undefined, _args: {}) => {
      const collection = await getCollection();
      return await collection.listings.find({}).toArray();
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