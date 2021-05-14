import React from 'react'
import Head from 'next/head'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { initializeApollo } from '~lib/apolloClient'
import { LISTINGS, CHECK_USER_VOTE } from '~graphql/queries/queries'
import { INCREMENT_COUNT } from '~graphql/mutations/mutations'
import Nav from '~views/components/Nav'

import styled from 'styled-components'


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

  const [incrementCount] = useMutation(INCREMENT_COUNT)
  
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
    if (viewer.id) {
      const client = initializeApollo()

      try {
        const {
          data: { checkUserVote: voteList }
        } = await client.query({
          query: CHECK_USER_VOTE,
          variables: {
            id: viewer.id,
            resource: resource.id,
          },
        })

        console.log(voteList)

        let didVote
        if (voteList.length) {
          didVote = voteList[0].resources.some(item => item === resource.id)
        } else {
          didVote = false
        }

        if (!didVote) {
          await incrementCount({
            variables: {
              id: resource.id,
              viewer: viewer.id,
              resource: resource.id,
            },
          })
          refetch()
        } else {
          alert('already voted on this resource')
        }
      } catch {}
    } else {
      alert('most login to vote')
    }
  }

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
      <Nav viewer={viewer} searchTerm={searchTerm} handleChange={handleChange}/>
      <div className='container'>
        <h1>Resources for Studying Japanese</h1>
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
                    {resource.tags.map(tag => (
                      <div
                        key={`${resource.id + '-' + tag}`}
                        className='control'
                      >
                        <div className='tags has-addons'>
                          <a className='tag is-link'>{tag}</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </TableData>
                <TableData>
                  👍
                  <h3
                    onClick={() => {
                      handleIncrementCount(resource)
                    }}
                  >
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
    query: LISTINGS,
  })
  return {
    props: { initialApolloState: apolloClient.cache.extract() },
    revalidate: 1,
  }
}
