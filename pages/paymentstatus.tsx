// @ts-nocheck
/* eslint-disable */
import { useState, useEffect } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { useRouter } from 'next/router';
import { SET_STRIPE_CARD_STATUS } from '~graphql/mutations';
import { displaySuccessNotification, displayErrorMessage, openNotification } from '~lib/utils';

const stripePromise = loadStripe('pk_test_51KhIeyBb7SW2HKTCYBSUyXDid0B9Wf9j6p6BZLzFDGR4F040zXV1ikmb7qEZ2R57Xi5MWj1juiM8psrpcexMN5VQ00STrPccDE');

const PaymentStatus = ({ viewer, setViewer }) => {
  const router = useRouter();

  const [setStripeCardStatus] = useMutation(SET_STRIPE_CARD_STATUS, {
    onCompleted: data => {
      if (data && data.setStripeCardStatus.hasWallet !== undefined) {
        setViewer({ ...viewer, hasWallet: data.setStripeCardStatus.hasWallet });
        displaySuccessNotification('Success! Your payment method has been saved.');
        const wantsToCommit = new URL(window.location.href).searchParams.get('wantsToCommit');
        router.push(`/commit${wantsToCommit ? '?wantsToCommit=true' : ''}`);
      }
    },
    onError: () => {
      displayErrorMessage(
        "Sorry! We weren't able to Commit. Please try again later! If it still doesn't work, just message me and sorry about that."
      );
    },
  });

  const stripe = useStripe();
  const [message] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const handleSuccess = async () => {
      await setStripeCardStatus({
        variables: {
          viewerId: viewer.id,
        },
      });
    };
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
          handleSuccess();
          break;

        case 'processing':
          openNotification("Processing payment details. We'll update you when processing is complete.");
          router.push('/commit');
          break;

        case 'requires_payment_method':
          // Redirect your user back to your payment page to attempt collecting
          // payment again
          displayErrorMessage('Failed to process payment details. Please try another payment method.');
          router.push('/commit');
          break;
      }
    });
  }, [stripe]);

  return message;
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

function App({ viewer, setViewer }) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentStatus setViewer={setViewer} viewer={viewer} />
    </Elements>
  );
}

export default App;
