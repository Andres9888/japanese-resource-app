import React from 'react'
import Head from 'next/head'
import Nav from '~views/components/Nav'
import jpresources from 'data/jpresources.json'
import styled from 'styled-components'

const TableRow = styled.tr`
  
`;

const TableData = styled.td`
  img{
    width: 300px;
  }
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
      </Head>

      <Nav />
      <div className='container'>
        <h1>Resources for Studying Japanese</h1>
        <table className='table is-fullwidth is-hoverable'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.content.map((resource, index) => (
              <TableRow>
              <TableData><img src={resource.image} alt=""/></TableData>
              <TableData><a href={resource.url}>{resource.title}</a></TableData>
              <TableData>{resource.description}</TableData>
              <TableData>Tags</TableData>
              <TableData>Actions</TableData>
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
