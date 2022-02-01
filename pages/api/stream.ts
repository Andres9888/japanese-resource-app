// Instantiate a new client (server side)
import cookie from 'cookie';

const stream = require('getstream');

const secret = process.env.GETSTREAM_SECRET;
export default async (req, res) => {
  if (req.method === 'POST') {
    const client = stream.connect('ezcjh4aax2cv', secret, '1163661');

    const { name, avatar, id } = req.body;
    const userToken = client.createUserToken(id);

    const globalUser = await client.feed('user', 'global');
    client.user(id).update({
      name,
      profileImage: avatar,
    });

    globalUser.follow('user', id);
    // Store it on session object
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', userToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60,
        sameSite: 'strict',
        path: '/',
      })
    );

    res.status(200).json({ userToken });
  }
};
