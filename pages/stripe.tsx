import { useEffect, useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

import SetupForm from '~common/components/SetupForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51KhIeyBb7SW2HKTCYBSUyXDid0B9Wf9j6p6BZLzFDGR4F040zXV1ikmb7qEZ2R57Xi5MWj1juiM8psrpcexMN5VQ00STrPccDE');

function App() {
  const [cs, setCs] = useState();

  useEffect(() => {
    const getCs = async () => {
      try {
        const { data: responseData } = await axios.post(`/api/checkout_sessions`);

        const { client_secret: clientSecret } = responseData;
        setCs(clientSecret);
      } catch (error_) {
        console.log(error_);
      }
    };

    getCs();
  }, []);

  const options = {
    // passing the client secret obtained in step 2
    client_secret: cs,
    // Fully customizable with appearance API.
    appearance: {
      /* ... */
    },
  };

  return (
    <Elements options={options} stripe={stripePromise}>
      <SetupForm />
    </Elements>
  );
}
export default App;
