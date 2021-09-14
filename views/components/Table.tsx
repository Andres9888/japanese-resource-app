import React from 'react';

import styled from 'styled-components';
import VoteButton from '~views/components/VoteButton';

export default function Table({ viewer, searchResults, refetch }) {
  return (
    <div className="container">
      <table className="table is-fullwidth is-hoverable">
        <tbody>
          {searchResults.map((resource, _index) => (
            <TableRow key={resource.id}>
              <TableData>
                <a href={resource.url} target="_blank">
                  <img src={resource.image} alt="" />
                </a>
              </TableData>
              <TableDataTitle>
                <a href={resource.url} target="_blank">
                  {resource.title}
                </a>
              </TableDataTitle>
              <TableDataDescription>
                <a href={resource.url} target="_blank">
                  {resource.description}
                </a>
              </TableDataDescription>
              <TableData>
                <div className="field is-grouped is-grouped-multiline">
                  {resource.tags.map(tag => (
                    <div key={`${`${resource.id}-${tag}`}`} className="control">
                      <div className="tags has-addons">
                        <a className="tag is-link">{tag}</a>
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
    </div>
  );
}

const TableRow = styled.tr`
  border-radius: 6px;
  box-shadow: 1px 2px 4px rgb(0 0 0 / 3%);
  display: flex;
`;

const TableData = styled.td`
  align-self: center;
  border: none !important;
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.5715;
  overflow-wrap: break-word;

  padding: 0 !important;
  padding-bottom: 0.5em !important;
  padding-top: 0.5em !important;
  width: 100%;

  a {
    text-align: center;
  }

  img {
    border-radius: 6px;
    max-width: 233px;
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
`;
const TableDataTitle = styled.td`
  align-self: center;
  border: none !important;
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  font-size: 34px;
  font-weight: 700;
  line-height: 1.5715;

  width: 100%;
  a {
    color: black;
    text-align: center;
  }
  a:hover {
    text-decoration: underline;
  }
`;
const TableDataDescription = styled.td`
  align-self: center;
  border: none !important;
  display: flex;
  flex-direction: column;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 21px;
  font-weight: 400;
  line-height: 1.5715;
  max-width: 377px;
  text-align: center;
  width: 200%;
  a {
    color: black;
    text-align: center;
  }
`;