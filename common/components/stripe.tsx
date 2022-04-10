import { useEffect, useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

import SetupForm from '~common/components/SetupForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51KhIeyBb7SW2HKTCYBSUyXDid0B9Wf9j6p6BZLzFDGR4F040zXV1ikmb7qEZ2R57Xi5MWj1juiM8psrpcexMN5VQ00STrPccDE');

function StripeInput({ viewer }) {
  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        console.log(viewer);
        const { data: responseData } = await axios.post(`/api/checkout_sessions`, viewer);
        const { client_secret: clientSecret } = responseData;

        setClientSecret(clientSecret);
      } catch (error) {
        console.log(error);
      }
    };

    getClientSecret();
  }, []);

  const options = {
    clientSecret: clientSecret,
  };
  if (!clientSecret && !options.clientSecret) return null;
  return (
    <Elements stripe={stripePromise} options={options}>
      <SetupForm />
    </Elements>
  );
}
export default StripeInput;
