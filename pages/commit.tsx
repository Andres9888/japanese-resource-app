import { useState, useEffect } from 'react';

import { useMutation } from '@apollo/react-hooks';
import Link from 'next/link';
import styled from 'styled-components';

import StripeInput from '~common/components/stripe';
import { setCommitment as setCommitmentData, setCommitmentVariables } from '~graphql/mutations/__generated__/setCommitment';
import { SET_COMMITMENT } from '~graphql/mutations/mutations';
import { openNotification, displaySuccessNotification, displayErrorMessage } from '~lib/utils';
import { Viewer } from '~types/globalTypes';

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}
const Commit = ({ viewer, setViewer }: Props) => {
  const [showStripe, setShowStripe] = useState(false);
  const [wantsToCommit, setWantsToCommit] = useState(false);
  const [setCommitment] = useMutation<setCommitmentData, setCommitmentVariables>(SET_COMMITMENT, {
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
  useEffect(() => {
    const wantsToCommitParameter = new URLSearchParams(window.location.search).get('wantsToCommit');
    const handleSuccess = async () => {
      if (wantsToCommitParameter) {
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
    handleSuccess();
  }, []);
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
      setWantsToCommit(true);
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
          <StyledButton onClick={handleClick}>Remove Commit</StyledButton>
          <UpdateCardButton showStripe={showStripe} onClick={() => setShowStripe(true)}>
            Update Card
          </UpdateCardButton>
          <StripeCardInput viewer={viewer} />
        </Container>
      </Background>
    );
  }

  return (
    <Background>
      <Container showStripe={showStripe}>
        <Title>Do you want to commit to study Japanese everyday?</Title>
        <StyledButton onClick={handleClick}>⚡Yes</StyledButton>
        <Link href="/goals">
          <Content>
            <a>What does this do?</a>
          </Content>
        </Link>
        <StripeCardInput viewer={viewer} wantsToCommit={wantsToCommit} />
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

const StripeCardInput = styled(StripeInput)``;
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

const UpdateCardButton = styled.button`
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 4px;
  display: ${props => (props.showStripe ? 'none' : 'block')};
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

export default Commit;
