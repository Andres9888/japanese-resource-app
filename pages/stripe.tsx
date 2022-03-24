import React, { useEffect, useRef } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { Layout, Spin } from 'antd';
// import { CONNECT_STRIPE } from '../../lib/graphql/mutations';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
// import { useScrollToTop } from "../../lib/hooks";
// import { displaySuccessNotification } from '../../lib/utils';
// import { Viewer } from '../../lib/types';

const CONNECT_STRIPE = gql`
  mutation ConnectStripe($input: ConnectStripeInput!) {
    connectStripe(input: $input) {
      hasWallet
    }
  }
`;

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

const { Content } = Layout;

const Stripe = ({ viewer, setViewer }: Props) => {
  const router = useRouter();
  const [connectStripe, { data, loading, error }] = useMutation<ConnectStripeData, ConnectStripeVariables>(CONNECT_STRIPE, {
    onCompleted: data => {
      if (data && data.connectStripe) {
        setViewer({ ...viewer, hasWallet: data.connectStripe.hasWallet });
        // displaySuccessNotification("You've successfully connected your Stripe Account!", 'You can now begin to create listings in the Host page.');
      }
    },
  });
  const connectStripeReference = useRef(connectStripe);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      connectStripeReference.current({
        variables: {
          input: { code },
        },
      });
    } else {
      router.replace('/login');
    }
  }, [router]);

  if (data && data.connectStripe) {
    router.push(`/user/${viewer.id}`);
  }

  if (loading) {
    return (
      <Content className="stripe">
        <Spin size="large" tip="Connecting your Stripe account..." />
      </Content>
    );
  }

  if (error) {
    router.push(`/user/${viewer.id}?stripe_error=true`);
  }

  return null;
};

export default Stripe;
