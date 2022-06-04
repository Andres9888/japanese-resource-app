// @ts-nocheck

import { Footer as MFooter, Center } from '@mantine/core';
import styled from 'styled-components';

export default function Footer() {
  return (
    <MFooter height={120} p="md">
      <Center>
        <Title>👋 Create by Andres Gutierrez </Title>
      </Center>
      <Center>
        <Content>
          <Center>💬 I would like to hear from you.</Center>
          Message me on{' '}
          <a href="https://discord.gg/w2gvPtCRXY" rel="noreferrer" target="_blank">
            Discord
          </a>{' '}
          if you have any feedback.
        </Content>
      </Center>
      <Center />
    </MFooter>
  );
}
const Title = styled.h1`
  align-self: center;
  font-family: 'OpenDyslexic';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
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
  a:link {
    /* unvisited link */
    color: #f47c7c;
    text-decoration: none;
    border-bottom: 1px solid;
  }
  a:visited {
    /* visited link */
    color: #ef9f9f;
  }
  a:hover {
    /* mouse over link */
    color: #fad4d4;
    border-bottom: none;
  }
  a:active {
    /* active link */
    color: #fff2f2;
  }
`;
