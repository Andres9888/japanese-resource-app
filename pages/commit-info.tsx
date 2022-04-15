// @ts-nocheck
import ReactPlayer from 'react-player';
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
        <Title>Fear your way into getting fluent.</Title>
        <Content>
          Studying Japanese is hard but everyone can come become fluent and achieve their goals. The most important part is that you stick to your
          goal.
        </Content>
        <Content>
          The next question you might ask is how will I stick to my goal? To answer that you will have to understand what is the best way to get
          yourself to stay with your goal.
        </Content>
        <Content>When I watched this YouTube Video by Andrew Huberman I was able to get a better answer to that question.</Content>
        <Content>
          <ReactPlayer controls url="https://www.youtube.com/watch?v=t1F7EEGPQwo&t=11s" />
        </Content>
        <Content>To Summarize what he says much of goal directed behavior is to avoid things which cause fear.</Content>
        <Content>Visualization of the end goal is effective in getting the goal process started, however not good for maintaining the goal. </Content>
        <Content>Over time the visual of the end goal becomes a poor thing to rely on in maintaining the goal. </Content>
        <Content>
          Visualizing failure is the optimal way towards accomplishing the goal. Thinking about all the ways one could fail on route to said goal.{' '}
        </Content>
        <Content>
          There is a Near doubling in probability of reaching a goal if focusing routinely on foreshadowing failure - - thinking about the way things
          could fail if you did this or that or didn't take this action
        </Content>
        <Content>
          So you have two options
          <br />
          <ul>
            <li>option a : think about how great you will feel at end point (good at start) - -</li>
            <li>option b : think about what'sgonna happen if you don't do this? (good for maintaining progress)</li>{' '}
          </ul>
        </Content>
        <Content>
          Foreshadowing failure is best way to reach goals. Think about how bad its going to be if you fail. how disappointing in yourself you will
          feel if you don't do it, how negatively it will impact you, how much you will regret not doing it, etc. - - the more specific you can get in
          writing and visualizing how bad its going to be if you don't do it, the greater chance you will attain your goal - - the brain is much
          better at moving away from fearful things than towards things we want - visualize in a positive away at beginning of goal, then focus on
          avoiding failure, and be very clear on what those failures would look like and feel like
        </Content>
        <Content>What I am trying to do is give you negative consequences for not studying Japanese .</Content>
        <Content>
          The way it works is when you commit to studying Japanese and enter your card information you will charged a one dollar ($1.00) everyday you
          do not log that you studied Japanese.
        </Content>
        <Content>You can change your commitment anytime and will not be charged.</Content>
        <Content>The money will go to me and helps me improve this site.</Content>
        <Content>Thanks for reading all feedback is appreciated.</Content>
      </Container>
    </Background>
  );
};

const Background = styled.div`
  background-color: white;
  height: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
  width: 100%;
`;

const Container = styled.div`
  color: #555555;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 720px;
`;

const Title = styled.h1`
  align-self: center;
  font-family: 'OpenDyslexic';
  font-size: 34px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.512px;
  line-height: 1.2;
  margin-bottom: 27px;
  margin-top: 27px;
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
