import { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { Button } from 'antd';
import gql from 'graphql-tag';
import Link from 'next/link';
import styled from 'styled-components';

import StripeInput from '~common/components/stripe';

const SET_COMMITMENT = gql`
  mutation setCommitment($viewerId: ID!, $isCommited: Boolean!, $timeZone: String!) {
    setCommitment(viewerId: $viewerId, isCommited: $isCommited, timeZone: $timeZone) {
      acknowledged
    }
  }
`;

const DidIStudyJapanesePage = ({ viewer }) => {
  const [setCommitment] = useMutation(SET_COMMITMENT);

  const [showStripe, setShowStripe] = useState(false);

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
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    await setCommitment({
      variables: {
        viewerId: viewer.id,
        isCommited: !viewer.isCommited,
        timeZone: userTimeZone,
      },
    });
    // setShowStripe(true)
  };

  if (viewer.isCommited) {
    return (
      <Background>
        <Container>
          <Title>You are commited to study Japanese</Title>
          <Button onClick={handleClick}>Remove Commit</Button>
        </Container>
      </Background>
    );
  }

  return (
    <Background>
      <Container>
        <Title>Do you want to commit to study Japanese everyday?</Title>

        <Button onClick={handleClick}>Yes</Button>
        <Link href="commit-info">
          <a>What does this do?</a>
        </Link>
        <StripeCardInput displayStripe={false} viewer={viewer} />
      </Container>
    </Background>
  );
};

const img =
  'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2018%2F03%2Fblossoms-JCBUPDATE0318.jpg';

const Background = styled.div`
  background-image: url(${img});

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

const StripeCardInput = styled(StripeInput)`
  display: none !important;
`;

export default DidIStudyJapanesePage;
