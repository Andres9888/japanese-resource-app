import { connectDatabase } from '~server/database';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let paymentIntent;
    let customer;
    try {
      // You need to attach the PaymentMethod to a Customer in order to reuse
      // Since we are using test cards, create a new Customer here
      // You would do this in your payment flow that saves cards
      customer = await stripe.customers.create({
        payment_method_types: ['bancontact', 'card', 'ideal'],
      });

      // List the customer's payment methods to find one to charge
      const paymentMethods = await stripe.paymentMethods.list({
        customer: customer.id,
        type: 'card',
      });

      // Create and confirm a PaymentIntent with the order amount, currency,
      // Customer and PaymentMethod ID
      paymentIntent = await stripe.paymentIntents.create({
        amount: 100,
        currency: 'usd',
        payment_method: paymentMethods.data[0].id,
        customer: customer.id,
        off_session: true,
        confirm: true,
      });

      res.status(200).json({
        succeeded: true,
        clientSecret: paymentIntent.client_secret,
        publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
      });
    } catch (error) {
      if (error.code === 'authentication_required') {
        // Bring the customer back on-session to authenticate the purchase
        // You can do this by sending an email or app notification to let them know
        // the off-session purchase failed
        // Use the PM ID and client_secret to authenticate the purchase
        // without asking your customers to re-enter their details
        res.status(400).json({
          error: 'authentication_required',
          paymentMethod: error.raw.payment_method.id,
          clientSecret: error.raw.payment_intent.client_secret,
          publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
          amount: 100,
          card: {
            brand: error.raw.payment_method.card.brand,
            last4: error.raw.payment_method.card.last4,
          },
        });
      } else if (error.code) {
        // The card was declined for other reasons (e.g. insufficient funds)
        // Bring the customer back on-session to ask them for a new payment method
        res.status(400).send({
          error: error.code,
          clientSecret: error.raw.payment_intent.client_secret,
          publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
        });
      } else {
        console.log('Unknown error occurred', error);
      }
    }
  }
}
