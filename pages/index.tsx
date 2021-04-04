import React from 'react'
import Head from 'next/head'
import gql from 'graphql-tag'
import { useQuery, useMutation, useLazyQuery  } from '@apollo/react-hooks'
import { initializeApollo } from '~lib/apolloClient'
import styled from 'styled-components'
//import Image from 'next/image'

const LISTINGS = gql`
  query getResources {
    listings {
      id
      title
      description
      image
      url
      tags
      count
    }
  }
`

const CHECK_USER_VOTE = gql`
  query checkUserVoteID($id: ID!, $resource: String!) {
    checkUserVote(id: $id, resource: $resource) {
      resources
    }
  }
`

const INCREMENT_COUNT = gql`
  mutation incrementCount($id: ID!, $viewer: ID!, $resource: String!) {
    increment(id: $id, viewer: $viewer, resource: $resource) {
      acknowledged
    }
  }
`
// const SET_USER_VOTE = gql`
//   mutation setUserVote($viewer: ID! ,$resource: resourceInput) {
//     setUserVote(viewer: $viewer , resource: $resource) {
//       acknowledged
//     }
//   }
// `

const TableRow = styled.tr`
  display: flex;
  box-shadow: 1px 2px 4px rgb(0 0 0 / 3%);
  border-radius: 6px;
`

const TableData = styled.td`
  display: flex;
  flex-direction: column;
  border: none !important;
  font-size: 48px;
  font-weight: 700;
  align-self: center;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.5715;

  max-width: 364px;
  overflow-wrap: break-word;

  a {
    text-align: center;
  }
  img {
    max-width: 233px;
    border-radius: 6px;
  }
`
const TableDataDescription = styled.td`
  border: none !important;
  font-family: 'Source Sans Pro', sans-serif;
  max-width: 364px;
  display: flex;

  line-height: 1.5715;
  text-align: center;
  flex-direction: column;
  font-size: 21px;
  font-weight: 400;
  align-self: center;
  a {
    text-align: center;
  }
`

export default function Home ({ viewer }) {
  const {
    data: { listings },
    loading,
    error,
    refetch,
  } = useQuery(LISTINGS)

  const [
    getUserVotes, 
    { loading: loadingUser, data: userVotes }
   ] = useLazyQuery(CHECK_USER_VOTE)

  const [incrementCount] = useMutation(INCREMENT_COUNT)
  //const [setUserData] = useMutation(SET_USER_VOTE)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [searchResults, setSearchResults] = React.useState([])

  const handleChange = event => {
    setSearchTerm(event.target.value)
  }
  let sortedData = listings.slice().sort(function (a, b) {
    return b.count - a.count
  })

  React.useEffect(() => {
    const results = sortedData.filter(
      item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
      // need to get tags working to be case insensitve
      //|| item.tags.includes(searchTerm)
    )
    setSearchResults(results)
  }, [searchTerm, listings])

  const handleIncrementCount = async resource => {
    //if (viewer.id) {
      getUserVotes(
        {
         variables: {
            id: "112016378414675480907",
           resource: "6033fcb7913fe2f540b57a12"
         },
        }
       )
      // await incrementCount({
      //   variables: {
      //     id: resource.id,
      //     viewer: viewer.id,
      //     resource: resource.id,
      //   },
      // })
      // await setUserData({variables :{viewer: viewer.id, resource: resource.title}})
      //refetch()
    } 
    // else {
    //   alert('most login to vote')
    // }
  //}

  if (loading) {
    return <h1>loading</h1>
  }
  if (error) {
    return <h1>error</h1>
  }

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

      <div className='container'>
        <h1>Resources for Studying Japanese</h1>
        <input
          type='text'
          placeholder='Search'
          value={searchTerm}
          onChange={handleChange}
        />
        <table className='table is-fullwidth is-hoverable'>
          <tbody>
            {searchResults.map((resource, _index) => (
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
                    {resource.tags.map((tag, index) => (
                      <div className='control'>
                        <div className='tags has-addons'>
                          <a className='tag is-link'>{tag}</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </TableData>
                <TableData>
                  👍
                  <h3 onClick={() => handleIncrementCount(resource)}>
                    {resource.count}
                  </h3>
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export async function getStaticProps () {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: gql`
      query getResources {
        listings {
          id
          title
          description
          image
          url
          tags
          count
        }
      }
    `,
  })
  return {
    props: { initialApolloState: apolloClient.cache.extract() },
  }
}
