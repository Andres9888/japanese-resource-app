// @ts-nocheck
/* eslint-disable */
// Instantiate a new client (server side)

const stream = require('getstream');

const secret = process.env.GETSTREAM_SECRET;
export default async (req, res) => {
  if (req.method === 'GET') {
    const client = stream.connect('ezcjh4aax2cv', secret, '1163661');

    const { id } = req.query;
    const userToken = client.createUserToken(id);

    const globalUser = await client.feed('user', 'global');

    globalUser.follow('user', id);

    res.status(200).json({ userToken });
  }
};
