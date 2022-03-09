import { connectDatabase } from '~server/database';

export default async (req, res) => {
  try {
    const database = await connectDatabase();
    const resources = await database.listings
      .find({})
      .sort({ count: -1 })
      .toArray();
    console.log(req.cookies.viewer);
    res.status(200).json({ resources });
  } catch (error) {
    throw new Error(`Failed to query listings: ${error}`);
  }
};
