// @ts-nocheck
/* eslint-disable */
// Instantiate a new client (server side)

const stream = require('getstream');

const secret = process.env.GETSTREAM_SECRET;
export default async (req, res) => {
  const client = stream.connect('ezcjh4aax2cv', secret);
  // Instantiate a new client (client side)

  const { currentUser, activityId } = req.query;
  // const userToken = client.createUserToken(currentUser);

  const currentUserClient = client.feed('user', '12016378414675480907');

  const activity = {
    actor: 'SU:112016378414675480907',
    object: 'test',
    text: 'test',
    verb: 'post',
    to: ['user:kimetsu-no-yaiba-yuukaku-hen'],
  };
  await currentUserClient.addActivity(activity);

  res.status(200).json({ activity });
};
