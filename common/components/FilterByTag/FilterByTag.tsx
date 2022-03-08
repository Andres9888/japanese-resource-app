// @ts-nocheck
import { useState } from 'react';

import { Tag } from 'antd';
import styled from 'styled-components';

const { CheckableTag } = Tag;

const tagsData = [
  { value: 'Grammar', emoji: '📐' },
  { value: 'Books', emoji: '📖' },
  { value: 'Dictionary', emoji: '⌨️' },
  { value: 'Tool', emoji: '🔧' },
  { value: 'Guide', emoji: '🦮' },
  { value: 'Reading', emoji: '📰' },
  { value: 'Kanji', emoji: '㊙️' },
  { value: 'Writing', emoji: '✍️' },
  { value: 'Srs', emoji: '🎴' },
];

const FilterByTag = ({ setSearchTerm }) => {
  const [selectedTags, setSelectedTags] = useState();

  const handleChange = (tag, checked) => {
    setSelectedTags(tag);
    setSearchTerm(tag);
  };

  return (
    <>
      <TableDataTags>
        <span style={{ marginRight: 8 }}>Filter By:</span>

        {tagsData.map(tag => (
          <CheckableTag key={tag.value} checked={selectedTags === tag.value} onChange={checked => handleChange(tag.value, checked)}>
            {tag.emoji}
            {tag.value}
          </CheckableTag>
        ))}
      </TableDataTags>
    </>
  );
};

export default FilterByTag;

const TableDataTags = styled.div`
  align-self: center;
  border: none !important;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;

  font-weight: 700;
  line-height: 1.5715;
  overflow-wrap: break-word;

  padding: 0 !important;
  padding-bottom: 21px !important;
  padding-top: 21px !important;
  width: 100%;

  @media (max-width: 800px) {
    font-size: 10px !important;
  }
  @media (max-width: 600px) {
    font-size: 8px !important;
  }
  .ant-tag {
    font-size: 16px;
  }
`;
