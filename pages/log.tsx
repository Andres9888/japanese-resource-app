import { useMutation } from '@apollo/react-hooks';
import { Button } from 'antd';
import gql from 'graphql-tag';
import Link from 'next/link';
import styled from 'styled-components';

import { displaySuccessNotification, displayErrorMessage } from '~lib/utils';

const SET_COMMITMENT_LOG = gql`
  mutation setCommitmentLog($viewerId: ID!, $timeZone: String!) {
    setCommitmentLog(viewerId: $viewerId, timeZone: $timeZone) {
      matchedCount
      modifiedCount
    }
  }
`;

const DidIStudyJapanesePage = ({ viewer }) => {
  const [setCommitmentLog] = useMutation(SET_COMMITMENT_LOG, {
    onCompleted: data => {
      if (data && data.setCommitmentLog.matchedCount && data.setCommitmentLog.modifiedCount) {
        displaySuccessNotification("You've successfully");
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
  if (!viewer.isCommited) {
    return (
      <Background>
        <Container>
          <Title>You have to be Commited to Log</Title>
          <Link href="/commit">
            <a>Go to Commit Page</a>
          </Link>
        </Container>
      </Background>
    );
  }

  const handleClick = async () => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    await setCommitmentLog({
      variables: {
        viewerId: viewer.id,
        timeZone: userTimeZone,
      },
    });
  };

  return (
    <Background>
      <Container>
        <Title>Did you study Japanese Today?</Title>

        <StyledButton onClick={handleClick}>Yes</StyledButton>
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
  align-self: center;

  color: #fff;
  font-family: 'OpenDyslexic';
  font-size: 34px;

  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.512px;
  line-height: 1.2;
  margin-bottom: 27px;
  margin-top: 27px;
  text-align: center;
`;

const StyledButton = styled.button`
  background-color: #fff;
  border: 1px solid #fff;

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

const Content = styled.p`
  font-family: 'OpenDyslexic';
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -0.06px;
  line-height: 1.6;
  margin-bottom: 27px;
  text-align: left;
`;

export default DidIStudyJapanesePage;
