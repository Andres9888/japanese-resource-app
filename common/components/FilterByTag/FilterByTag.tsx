import { useState } from 'react';

import { Tag } from 'antd';
import styled from 'styled-components';

const { CheckableTag } = Tag;

const tagsData = [
  { category: 'Grammar', emoji: '📐' },
  { category: 'Books', emoji: '📖' },
  { category: 'Dictionary', emoji: '⌨️' },
  { category: 'Tool', emoji: '🔧' },
  { category: 'Guide', emoji: '🦮' },
  { category: 'Reading', emoji: '📰' },
  { category: 'Kanji', emoji: '㊙️' },
  { category: 'Writing', emoji: '✍️' },
  { category: 'Srs', emoji: '🎴' },
  { category: '', emoji: '🚫' },
];

interface Props {
  setSearchTerm: (searchTerm: string) => void;
}

const FilterByTag = ({ setSearchTerm }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState();

  const handleChange = category => {
    setSelectedCategory(category);
    setSearchTerm(category);
  };

  return (
    <>
      <TableDataTags>
        <span style={{ marginRight: 8, display: 'flex', alignItems: 'center' }}>Filter By:</span>

        {tagsData.map(({ category, emoji }) => (
          <CheckableTag key={category} checked={selectedCategory === category} onChange={() => handleChange(category)}>
            {`${emoji}  ${category}`}
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
  margin-top:20px;
  margin-bottom:20px;
  font-weight: 700;
  line-height: 1.5715;
  overflow-wrap: break-word;

  width: 100%;

  @media (max-width: 800px) {
    font-size: 10px !important;
  }
  @media (max-width: 600px) {
    font-size: 8px !important;
  }
  .ant-tag {
    border: none
    border-radius: 12px;
    box-shadow: none;
    cursor: cell;

    font-size: 16px;

    padding: 7px;
    padding-left: 7px;
    padding-right: 7px;
  }
`;
