import React from 'react'
import Head from 'next/head'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Nav from '~views/components/Nav'
import jpresources from 'data/jpresources.json'
import apollo from '~lib/apolloClient'
import styled from 'styled-components'

const GET_RESOURCES = gql`
  query getResources {
    listings {
      title
      description
      url
      image
      count
    }
  }
`




const TableRow = styled.tr`
  display: flex;
  box-shadow: 1px 2px 4px rgb(0 0 0 / 3%);
  border-radius: 6px;
`

const TableData = styled.td`
  display: flex;
  border: none !important;
  font-size: 48px;
  font-weight: 700;
  align-self: center;
  font-family: 'Montserrat', sans-serif;
  img {
    max-width: 233px;
    border-radius: 6px;
  }
`
const TableDataDescription = styled.td`
  border: none !important;
  font-family: 'Source Sans Pro', sans-serif;
  display: flex;
  font-size: 21px;
  font-weight: 400;
  align-self: center;
`

const Home = ( ) => {
  const { loading, error, data } = useQuery(GET_RESOURCES)
  console.log(data)
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css'
        />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap'
          rel='stylesheet'
        />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap'
          rel='stylesheet'
        />
      </Head>

      <Nav />
      <div className='container'>
        <h1>Resources for Studying Japanese</h1>
        <table className='table is-fullwidth is-hoverable'>
          <tbody>
            {data.listings.map((resource, index) => (
              <TableRow>
                <TableData>
                  <img src={resource.image} alt='' />
                </TableData>
                <TableData>
                  <a href={resource.url}>{resource.title}</a>
                </TableData>
                <TableDataDescription>
                  {resource.description}
                </TableDataDescription>
                <TableData>
                  <div className='field is-grouped is-grouped-multiline'>
                    <div className='control'>
                      <div className='tags has-addons'>
                        <a className='tag is-link'>Technology</a>
                        <a className='tag is-delete'></a>
                      </div>
                    </div>

                    <div className='control'>
                      <div className='tags has-addons'>
                        <a className='tag is-link'>CSS</a>
                        <a className='tag is-delete'></a>
                      </div>
                    </div>

                    <div className='control'>
                      <div className='tags has-addons'>
                        <a className='tag is-link'>Flexbox</a>
                        <a className='tag is-delete'></a>
                      </div>
                    </div>

                    <div className='control'>
                      <div className='tags has-addons'>
                        <a className='tag is-link'>Web Design</a>
                        <a className='tag is-delete'></a>
                      </div>
                    </div>

                    <div className='control'>
                      <div className='tags has-addons'>
                        <a className='tag is-link'>Open Source</a>
                        <a className='tag is-delete'></a>
                      </div>
                    </div>

                    <div className='control'>
                      <div className='tags has-addons'>
                        <a className='tag is-link'>Community</a>
                        <a className='tag is-delete'></a>
                      </div>
                    </div>

                    <div className='control'>
                      <div className='tags has-addons'>
                        <a className='tag is-link'>Documentation</a>
                        <a className='tag is-delete'></a>
                      </div>
                    </div>
                  </div>
                </TableData>
                <TableData>👍</TableData>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}




export default Home
