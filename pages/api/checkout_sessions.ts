import { connectDatabase } from '~server/database';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { id: viewerId, name: viewerName } = req.body;

      const customer = await stripe.customers.create();
      const database = await connectDatabase();

      database.users.updateOne({ _id: viewerId }, { $set: { stripeId: customer.id } }, { upsert: true });

      res.send(
        await stripe.setupIntents.create({
          customer: customer.id,
          name: viewerName,
          payment_method_types: ['card'],
        })
      );
    } catch (error) {
      // Error code will be authentication_required if authentication is needed
      console.log('Error code is:', error.code);
      const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(error.raw.payment_intent.id);
      console.log('PI retrieved:', paymentIntentRetrieved.id);
    }
  }
}
