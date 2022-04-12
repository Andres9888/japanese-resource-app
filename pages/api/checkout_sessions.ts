import { connectDatabase } from '~server/database';
import { assert, string } from 'superstruct';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const viewerIdSchema = string();

export default async function handler(request, response) {
  if (request.method === 'POST') {
    try {
      const { viewerId } = request.body;

      assert(viewerId, viewerIdSchema);
      const database = await connectDatabase();

      const {
        contact: userEmail,
        stripeId: userStripeId,
        name: userName,
      } = await database.users.findOne({
        _id: viewerId,
      });

      if (!userStripeId) {
        const customer = await stripe.customers.create({ name: userName, email: userEmail });
        database.users.updateOne({ _id: viewerId }, { $set: { stripeId: customer.id } }, { upsert: true });
      }

      response.send(
        await stripe.setupIntents.create({
          customer: userStripeId,
          payment_method_types: ['card'],
        })
      );
    } catch (error) {
      // Error code will be authentication_required if authentication is needed
      console.log('Error code is:', error);
      // const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(error.raw.payment_intent.id);
      // console.log('PI retrieved:', paymentIntentRetrieved.id);
    }
  }
}
