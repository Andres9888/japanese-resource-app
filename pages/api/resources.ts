import { connectDatabase } from '~server/database';

export default async (req, res) => {
  try {
    const db = await connectDatabase();
    const resources = await db.listings.find({}).toArray();
    console.log(req.cookies.viewer);
    res.status(200).json({ resources });
  } catch (error) {
    throw new Error(`Failed to query listings: ${error}`);
  }
};
