import { connectDatabase } from '~server/database';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { id, name } = req.body;
      const database = await connectDatabase();

      let { contact, stripeId } = await database.users.findOne({
        _id: id,
      });

      if (!stripeId) {
        const customer = await stripe.customers.create({ name: name, email: contact });
        database.users.updateOne({ _id: id }, { $set: { stripeId: customer.id } }, { upsert: true });
      }

      res.send(
        await stripe.setupIntents.create({
          customer: stripeId,
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
