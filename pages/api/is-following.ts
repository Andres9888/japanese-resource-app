// Instantiate a new client (server side)

const stream = require('getstream');

const secret = process.env.GETSTREAM_SECRET;
export default async (req, res) => {
  const client = stream.connect('ezcjh4aax2cv', secret, '1163661');
  // Instantiate a new client (client side)

  const { currentUser, actorID } = req.query;
  // const userToken = client.createUserToken(currentUser);

  const currentUserClient = client.feed('user', currentUser);

  // await currentUser.follow('user', 'global');
  const isFollowing = await currentUserClient.following({ filter: [`user:${actorID}`] });
  console.log(isFollowing);

  res.status(200).json({ isFollowing });
};
