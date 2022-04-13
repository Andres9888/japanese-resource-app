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
const Content = styled.p`
  color: #fff;
  align-self: center;
  font-size: 21px;
  background: linear-gradient(rgba(0, 0, 0, 0.2));
  text-shadow: 0 2px 3px rgba(0, 0, 0, 1);
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
`;
export default DidIStudyJapanesePage;
