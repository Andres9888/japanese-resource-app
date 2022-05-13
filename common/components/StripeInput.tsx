// @ts-nocheck
import { useEffect, useState } from 'react';

import * as Sentry from '@sentry/nextjs';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

import SetupForm from '~common/components/SetupForm';
import { Viewer } from '~types/globalTypes';

const stripePromise = loadStripe('pk_test_51KhIeyBb7SW2HKTCYBSUyXDid0B9Wf9j6p6BZLzFDGR4F040zXV1ikmb7qEZ2R57Xi5MWj1juiM8psrpcexMN5VQ00STrPccDE');

interface Props {
  viewer: Viewer;
  wantsToCommit: boolean;
}

export const StripeInput = ({ viewer, wantsToCommit }: Props) => {
  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const { data: responseData } = await axios.post(`/api/checkoutSessions`, { viewerId: viewer.id });
        const { client_secret: clientSecretResponse } = responseData;

        setClientSecret(clientSecretResponse);
      } catch (error) {
        Sentry.captureException(error);
      }
    };

    getClientSecret();
  }, []);
  const appearance = {
    theme: 'none',
    variables: {
      fontFamily: 'Verdana',
      fontSize: '18',
      fontLineHeight: '1.5',
      borderRadius: '4',
      colorBackground: '#dfdfdf',
    },
    rules: {
      '.Input': {
        backgroundColor: '#ffffff',
        boxShadow: 'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080',
      },
      '.Input--invalid': {
        color: '#DF1B41',
      },
      '.Tab, .Block': {
        boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf',
      },
      '.Tab:hover': {
        backgroundColor: '#eee',
      },
      '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
        backgroundColor: '#ccc',
      },
    },
  };

  const options = {
    clientSecret,
    appearance,
  };
  if (!clientSecret && !options.clientSecret) return null;
  return (
    <Elements options={options} stripe={stripePromise}>
      <SetupForm viewer={viewer} wantsToCommit={wantsToCommit} />
    </Elements>
  );
};
