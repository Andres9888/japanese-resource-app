// PaymentStatus.jsx

import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe } from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_51KhIeyBb7SW2HKTCYBSUyXDid0B9Wf9j6p6BZLzFDGR4F040zXV1ikmb7qEZ2R57Xi5MWj1juiM8psrpcexMN5VQ00STrPccDE');

const PaymentStatus = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the "setup_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get('setup_intent_client_secret');

    // Retrieve the SetupIntent
    stripe.retrieveSetupIntent(clientSecret).then(({ setupIntent }) => {
      // Inspect the SetupIntent `status` to indicate the status of the payment
      // to your customer.
      //
      // Some payment methods will [immediately succeed or fail][0] upon
      // confirmation, while others will first enter a `processing` state.
      //
      // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
      switch (setupIntent.status) {
        case 'succeeded':
          setMessage('Success! Your payment method has been saved.');
          break;

        case 'processing':
          setMessage("Processing payment details. We'll update you when processing is complete.");
          break;

        case 'requires_payment_method':
          // Redirect your user back to your payment page to attempt collecting
          // payment again
          setMessage('Failed to process payment details. Please try another payment method.');
          break;
      }
    });
  }, [stripe]);

  return message;
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

function App() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentStatus />
    </Elements>
  );
}

export default App;
