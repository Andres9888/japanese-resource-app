import { connectDatabase } from '~server/database';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(request, response) {
  if (request.method === 'POST') {
    try {
      const paymentMethods = await stripe.paymentMethods.list({
        customer: 'cus_LU66abTLRFOPLM',
        type: 'card',
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: 100,
        currency: 'usd',
        customer: 'cus_LU66abTLRFOPLM',
        payment_method: paymentMethods.data[0].id,
        off_session: true,
        confirm: true,
      });
      response.status(200).json({ status: paymentIntent.status });
    } catch (err) {
      // Error code will be authentication_required if authentication is needed
      console.log('Error code is: ', err.code);
      const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
      console.log('PI retrieved: ', paymentIntentRetrieved.id);
    }
  }
}
