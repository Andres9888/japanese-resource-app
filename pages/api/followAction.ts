// Instantiate a new client (server side)

const stream = require('getstream');

const secret = process.env.GETSTREAM_SECRET;
export default async (req, res) => {
  if (req.method === 'POST') {
    const client = stream.connect('ezcjh4aax2cv', secret, '1163661');

    const { isFollowed, actorID, currentUser } = req.body;

    const currentUserClient = client.feed('user', currentUser);

    await (isFollowed ? console.log(currentUserClient.unfollow('user', actorID)) : console.log(currentUserClient.follow('user', actorID)));

    res.status(200).send('Ok');
  }
};
