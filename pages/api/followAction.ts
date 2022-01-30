// Instantiate a new client (server side)

const stream = require('getstream');

const secret = process.env.GETSTREAM_SECRET;
export default async (req, res) => {
  if (req.method === 'PATCH') {
    const client = stream.connect('ezcjh4aax2cv', secret, '1163661');
    // Instantiate a new client (client side)

    const { isFollowed, actorID, currentUser } = req.body;
    // const userToken = client.createUserToken(currentUser);
    console.log(isFollowed, actorID, currentUser);
    const currentUserClient = client.feed('user', currentUser);

    isFollowed ? await currentUserClient.unfollow('user', actorID) : await currentUserClient.follow('user', actorID);

    res.status(200);
  }
};
