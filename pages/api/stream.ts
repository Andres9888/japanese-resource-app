const stream = require('getstream');
// Instantiate a new client (server side)
import cookie from 'cookie';
const secret = process.env.GETSTREAM_SECRET;
export default async (req, res) => {
  const client = stream.connect('ezcjh4aax2cv', secret, '1163661');
  // Instantiate a new client (client side)
  const currentUser = req.query.user;
  const userToken = client.createUserToken(currentUser);

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

  res.statusCode = 200;
  res.json({ userToken });
};
