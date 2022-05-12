// @ts-nocheck
import React, { useState, useEffect } from 'react';

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import styled from 'styled-components';

import { Viewer } from '~types/globalTypes';

interface Props {
  viewer: Viewer;
  wantsToCommit: boolean;
}
const SetupForm = ({ wantsToCommit, viewer }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [origin, setOrigin] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  const handleSubmit = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded./*  */
      return;
    }

    const { error } = await stripe.confirmSetup({
      // `Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${origin}/paymentstatus${wantsToCommit ? '?wantsToCommit=true' : ''}`,
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <StyledButton disabled={!stripe}>{viewer.hasWallet ? 'Update Card' : 'Submit'}</StyledButton>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default SetupForm;

const StyledButton = styled.button`
  background-color: #fb8987;
  border: 1px inset #fff;

  border-radius: 4px;
  font-family: 'OpenDyslexic';
  font-size: 34px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.512px;
  line-height: 1.2;
  margin-bottom: 27px;
  margin-top: 27px;
  padding: 1.5rem;
  text-align: center;
  width: 100%;
`;
