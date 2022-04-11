import { useState } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import StripeInput from '~common/components/stripe';

const DidIStudyJapanesePage = ({ viewer }) => {
  const [showStripe, setShowStripe] = useState(false);

  console.log(viewer);

  if (!viewer.id) {
    return (
      <Background>
        <Container>
          <Title>You have to Login to View this page</Title>
        </Container>
      </Background>
    );
  }

  return (
    <Background>
      <Container>
        <Title>Set goal to study Japanese everyday?</Title>

        <Button onClick={() => setShowStripe(true)}>Yes</Button>
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
  margin: 0 auto;
  display: flex;
  max-width: 800px;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #fff;
  align-self: center;
  font-size: 34px;
  background: linear-gradient(rgba(0, 0, 0, 0.2));
  text-shadow: 0 2px 3px rgba(0, 0, 0, 1);
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
`;

const StripeCardInput = styled(StripeInput)`
  display: none !important;
`;

export default DidIStudyJapanesePage;
