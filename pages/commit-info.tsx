import styled from 'styled-components';

const DidIStudyJapanesePage = ({ viewer }) => {
  if (!viewer) {
    <Background>
      <Container>
        <Title>You have to Login to View this page</Title>
      </Container>
    </Background>;
  }

  return (
    <Background>
      <Container>
        <Title>Will you study Japanese everyday?</Title>
        <Content>
          Studying Japanese is hard but everyone can come become fluent and achieve their goals. The most important part is that you stick to your
          goal. A lot of the information is base on this youtube Video by Andrew Huberman # The Science of Setting & Achieving Goals | Huberman Lab
          Podcast #55https://www.youtube.com/watch?v=t1F7EEGPQwo&t=11s Much of goal directed behavior is to avoid things which cause fear
          visualization - is it effective? visualization of the end goal is effective in getting the goal process started, however not good for
          maintaining the goal - over time the visual of the end goal becomes a poor thing to rely on in maintaining the goal - visualizing failure is
          the optimal way towards accomplishing the goal. thinking about all the ways one could fail en route to said goal - - near doubling in
          probability of reaching a goal if focusing routinely on foreshadowing failure - - thinking about the way things could fail if you did this
          or that or didn't take this action - - option a : think about how great you will feel at end point (good at start) - - option b : think
          about what's gonna happen if you don't do this? (good for maintaining progress) - - foreshadowing failure is best way to reach goals. think
          about how bad its going to be if you fail. how disappointing in yourself you will feel if you don't do it, how negatively it will impact
          you, how much you will regret not doing it, etc. - - the more specific you can get in writing and visualizing how bad its going to be if you
          don't do it, the greater chance you will attain your goal (note: this made me laugh) - the brain is much better at moving away from fearful
          things than towards things we want - visualize in a positive away at beginning of goal, then focus on avoiding failure, and be very clear on
          what those failures would look like and feel like - - what kind of goal does it need to be? inspirational and exciting. when people set
          goals, if goal is too easy it doesn't recruit enough of nervous system to make pursuit of said goal likely. if a goal is too far away/hard,
          it produces a similar outcome. - - when goals are moderate/moderately hard, just out of immediate abilities, or one felt that would take a
          lot of effort but is in range, then there was near doubling in likelihood of engaging in pursuit of said goal. - - there needs to be a
          concrete plan. a specific set of action steps that get right down to what success would look like. - - goals need to have extremely specific
          and detailed information about action steps in pursuit of goal, and we need to constantly be updating those action steps so that have a
          higher probability of meeting those action steps - - how often should one assess progress? weekly is a good starting place for addressing
          performance. based on performance, update action steps for upcoming week
        </Content>
      </Container>
    </Background>
  );
};

const img =
  'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2018%2F03%2Fblossoms-JCBUPDATE0318.jpg';

const Background = styled.div`
  height: 100vh;
  margin: 0;
  padding: 0;
  text-align: center;
  width: 100%;
`;

const Container = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  letter-spacing: -0.333px;
  line-height: 1.65;
  margin: 0 auto;
  max-width: 720px;
`;

const Title = styled.h1`
  align-self: center;
  font-family: 'OpenDyslexic';
  font-style: normal;

  font-size: 34px;
  font-weight: 500;

  margin-bottom: 20px;
  margin-top: 20px;
`;
const Content = styled.p`
  font-family: 'OpenDyslexic';
  font-size: 21px;
  font-weight: 400;

  @media (max-width: 800px) {
    font-size: 16px;
  }
  @media (max-width: 600px) {
    font-size: 12px;
  }
  @media (max-width: 400px) {
    font-size: 10px;
  }

  text-align: left;
`;
export default DidIStudyJapanesePage;
