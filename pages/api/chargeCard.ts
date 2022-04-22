import { connectDatabase } from '~server/database';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(request, response) {
  if (request.method === 'POST') {
    try {
      const users = [
        {
          _id: '112016378414675480907',
          stripeId: 'cus_LU66abTLRFOPLM',
          committedLog: [
            // {
            //   "timezone": "America/New_York",
            //   "dateCommitted": {
            //     "$date": "2022-04-17T18:18:33.374Z"
            //   }
            // },
            // {
            //   "timezone": "America/New_York",
            //   "dateCommitted": {
            //     "$date": "2022-04-17T12:00:00Z"
            //   }
            // }
          ],
        },
        {
          _id: '101519960088728259910',
          stripeId: 'cus_LVArTNmmAUkW10',
          committedLog: null,
        },
      ];

      const userToCharge = users.reduce((accumulator, current) => {
        if (current.committedLog === null || current.committedLog.length === 0) {
          accumulator.push(current.stripeId);
        }
        return accumulator;
      }, []);

      const testChargeArray = ['cus_LU66abTLRFOPLM'];

      for (const stripeId of testChargeArray) {
        const paymentMethods = await stripe.paymentMethods.list({
          customer: stripeId,
          type: 'card',
        });

        const paymentIntent = await stripe.paymentIntents.create({
          amount: 100,
          currency: 'usd',
          customer: stripeId,
          payment_method: paymentMethods.data[0].id,
          off_session: true,
          confirm: true,
        });
      }
      response.status(200).json({ message: 'success' });
    } catch (error) {
      // Error code will be authentication_required if authentication is needed
      console.log('Error code is:', error.code);
      const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(error.raw.payment_intent.id);
      console.log('PI retrieved:', paymentIntentRetrieved.id);
    }
  }
}
