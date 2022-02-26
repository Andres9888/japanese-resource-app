// Instantiate a new client (server side)

const stream = require('getstream');

const secret = process.env.GETSTREAM_SECRET;
export default async (req, res) => {
  const client = stream.connect('ezcjh4aax2cv', secret, '1163661');
  // Instantiate a new client (client side)

  const { currentUser, activityId } = req.query;
  // const userToken = client.createUserToken(currentUser);

  const currentUserClient = client.feed('user', currentUser);

  // Add an activity to the feed
  await currentUserClient.addActivity(activity);
  const like = await client.reactions.add('like', activityId, {});
  // Instantiate a feed using feed group 'user' and user id '1  var user1 = client.flatFeed('user', '1');// Create an activity object

  res.status(200).json({ activity });
};
