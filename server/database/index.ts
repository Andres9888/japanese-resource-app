// @ts-nocheck
import { MongoClient } from 'mongodb';

const dbname = process.env.DBNAME;

const url = encodeURI(process.env.DBURL);

export const connectDatabase = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const database = client.db(dbname);

  return {
    listings: database.collection('japanese-resources-collection'),
    users: database.collection('users'),
  };
};
