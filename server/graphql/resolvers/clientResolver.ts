export default {
  // Query
  Query: {
    listings: async (_root: undefined, _args: {}, { db }) => {
      return await db.listings.find({}).toArray();
    }
  },
  // Mutation
  Mutation: {
    increment: async (_root: undefined, _args: {}, { db }) => {
     return await db.listings.updateOne({ title: 'Clean and fully furnished apartment' },
       {$inc: { count: 1 } })
    
  }
}
}