import React from 'react'
import VoteButton from '~views/components/VoteButton'

import styled from 'styled-components'


export default function Table ({ viewer, searchResults, refetch }) {

return(

<div className='container'>
        <table className='table is-fullwidth is-hoverable'>
          <tbody>
            {searchResults.map((resource, _index) => (
              <TableRow key={resource.id}>
                <TableData>
                  <a href={resource.url}>
                    <img src={resource.image} alt='' />
                  </a>
                </TableData>
                <TableDataTitle>
                  <a href={resource.url}>{resource.title}</a>
                </TableDataTitle>
                <TableDataDescription>
                  <a href={resource.url}>{resource.description}</a>
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
                  <VoteButton
                    refetch={refetch}
                    resource={resource}
                    viewer={viewer}
                  />
                  <span>{resource.count}</span>
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>)


                    }

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
  padding: 0 !important;

  padding-top: 0.5em !important;
  padding-bottom: 0.5em !important;
  width: 100%;
  overflow-wrap: break-word;

  a {
    text-align: center;
   
  }

  img {
    max-width: 233px;
    border-radius: 6px;
  }
  span {
    align-self: center;
  }
  .field {
    align-self: center;
    text-transform: capitalize;
  }
  .field.is-grouped {
    flex-direction: column;
  }
`
const TableDataTitle = styled.td`
  display: flex;
  flex-direction: column;
  border: none !important;
  font-size: 34px;
  font-weight: 700;
  align-self: center;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.5715;

  width: 100%;
  a {
    text-align: center;
    color:black;

  }
  a:hover {
    text-decoration: underline;
  }
`
const TableDataDescription = styled.td`
  border: none !important;
  font-family: 'Source Sans Pro', sans-serif;
  max-width: 377px;
  display: flex;
  width: 200%;
  line-height: 1.5715;
  text-align: center;
  flex-direction: column;
  font-size: 21px;
  font-weight: 400;
  align-self: center;
  a {
    text-align: center;
    color:black;

  }
`
