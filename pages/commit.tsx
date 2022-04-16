import { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { Button } from 'antd';
import gql from 'graphql-tag';
import Link from 'next/link';
import styled from 'styled-components';

import StripeInput from '~common/components/stripe';
import { openNotification, displaySuccessNotification, displayErrorMessage } from '~lib/utils';

const SET_COMMITMENT = gql`
  mutation setCommitment($viewerId: ID!, $isCommited: Boolean!, $timeZone: String!) {
    setCommitment(viewerId: $viewerId, isCommited: $isCommited, timeZone: $timeZone) {
      id
      token
      avatar
      hasWallet
      didRequest
      name
      isCommited
    }
  }
`;

const DidIStudyJapanesePage = ({ viewer, setViewer }) => {
  const [showStripe, setShowStripe] = useState(false);
  const [setCommitment] = useMutation(SET_COMMITMENT, {
    onCompleted: data => {
      if (data && data.setCommitment.isCommited !== undefined) {
        setViewer({ ...viewer, isCommited: data.setCommitment.isCommited });
        setShowStripe(!showStripe);
        displaySuccessNotification(
          `You've successfully, ${
            data.setCommitment.isCommited
              ? 'commited you will be charged a dollar a day that you do not log that you studied Japanese.'
              : 'removed your commitment you will not be charged anymore.'
          }You can change your commitment at any time.`
        );
      }
    },
    onError: () => {
      displayErrorMessage(
        "Sorry! We weren't able to Commit. Please try again later! If it still doesn't work, just message me and sorry about that."
      );
    },
  });

  if (!viewer.id) {
    return (
      <Background>
        <Container>
          <Title>You have to Login to View this page</Title>
        </Container>
      </Background>
    );
  }

  const handleClick = async () => {
    if (!viewer.hasWallet) {
      setShowStripe(true);
      openNotification('Nice!', 'You have to submit payment card details to finish setting commitment.');
    } else {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      await setCommitment({
        variables: {
          viewerId: viewer.id,
          isCommited: !viewer.isCommited,
          timeZone: !viewer.isCommited ? userTimeZone : '',
        },
      });
    }
  };

  if (viewer.isCommited) {
    return (
      <Background>
        <Container showStripe={showStripe}>
          <Title>You are commited to study Japanese</Title>
          <Button onClick={handleClick}>Remove Commit</Button>
          <Button onClick={() => setShowStripe(true)}>{viewer.hasWallet ? 'Update Card' : 'Add Card'}</Button>
          <StripeCardInput viewer={viewer} />
        </Container>
      </Background>
    );
  }

  return (
    <Background>
      <Container showStripe={showStripe}>
        <Title>Do you want to commit to study Japanese everyday?</Title>
        <Button onClick={handleClick}>Yes</Button>
        <Link href="commit-info">
          <a>What does this do?</a>
        </Link>
        <StripeCardInput viewer={viewer} />
      </Container>
    </Background>
  );
};

const backgroundImg =
  'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2018%2F03%2Fblossoms-JCBUPDATE0318.jpg';

const Background = styled.div`
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  border: 1px solid #000;
  height: 100vh;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 800px;
  form {
    display: ${props => (props.showStripe ? 'block' : 'none')};
  }
`;

const Title = styled.h1`
  -webkit-box-decoration-break: clone;
  align-self: center;
  background: linear-gradient(rgba(0, 0, 0, 0.2));
  box-decoration-break: clone;
  color: #fff;
  font-size: 34px;
  text-shadow: 0 2px 3px rgba(0, 0, 0, 1);
`;

const StripeCardInput = styled(StripeInput)``;

export default DidIStudyJapanesePage;
