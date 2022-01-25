// Instantiate a new client (server side)
import cookie from 'cookie';

const stream = require('getstream');

const secret = process.env.GETSTREAM_SECRET;
export default async (req, res) => {
  const client = stream.connect('ezcjh4aax2cv', secret, '1163661');
  // Instantiate a new client (client side)

  const currentUser = req.query.id;
  const userToken = client.createUserToken(currentUser);

  const feed = await client.feed('user', currentUser, userToken);
  client.user(currentUser).update({
    name: req.query.name,
  });

  feed.follow('user', 'global');
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
};
