import { MongoClient } from "mongodb";

// Note: Need to add appropriate credentials here to make the connection
// Note #2: Database credentials should never be committed to source code!
// const user = hidden.USER;
// const userPassword = hidden.USERPASSWORD;
// const cluster = hidden.CLUSTER;
const dbname = process.env.DBNAME

//const url = `mongodb+srv://${user}:${userPassword}@${cluster}/${dbname}?retryWrites=true&w=majority`;

const url = encodeURI(process.env.DBURL)


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
