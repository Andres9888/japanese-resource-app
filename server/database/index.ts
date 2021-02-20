import { MongoClient } from "mongodb";

// Note: Need to add appropriate credentials here to make the connection
// Note #2: Database credentials should never be committed to source code!
const user = process.env.USER;
const userPassword = process.env.USERPASSWORD;
const cluster = process.env.CLUSTER;
const dbname = process.env.DBNAME

const url = `mongodb+srv://${user}:${userPassword}@${cluster}/${dbname}?retryWrites=true&w=majority`;

export const connectDatabase = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = client.db(dbname);

  return {
    listings: db.collection("test_listings")
  };
};
