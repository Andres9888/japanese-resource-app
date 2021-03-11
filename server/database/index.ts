import { MongoClient } from "mongodb";
import hidden from "./hidden"
// Note: Need to add appropriate credentials here to make the connection
// Note #2: Database credentials should never be committed to source code!
const user = hidden.USER;
const userPassword = hidden.USERPASSWORD;
const cluster = hidden.CLUSTER;
const dbname = hidden.DBNAME

const url = `mongodb+srv://${user}:${userPassword}@${cluster}/${dbname}?retryWrites=true&w=majority`;


export const connectDatabase = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = client.db(dbname);

  return {
    listings: db.collection("japanese-resources-collection"),
    users: db.collection('users')
  };
};
