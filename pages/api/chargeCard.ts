import { connectDatabase } from '~server/database';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const paymentMethods = await stripe.paymentMethods.list({
        customer: 'cus_LU66abTLRFOPLM',
        type: 'card',
      });
      console.log(paymentMethods.data[0]);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 100,
        currency: 'usd',
        customer: 'cus_LU66abTLRFOPLM',
        payment_method: 'pm_1Kn7ybBb7SW2HKTCeprPYUvi',
        off_session: true,
        confirm: true,
      });
    } catch (err) {
      // Error code will be authentication_required if authentication is needed
      console.log('Error code is: ', err.code);
      const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
      console.log('PI retrieved: ', paymentIntentRetrieved.id);
    }
  }
}
