import { connectDatabase } from '~server/database';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const database = await connectDatabase();
      const users = await database.users.find({}).toArray();

      const customer = await stripe.customers.create({
        email: 'jenny.rosen@example.com',
      });
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'setup',
        customer: customer.id,
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
