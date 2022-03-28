import { Button } from 'antd';
import styled from 'styled-components';

const DidIStudyJapanesePage = () => {
  return (
    <Background>
      <Container>
        <Title>Did I Study Japanese?</Title>
        <Button>Yes</Button>
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
`;

const Title = styled.h1`
  color: #fff;
`;
export default DidIStudyJapanesePage;
