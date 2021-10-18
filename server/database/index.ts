import { MongoClient } from 'mongodb';

const dbname = process.env.DBNAME;

const url = encodeURI(process.env.DBURL);

export const connectDatabase = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db(dbname);

  return {
    listings: db.collection('japanese-resources-collection'),
    users: db.collection('users'),
  };
};
