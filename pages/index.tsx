import React from 'react'
import Head from 'next/head'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Nav from '~views/components/Nav'
import jpresources from 'data/jpresources.json'
import apollo from '~lib/apolloClient'
import styled from 'styled-components'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

const LISTINGS = gql`
  query getResources {
    listings {
      id
      title
      description
      image
      url
      count
    }
  }
`


const INCREMENT_COUNT = gql`
  mutation incrementCount($id: ID!) {
    increment(id: $id) {
      acknowledged
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

export default function Home(){
  const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS);
  const [
    incrementCount
  ] = useMutation(INCREMENT_COUNT);
  const handleIncrementCount = async (id: string) => {
    await incrementCount({ variables: { id } });
    refetch();
  };
  
 
  if(loading){
    return <h1>loading</h1>
  }
  if(error){
    return <h1>error</h1>
  }
   const sortedData = data.listings.sort(function (a, b) {
    return b.count - a.count
  })
  console.log(data.listings)
  console.log(sortedData)
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
            {data.listings.map((resource, index) =>
              (
              <TableRow key={resource.id}>
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
                  {/*resource.tags.map((tag, index) => (
                    <div className='control'>
                      <div className='tags has-addons'>
                        <a className='tag is-link'>{tag}</a>
                      </div>
                  </div>))*/}

                  </div>
                </TableData>
                <TableData>
                  👍 
                  <h3 onClick={() => handleIncrementCount(resource.id)}>{resource.count}</h3>
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

