import React from 'react'
import Head from 'next/head'
import Nav from '~views/components/Nav'
import jpresources from 'data/jpresources.json'

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
        <table className='table'>
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
            {props.content.map((item, index) => (
              <tr>
              <th>Image</th>
              <th>{item.title}</th>
              <th>{item.description}</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
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
