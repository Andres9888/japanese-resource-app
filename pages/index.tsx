import React from 'react'
import Head from 'next/head'
import Nav from '~views/components/Nav'
import jpresources from 'data/jpresources.json'
import styled from 'styled-components'

const TableRow = styled.tr`
  display:flex;
`;

const TableData = styled.td`
  display:flex;
  font-size:48px;
  font-weight:700;
  align-self:center;
  font-family: 'Montserrat', sans-serif;
  img{
    max-width: 233px;
  }
`;
const TableDataDescription = styled.td`
  font-family: 'Source Sans Pro', sans-serif;
  display:flex;
  font-size:21px;
  font-weight:400;
  align-self:center;
  
`;



const Home = ({ props }) => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css'
        />
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap" rel="stylesheet"/> 
<link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet"/> 
      </Head>


      <Nav />
      <div className='container'>
        <h1>Resources for Studying Japanese</h1>
        <table className='table is-fullwidth is-hoverable'>
          <tbody>
            {props.content.map((resource, index) => (
              <TableRow>
              <TableData><img src={resource.image} alt=""/></TableData>
              <TableData><a href={resource.url}>{resource.title}</a></TableData>
              <TableDataDescription>{resource.description}</TableDataDescription>
              <TableData><div class="field is-grouped is-grouped-multiline">
  <div class="control">
    <div class="tags has-addons">
      <a class="tag is-link">Technology</a>
      <a class="tag is-delete"></a>
    </div>
  </div>

  <div class="control">
    <div class="tags has-addons">
      <a class="tag is-link">CSS</a>
      <a class="tag is-delete"></a>
    </div>
  </div>

  <div class="control">
    <div class="tags has-addons">
      <a class="tag is-link">Flexbox</a>
      <a class="tag is-delete"></a>
    </div>
  </div>

  <div class="control">
    <div class="tags has-addons">
      <a class="tag is-link">Web Design</a>
      <a class="tag is-delete"></a>
    </div>
  </div>

  <div class="control">
    <div class="tags has-addons">
      <a class="tag is-link">Open Source</a>
      <a class="tag is-delete"></a>
    </div>
  </div>

  <div class="control">
    <div class="tags has-addons">
      <a class="tag is-link">Community</a>
      <a class="tag is-delete"></a>
    </div>
  </div>

  <div class="control">
    <div class="tags has-addons">
      <a class="tag is-link">Documentation</a>
      <a class="tag is-delete"></a>
    </div>
  </div>
</div></TableData>
              <TableData>👍</TableData>
            </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

Home.getInitialProps = async ctx => {
  return { props: jpresources }
}
export default Home
